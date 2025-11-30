import React, { useState, useMemo } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { SAMPLE_PROPERTIES } from '../data/mockProperties';
import { Filter, Search, Map, ChevronDown, SlidersHorizontal } from 'lucide-react';

export const PropertiesPage: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [minBeds, setMinBeds] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // Filter logic
  const filteredProperties = useMemo(() => {
    return SAMPLE_PROPERTIES.filter(property => {
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      const matchesType = selectedType ? property.type === selectedType : true;
      const matchesBeds = property.beds >= minBeds;
      
      return matchesPrice && matchesType && matchesBeds;
    });
  }, [priceRange, selectedType, minBeds]);

  const propertyTypes = Array.from(new Set(SAMPLE_PROPERTIES.map(p => p.type)));

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b sticky top-16 z-30 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <button 
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${!selectedType ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All Homes
              </button>
              {propertyTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type === selectedType ? null : type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedType === type ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-medium">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-medium">
                <Map className="w-4 h-4" />
                <span>Show Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center space-x-2 bg-white p-3 rounded-lg border shadow-sm text-gray-700 font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>

          {/* Sidebar Filters */}
          <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-36">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Filters</h3>
                <button 
                    onClick={() => {
                        setPriceRange([0, 1000]);
                        setSelectedType(null);
                        setMinBeds(0);
                    }}
                    className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                >
                    Reset
                </button>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex-1">
                    <span className="text-xs text-gray-500">Min</span>
                    <input 
                      type="number" 
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-500">Max</span>
                    <input 
                      type="number" 
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Bedrooms Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => setMinBeds(minBeds === num ? 0 : num)}
                      className={`py-2 rounded-md text-sm font-medium border transition-colors ${minBeds === num ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-gray-700 border-gray-200 hover:border-amber-600'}`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Amenities (Mock) */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="space-y-2">
                    {['Pool', 'Wifi', 'Kitchen', 'Free Parking', 'Hot Tub'].map((amenity) => (
                        <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                            <span className="text-sm text-gray-600">{amenity}</span>
                        </label>
                    ))}
                </div>
              </div>

            </div>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-gray-900">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'place' : 'places'} to stay
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Sort by:</span>
                <button className="flex items-center space-x-1 font-medium text-gray-900">
                  <span>Recommended</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                  <div key={property.id} className="h-full">
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your filters to see more results.</p>
                <button 
                    onClick={() => {
                        setPriceRange([0, 1000]);
                        setSelectedType(null);
                        setMinBeds(0);
                    }}
                    className="mt-4 text-amber-600 font-medium hover:underline"
                >
                    Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

