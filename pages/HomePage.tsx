import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Properties } from '../components/Properties';
import { Testimonials } from '../components/Testimonials';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Properties />
      <Testimonials />
    </>
  );
};

