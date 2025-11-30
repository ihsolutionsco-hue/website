import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const SAMPLE_REVIEWS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    location: "London, UK",
    comment: "The property was exactly as described. Spotless, modern, and very close to the parks. The digital concierge made checking out a breeze!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    comment: "IHM Vacations provided excellent service. We had a minor issue with the pool heat, and they fixed it within an hour. Highly recommended.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    comment: "Instant booking was so convenient. The house was beautiful and the kids loved the themed bedrooms. We will definitely be back.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Our Guests Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_REVIEWS.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
              <Quote className="absolute top-6 right-6 text-gray-200 h-10 w-10 rotate-180" />
              
              <div className="flex items-center space-x-4 mb-6">
                <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.location}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic leading-relaxed">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};