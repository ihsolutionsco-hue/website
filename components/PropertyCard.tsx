import React from 'react';
import { Star, Heart, MapPin, Bed, Users, Bath } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="group cursor-pointer flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-gray-200">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";
            target.onerror = null;
          }}
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/70 hover:bg-white text-gray-900 transition-colors z-10">
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-bold px-2 py-1 rounded">
          {property.type}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 truncate pr-2 text-lg">{property.title}</h3>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 flex-shrink-0 bg-gray-50 px-1.5 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 text-sm text-gray-500">
          <div className="flex items-center space-x-3">
             <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>{property.beds}</span>
             </div>
             <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span>{property.baths}</span>
             </div>
             <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{property.guests}</span>
             </div>
          </div>
        </div>

        <div className="mt-4 flex items-baseline space-x-1">
          <span className="font-bold text-xl text-gray-900">${property.price}</span>
          <span className="text-gray-600 text-sm">/ night</span>
        </div>
      </div>
    </div>
  );
};

