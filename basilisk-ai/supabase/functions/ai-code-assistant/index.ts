import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        // Initialize the Supabase client.
        // It's safe to use environment variables here, as they are securely
        // stored by Supabase and not exposed to the client.
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
          {
            // These options are required for server-side (Deno) environments.
            auth: {
              persistSession: false,
              autoRefreshToken: false,
            },
          }
        )

        // Extract parameters from request body
        const requestData = await req.json();
        const { command, currentFiles, activeFile } = requestData;

        if (!command || !currentFiles || activeFile === undefined) {
            throw new Error('Missing required parameters: command, currentFiles, or activeFile');
        }

        // Asynchronously log the invocation to the database without blocking the response.
        supabaseClient.from('invocations').insert({
            command: command,
            active_file: activeFile,
            files_context_char_count: JSON.stringify(currentFiles).length,
        }).then(({ error }) => {
            if (error) console.error('Error logging invocation:', error.message);
        });

        // Get API keys from environment
        const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
        const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
        
        if (!openaiApiKey && !anthropicApiKey) {
            throw new Error('No AI API keys configured. Please set OPENAI_API_KEY or ANTHROPIC_API_KEY.');
        }

        // Prepare the AI prompt
        const systemPrompt = `You are BasiliskAI, an expert code assistant that helps developers modify their code based on natural language requests.

You have access to the user's current files and need to provide specific code modifications based on their request.

Rules:
1. Only modify the code that needs to be changed
2. Maintain existing code style and formatting
3. Preserve comments and existing functionality
4. Provide working, production-ready code
5. Return the complete modified files, not just snippets

Current files:
${JSON.stringify(currentFiles, null, 2)}

User request: "${command}"

Please analyze the request and provide the modified files as a JSON response with this structure:
{
  "success": true,
  "modifiedFiles": [
    {
      "name": "filename.tsx",
      "content": "complete file content",
      "language": "typescript"
    }
  ],
  "explanation": "Brief explanation of changes made"
}`;

        let aiResponse;
        
        // Try OpenAI first if available
        if (openaiApiKey) {
            try {
                const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${openaiApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'gpt-4',
                        messages: [
                            {
                                role: 'system',
                                content: systemPrompt
                            }
                        ],
                        temperature: 0.1,
                        max_tokens: 4000
                    })
                });

                if (!openaiResponse.ok) {
                    throw new Error(`OpenAI API error: ${openaiResponse.status}`);
                }

                const openaiData = await openaiResponse.json();
                aiResponse = openaiData.choices[0].message.content;
            } catch (openaiError) {
                console.log('OpenAI failed, trying Anthropic:', openaiError);
                
                // Fallback to Anthropic if OpenAI fails
                if (anthropicApiKey) {
                    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
                        method: 'POST',
                        headers: {
                            'x-api-key': anthropicApiKey,
                            'Content-Type': 'application/json',
                            'anthropic-version': '2023-06-01'
                        },
                        body: JSON.stringify({
                            model: 'claude-3-sonnet-20240229',
                            max_tokens: 4000,
                            messages: [
                                {
                                    role: 'user',
                                    content: systemPrompt
                                }
                            ]
                        })
                    });

                    if (!anthropicResponse.ok) {
                        throw new Error(`Anthropic API error: ${anthropicResponse.status}`);
                    }

                    const anthropicData = await anthropicResponse.json();
                    aiResponse = anthropicData.content[0].text;
                } else {
                    throw openaiError;
                }
            }
        } else if (anthropicApiKey) {
            // Use Anthropic if only Anthropic key is available
            const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'x-api-key': anthropicApiKey,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-3-sonnet-20240229',
                    max_tokens: 4000,
                    messages: [
                        {
                            role: 'user',
                            content: systemPrompt
                        }
                    ]
                })
            });

            if (!anthropicResponse.ok) {
                throw new Error(`Anthropic API error: ${anthropicResponse.status}`);
            }

            const anthropicData = await anthropicResponse.json();
            aiResponse = anthropicData.content[0].text;
        }

        // Parse the AI response
        let parsedResponse;
        try {
            // Extract JSON from the response if it's wrapped in markdown
            const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/) || aiResponse.match(/```\n([\s\S]*?)\n```/);
            const jsonString = jsonMatch ? jsonMatch[1] : aiResponse;
            parsedResponse = JSON.parse(jsonString);
        } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            // Fallback: return the original files with an error message
            parsedResponse = {
                success: false,
                error: 'Failed to parse AI response',
                modifiedFiles: currentFiles,
                explanation: 'The AI service returned an invalid response. Please try again.'
            };
        }

        // Return success response
        return new Response(JSON.stringify({ data: parsedResponse }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('AI Code Assistant error:', error);

        // Return error response
        const errorResponse = {
            error: {
                code: 'AI_PROCESSING_ERROR',
                message: error.message || 'An unexpected error occurred while processing your request.'
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});