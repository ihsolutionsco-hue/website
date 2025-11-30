import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Property } from '../types';

const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Luxury Villa near Disney",
    location: "Kissimmee, FL",
    price: 250,
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    beds: 5,
    guests: 12,
    baths: 4,
    type: "Villa"
  },
  {
    id: 2,
    title: "Modern Condo with Pool View",
    location: "Orlando, FL",
    price: 135,
    rating: 4.7,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1512918760383-eda2723ad6e5?q=80&w=2070&auto=format&fit=crop",
    beds: 2,
    guests: 4,
    baths: 2,
    type: "Condo"
  },
  {
    id: 3,
    title: "Spacious Family Retreat",
    location: "Davenport, FL",
    price: 195,
    rating: 4.8,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1974&auto=format&fit=crop",
    beds: 4,
    guests: 8,
    baths: 3,
    type: "House"
  },
   {
    id: 4,
    title: "Resort Style Mansion",
    location: "Reunion, FL",
    price: 850,
    rating: 5.0,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    beds: 9,
    guests: 20,
    baths: 8,
    type: "Mansion"
  },
    {
    id: 5,
    title: "Cozy Townhome",
    location: "Champions Gate, FL",
    price: 175,
    rating: 4.6,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1600596542815-e32870110029?q=80&w=1975&auto=format&fit=crop",
    beds: 3,
    guests: 6,
    baths: 2.5,
    type: "Townhome"
  },
  {
    id: 6,
    title: "Themed Kids Paradise",
    location: "Kissimmee, FL",
    price: 320,
    rating: 4.95,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1596178060810-7264e96c2569?q=80&w=2070&auto=format&fit=crop", // Using a generic interior shot for now
    beds: 6,
    guests: 14,
    baths: 5,
    type: "Villa"
  }
];

export const Properties: React.FC = () => {
  return (
    <section id="properties" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
                <p className="mt-2 text-gray-500">Hand-picked homes for your perfect stay</p>
            </div>
             <a href="#" className="hidden md:block text-amber-600 font-semibold hover:text-amber-700">View all properties &rarr;</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {SAMPLE_PROPERTIES.map((property) => (
            <div key={property.id} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 mb-3">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/70 hover:bg-white text-gray-900 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-bold px-2 py-1 rounded">
                    {property.type}
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-gray-900 truncate pr-2">{property.title}</h3>
                    <p className="text-gray-500 text-sm">{property.location}</p>
                </div>
                <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{property.rating}</span>
                </div>
              </div>
              
              <p className="mt-1 text-sm text-gray-500">
                {property.beds} beds • {property.guests} guests
              </p>
              
              <div className="mt-2 flex items-baseline space-x-1">
                <span className="font-bold text-lg text-gray-900">${property.price}</span>
                <span className="text-gray-600 text-sm">/ night</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
             <a href="#" className="text-amber-600 font-bold border-2 border-amber-600 px-6 py-2 rounded-full hover:bg-amber-50">View all properties</a>
        </div>
      </div>
    </section>
  );
};