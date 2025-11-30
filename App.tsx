import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Properties } from './components/Properties';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Properties />
        <Testimonials />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}

export default App;