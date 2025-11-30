import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { AttractionsPage } from './pages/AttractionsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/attractions" element={<AttractionsPage />} />
          </Routes>
        </main>
        <Footer />
        <AIChat />
      </div>
    </Router>
  );
}

export default App;
