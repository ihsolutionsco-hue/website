import React from 'react';
import { MapPin, Sun, Compass, Star } from 'lucide-react';

export const AttractionsPage: React.FC = () => {
  const attractions = [
    {
      title: "Central Florida",
      description: "The heart of vacation magic. Central Florida is home to the world's most famous theme parks, including Walt Disney World Resort, Universal Orlando Resort, and SeaWorld Orlando. Beyond the parks, enjoy world-class shopping, dining, and outdoor adventures.",
      image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?q=80&w=2000&auto=format&fit=crop",
      highlights: ["Walt Disney World", "Universal Studios", "Premium Outlets", "International Drive"]
    },
    {
      title: "Kissimmee",
      description: "Known as the Vacation Home Capital of the World, Kissimmee offers easy access to the theme parks while providing a relaxing retreat. Explore Old Town for classic car shows, take an airboat ride through the headwaters of the Everglades, or enjoy the vibrant local dining scene.",
      image: "https://images.unsplash.com/photo-1628116904696-6e5a6a66f072?q=80&w=2000&auto=format&fit=crop",
      highlights: ["Old Town", "Fun Spot America", "Lake Tohopekaliga", "Close to Disney"]
    },
    {
      title: "Davenport",
      description: "A rapidly growing area popular for vacation rentals, Davenport offers a quieter atmosphere while still being close to the action. Home to ChampionsGate and numerous golf courses, it's perfect for those seeking a mix of relaxation and recreation.",
      image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2000&auto=format&fit=crop",
      highlights: ["ChampionsGate Golf", "Posner Park Shopping", "Northeast Regional Park", "Easy I-4 Access"]
    },
    {
      title: "Reunion",
      description: "An exclusive master-planned community featuring luxury amenities. Reunion Resort is unique with three signature golf courses designed by legends Nicklaus, Palmer, and Watson. It also boasts a water park, tennis courts, and fine dining options.",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2000&auto=format&fit=crop",
      highlights: ["Signature Golf Courses", "Water Park", "Luxury Spas", "Fine Dining"]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1575089776834-8be34696ffb9?q=80&w=2000&auto=format&fit=crop"
            alt="Orlando Attractions"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore <span className="text-amber-400">Central Florida</span>
          </h1>
          <p className="text-xl text-gray-200">
            From world-famous theme parks to hidden local gems, discover what makes this region the ultimate vacation destination.
          </p>
        </div>
      </div>

      {/* Intro Stats/Features */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Sun className="h-10 w-10 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Year-Round Sunshine</h3>
              <p className="text-gray-600 mt-2">Enjoy beautiful weather perfect for outdoor activities all year long.</p>
            </div>
            <div className="p-6">
              <Compass className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Prime Locations</h3>
              <p className="text-gray-600 mt-2">Stay close to Disney, Universal, and top-rated golf courses.</p>
            </div>
            <div className="p-6">
              <Star className="h-10 w-10 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">World-Class Fun</h3>
              <p className="text-gray-600 mt-2">Experience the best entertainment and attractions in the world.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-24">
          {attractions.map((place, index) => (
            <div key={place.title} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <img 
                    src={place.image} 
                    alt={place.title} 
                    className="w-full h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center space-x-2 text-amber-600 font-semibold mb-2">
                  <MapPin className="h-5 w-5" />
                  <span className="uppercase tracking-wide">Destination</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{place.title}</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {place.description}
                </p>
                
                <h3 className="text-lg font-bold text-gray-900 mb-4">Highlights:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {place.highlights.map((item) => (
                    <li key={item} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

