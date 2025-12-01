import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { AccessibilityTools } from './components/AccessibilityTools';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { AttractionsPage } from './pages/AttractionsPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { ManagementPage } from './pages/ManagementPage';

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/attractions" element={<AttractionsPage />} />
              <Route path="/management" element={<ManagementPage />} />
            </Routes>
          </main>
          <Footer />
          <AIChat />
          <AccessibilityTools />
        </div>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;
