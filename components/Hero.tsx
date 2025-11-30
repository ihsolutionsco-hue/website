import React from 'react';
import { Search, Calendar, Users, Home } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 flex items-center justify-center min-h-[600px] bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Vacation Rental Pool"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        {/* Brand Logo - Big and Visible */}
        <div className="mb-8 inline-block p-6 rounded-3xl bg-white/95 shadow-2xl backdrop-blur-md transform hover:scale-105 transition-transform duration-300">
             <img src="/logo.png" alt="IHM Vacations" className="h-24 md:h-32 w-auto object-contain" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
          Plan the vacation <br className="hidden md:block" />
          <span className="text-amber-400">of a lifetime</span>
        </h1>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl drop-shadow-md">
          Experience Orlando's finest vacation homes with world-class amenities and personalized service.
        </p>

        {/* Search Box - Airbnb Style */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 max-w-5xl mx-auto md:mx-0">
          <div className="flex flex-col md:flex-row md:items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            
            {/* Category */}
            <div className="px-4 py-2 hover:bg-gray-50 rounded-xl cursor-pointer flex-1 transition-colors group">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Category</label>
              <div className="flex items-center text-gray-500 group-hover:text-gray-900">
                <Home className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">All Rentals</span>
              </div>
            </div>

            {/* Check In */}
            <div className="px-4 py-2 hover:bg-gray-50 rounded-xl cursor-pointer flex-1 transition-colors group">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Check In</label>
              <div className="flex items-center text-gray-500 group-hover:text-gray-900">
                 <Calendar className="w-4 h-4 mr-2" />
                 <span className="text-sm font-medium">Add dates</span>
              </div>
            </div>

            {/* Check Out */}
             <div className="px-4 py-2 hover:bg-gray-50 rounded-xl cursor-pointer flex-1 transition-colors group">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Check Out</label>
              <div className="flex items-center text-gray-500 group-hover:text-gray-900">
                 <Calendar className="w-4 h-4 mr-2" />
                 <span className="text-sm font-medium">Add dates</span>
              </div>
            </div>

            {/* Guests */}
             <div className="px-4 py-2 hover:bg-gray-50 rounded-xl cursor-pointer flex-1 transition-colors group">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Guests</label>
              <div className="flex items-center text-gray-500 group-hover:text-gray-900">
                 <Users className="w-4 h-4 mr-2" />
                 <span className="text-sm font-medium">Add guests</span>
              </div>
            </div>
            
             {/* Bedrooms - Extra field requested */}
             <div className="px-4 py-2 hover:bg-gray-50 rounded-xl cursor-pointer flex-1 transition-colors group hidden lg:block">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Bedrooms</label>
              <div className="flex items-center text-gray-500 group-hover:text-gray-900">
                 <span className="text-sm font-medium">Any</span>
              </div>
            </div>

            {/* Search Button */}
            <div className="pl-4 py-2 flex items-center justify-center md:justify-end">
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 w-full md:w-auto">
                <Search className="w-5 h-5 font-bold" />
                <span className="md:hidden ml-2 font-bold">Search</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};