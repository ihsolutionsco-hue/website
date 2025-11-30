import React from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from './PropertyCard';
import { SAMPLE_PROPERTIES } from '../data/mockProperties';

export const Properties: React.FC = () => {
  // Show only first 4 properties on homepage
  const featuredProperties = SAMPLE_PROPERTIES.slice(0, 4);

  return (
    <section id="properties" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
                <p className="mt-2 text-gray-500">Hand-picked homes for your perfect stay</p>
            </div>
             <Link to="/properties" className="hidden md:block text-amber-600 font-semibold hover:text-amber-700">View all properties &rarr;</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProperties.map((property) => (
            <div key={property.id} className="h-full">
                <PropertyCard property={property} />
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
             <Link to="/properties" className="text-amber-600 font-bold border-2 border-amber-600 px-6 py-2 rounded-full hover:bg-amber-50">View all properties</Link>
        </div>
      </div>
    </section>
  );
};
