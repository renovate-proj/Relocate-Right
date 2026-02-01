'use client';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, IndianRupee, Star } from 'lucide-react';

// Mock data for neighborhoods
const neighborhoods = [
  {
    slug: 'bandra-west',
    name: 'Bandra West',
    zone: 'Western Suburbs',
    overallScore: 8.5,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=500&fit=crop',
    shortDescription: 'Upscale neighborhood known for its vibrant nightlife, celebrity homes, and coastal promenade.',
    rentRange: '₹35,000 - ₹80,000',
    safetyScore: 8.8,
    transitScore: 9.0,
    amenitiesCount: 245,
    popularity: 'Very High',
    highlights: ['Beach Access', 'Fine Dining', 'Shopping', 'Nightlife']
  },
  {
    slug: 'andheri-east',
    name: 'Andheri East',
    zone: 'Western Suburbs',
    overallScore: 7.8,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=500&fit=crop',
    shortDescription: 'Commercial hub with excellent connectivity, mix of residential and business areas.',
    rentRange: '₹25,000 - ₹55,000',
    safetyScore: 7.5,
    transitScore: 9.2,
    amenitiesCount: 312,
    popularity: 'High',
    highlights: ['Metro Access', 'IT Parks', 'Airports Nearby', 'Shopping Malls']
  },
  {
    slug: 'powai',
    name: 'Powai',
    zone: 'Eastern Suburbs',
    overallScore: 8.2,
    image: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&h=500&fit=crop',
    shortDescription: 'Self-contained township with a beautiful lake, premium residential complexes, and tech hubs.',
    rentRange: '₹30,000 - ₹70,000',
    safetyScore: 8.6,
    transitScore: 7.5,
    amenitiesCount: 198,
    popularity: 'High',
    highlights: ['Lakeside Living', 'Tech Hubs', 'Premium Housing', 'International Schools']
  },
  {
    slug: 'lower-parel',
    name: 'Lower Parel',
    zone: 'South Mumbai',
    overallScore: 8.0,
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&h=500&fit=crop',
    shortDescription: 'Transformed mill district now a premium business and residential destination.',
    rentRange: '₹40,000 - ₹90,000',
    safetyScore: 8.2,
    transitScore: 8.8,
    amenitiesCount: 178,
    popularity: 'Very High',
    highlights: ['Business District', 'Upscale Dining', 'Cultural Centers', 'Metro Access']
  },
  {
    slug: 'thane-west',
    name: 'Thane West',
    zone: 'Thane',
    overallScore: 7.5,
    image: 'https://images.unsplash.com/photo-1571847850413-bb64a0da6aed?w=800&h=500&fit=crop',
    shortDescription: 'Rapidly developing suburb with lakes, parks, and affordable housing options.',
    rentRange: '₹18,000 - ₹45,000',
    safetyScore: 7.8,
    transitScore: 8.0,
    amenitiesCount: 267,
    popularity: 'Medium',
    highlights: ['Affordable Living', 'Lakes & Parks', 'Growing Infrastructure', 'Family-Friendly']
  },
  {
    slug: 'goregaon-east',
    name: 'Goregaon East',
    zone: 'Western Suburbs',
    overallScore: 7.3,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=500&fit=crop',
    shortDescription: 'Residential area with film city proximity and developing commercial zones.',
    rentRange: '₹22,000 - ₹50,000',
    safetyScore: 7.4,
    transitScore: 7.8,
    amenitiesCount: 234,
    popularity: 'Medium',
    highlights: ['Film City', 'Metro Connectivity', 'Residential', 'Shopping Centers']
  },
  {
    slug: 'worli',
    name: 'Worli',
    zone: 'South Mumbai',
    overallScore: 8.7,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
    shortDescription: 'Premium waterfront locality with iconic sea link and luxury high-rises.',
    rentRange: '₹50,000 - ₹120,000',
    safetyScore: 9.0,
    transitScore: 8.5,
    amenitiesCount: 156,
    popularity: 'Very High',
    highlights: ['Sea Link', 'Luxury Living', 'Waterfront', 'Premium Dining']
  },
  {
    slug: 'navi-mumbai',
    name: 'Navi Mumbai',
    zone: 'Navi Mumbai',
    overallScore: 7.6,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=500&fit=crop',
    shortDescription: 'Planned city with wide roads, green spaces, and modern infrastructure.',
    rentRange: '₹15,000 - ₹40,000',
    safetyScore: 8.0,
    transitScore: 7.6,
    amenitiesCount: 289,
    popularity: 'Medium',
    highlights: ['Planned City', 'Affordable', 'Green Spaces', 'New Airport']
  }
];

// Filter options
const zones = ['All Zones', 'South Mumbai', 'Western Suburbs', 'Eastern Suburbs', 'Thane', 'Navi Mumbai'];
const priceRanges = [
  'All Prices',
  'Budget (< ₹25,000)',
  'Mid-Range (₹25,000 - ₹50,000)',
  'Premium (₹50,000 - ₹80,000)',
  'Luxury (> ₹80,000)'
];

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Mumbai Neighborhoods
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover the perfect area to call home. Compare neighborhoods across Mumbai with detailed insights on safety, affordability, transit, and amenities.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{neighborhoods.length}</div>
              <div className="text-sm text-blue-100">Areas Listed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-blue-100">Data Points</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm text-blue-100">Amenities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">Daily</div>
              <div className="text-sm text-blue-100">Updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zone
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {zones.map((zone) => (
                  <option key={zone}>{zone}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {priceRanges.map((range) => (
                  <option key={range}>{range}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Overall Score</option>
                <option>Safety Score</option>
                <option>Transit Score</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Areas Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {neighborhoods.length} Neighborhoods Found
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Grid View
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Map View
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {neighborhoods.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{area.overallScore}</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {area.zone}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {area.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {area.shortDescription}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Safety</div>
                      <div className="font-semibold text-gray-900">{area.safetyScore}/10</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Transit</div>
                      <div className="font-semibold text-gray-900">{area.transitScore}/10</div>
                    </div>
                  </div>
                </div>

                {/* Rent Range */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-purple-50 rounded-lg">
                  <IndianRupee className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-xs text-gray-600">Monthly Rent</div>
                    <div className="font-bold text-purple-900">{area.rentRange}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {area.highlights.slice(0, 3).map((highlight, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Home className="w-4 h-4" />
                    <span>{area.amenitiesCount} Amenities</span>
                  </div>
                  <span className="text-blue-600 font-medium group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
            Load More Areas
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Use our interactive map to explore all neighborhoods or get personalized recommendations based on your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/explore"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Explore Map View
            </Link>
            <Link
              href="/compare"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition"
            >
              Compare Areas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}