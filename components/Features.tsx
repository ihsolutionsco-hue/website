import React from 'react';
import { Zap, Smartphone, CalendarX } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why you should book directly with IHM?
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Better rates, better service, better vacations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Instant Booking */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600 mb-6">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">INSTANT BOOKING</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              When you book directly with us, your booking is confirmed immediately without delay. No waiting for approvals.
            </p>
          </div>

          {/* Digital Concierge */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
              <Smartphone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">FREE DIGITAL CONCIERGE</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Book your Attractions tickets, order Pool heat, late checkout or anything related to your stay from the comfort of your vacation rental.
            </p>
          </div>

          {/* Flexible Cancellation */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
              <CalendarX className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">FLEXIBLE CANCELLATION</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Book directly with us to obtain the best cancellation policy available for those travel dates. Peace of mind guaranteed.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};