import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { UXBenefits } from '../components/UXBenefits';
import { Navigation } from '../components/Navigation';
import { CallToAction } from '../components/CallToAction';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <Hero />
      <Features />
      <UXBenefits />
      <CallToAction />
    </div>
  );
};