import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Search } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-gray-300">
      {/* Upper Footer - Links & Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg inline-block">
                <img src="/logo.png" alt="IHM Vacations Logo" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Providing exceptional hospitality management and vacation experiences in Central Florida since 2010.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="hover:text-amber-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Jump to a Property</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Reunion Resort</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Champions Gate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Solara Resort</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Storey Lake</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Windsor Island</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-amber-500 shrink-0" />
                <span>10345 Orangewood Blvd.<br/>Orlando, FL 32821</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-amber-500 shrink-0" />
                <span>(407) 440-2812</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-amber-500 shrink-0" />
                <a href="mailto:reservations@insighthospitalitymgmt.com" className="hover:text-white transition-colors truncate">
                  reservations@insighthospitalitymgmt.com
                </a>
              </li>
            </ul>
          </div>

          {/* Property Search */}
          <div>
             <h4 className="text-white font-bold mb-6">Find Your Property</h4>
             <p className="text-sm text-gray-400 mb-4">Enter Property ID to view details directly.</p>
             <div className="flex">
                 <input type="text" placeholder="Property ID" className="bg-slate-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-amber-500 w-full text-sm" />
                 <button className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-r-md transition-colors">
                    <Search className="h-4 w-4 text-white" />
                 </button>
             </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2025 Insight Hospitality Management. All Right Reserved</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Powered By Atlas - A TravelNet Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};