import React, { useState } from 'react';
import { Menu, X, Globe, User, Plane, Home } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <div className="flex flex-col items-center justify-center mr-2">
                 <Home className="h-6 w-6 text-slate-800" />
                 <Plane className="h-4 w-4 text-amber-600 -mt-2 ml-4" />
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">IHM</span>
                <span className="text-xs font-semibold text-slate-600 tracking-widest">VACATIONS</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">Home</a>
            <a href="#properties" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">Properties</a>
            <a href="#attractions" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">Local Attractions</a>
            <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">Contact Us</a>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
             <a href="#" className="text-xs font-semibold text-gray-500 hover:text-slate-900">Current Owner</a>
             <span className="text-gray-300">|</span>
             <a href="#" className="text-xs font-semibold text-gray-500 hover:text-slate-900">Current Guest</a>
             
             <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center">
                Home Owner? Join us
             </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <a href="#" className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">Home</a>
            <a href="#properties" className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">Properties</a>
            <a href="#attractions" className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">Local Attractions</a>
            <a href="#contact" className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">Contact Us</a>
            <hr className="my-2 border-gray-100"/>
            <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-500">Current Owner Login</a>
            <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-500">Current Guest Login</a>
            <a href="#" className="block px-3 py-3 text-center text-sm font-bold text-white bg-amber-600 rounded-md mt-4">Home Owner? Join us now!</a>
          </div>
        </div>
      )}
    </header>
  );
};