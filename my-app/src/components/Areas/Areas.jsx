'use client';

import { useState } from 'react';
import { MapPin, Star, TrendingUp, TrendingDown, Home, Train, ShoppingBag, Heart, Share2, Map, Shield, DollarSign, Bus, School, Hospital, TreePine, Utensils, Coffee, ChevronRight } from 'lucide-react';

// Mock data for 5 Mumbai neighborhoods
const neighborhoodsData = {
  'bandra-west': {
    name: 'Bandra West',
    location: 'Western Suburbs',
    overallScore: 8.7,
    description: 'Bandra West is one of Mumbai\'s most vibrant and upscale neighborhoods, known for its cosmopolitan culture, trendy cafes, and excellent connectivity. The area seamlessly blends old-world charm with modern amenities.',
    heroImage: '/api/placeholder/1200/400',
    metrics: {
      safety: { score: 9.2, breakdown: { police: 9, lighting: 9, cctv: 8.5, crowd: 9.5 } },
      affordability: { score: 5.5, breakdown: { rent: 4, utilities: 6, groceries: 6, transport: 6 } },
      transit: { score: 9.5, breakdown: { metro: 10, bus: 9, local: 10, taxi: 9 } },
      amenities: { score: 9.0, breakdown: { schools: 9, hospitals: 9.5, parks: 8, shopping: 10 } }
    },
    costOfLiving: {
      rent: { '1bhk': 45000, '2bhk': 75000, '3bhk': 120000 },
      utilities: { electricity: 3500, water: 800, gas: 1200, internet: 1000 },
      groceries: 15000,
      transport: 5000,
      mumbaiAverage: { '1bhk': 25000, '2bhk': 45000, '3bhk': 70000 }
    },
    amenitiesCount: { schools: 24, hospitals: 12, parks: 8, restaurants: 156, cafes: 89, gyms: 34 },
    neighbors: ['Khar West', 'Bandra East', 'Santacruz West', 'Mahim'],
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300']
  },
  'andheri-east': {
    name: 'Andheri East',
    location: 'Eastern Suburbs',
    overallScore: 7.8,
    description: 'Andheri East is a thriving commercial and residential hub, home to major IT parks and business centers. It offers excellent connectivity and a perfect balance of work and residential spaces.',
    heroImage: '/api/placeholder/1200/400',
    metrics: {
      safety: { score: 8.0, breakdown: { police: 8, lighting: 8, cctv: 8.5, crowd: 7.5 } },
      affordability: { score: 6.5, breakdown: { rent: 6, utilities: 7, groceries: 7, transport: 6.5 } },
      transit: { score: 9.0, breakdown: { metro: 9.5, bus: 9, local: 8.5, taxi: 9 } },
      amenities: { score: 8.5, breakdown: { schools: 8, hospitals: 9, parks: 7.5, shopping: 9 } }
    },
    costOfLiving: {
      rent: { '1bhk': 30000, '2bhk': 50000, '3bhk': 85000 },
      utilities: { electricity: 3000, water: 700, gas: 1000, internet: 900 },
      groceries: 12000,
      transport: 4500,
      mumbaiAverage: { '1bhk': 25000, '2bhk': 45000, '3bhk': 70000 }
    },
    amenitiesCount: { schools: 32, hospitals: 15, parks: 6, restaurants: 124, cafes: 56, gyms: 28 },
    neighbors: ['Andheri West', 'Powai', 'Marol', 'Chakala'],
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300']
  },
  'powai': {
    name: 'Powai',
    location: 'Central Suburbs',
    overallScore: 8.3,
    description: 'Powai is a planned residential area built around the scenic Powai Lake. Known for IIT Bombay campus, upscale residential complexes, and excellent infrastructure, it\'s a self-sustained neighborhood.',
    heroImage: '/api/placeholder/1200/400',
    metrics: {
      safety: { score: 8.8, breakdown: { police: 8.5, lighting: 9, cctv: 9, crowd: 8.5 } },
      affordability: { score: 6.0, breakdown: { rent: 5.5, utilities: 6.5, groceries: 6, transport: 6 } },
      transit: { score: 7.5, breakdown: { metro: 6, bus: 8, local: 7, taxi: 9 } },
      amenities: { score: 8.8, breakdown: { schools: 9, hospitals: 9, parks: 9.5, shopping: 8 } }
    },
    costOfLiving: {
      rent: { '1bhk': 35000, '2bhk': 60000, '3bhk': 95000 },
      utilities: { electricity: 3200, water: 750, gas: 1100, internet: 1000 },
      groceries: 13000,
      transport: 5500,
      mumbaiAverage: { '1bhk': 25000, '2bhk': 45000, '3bhk': 70000 }
    },
    amenitiesCount: { schools: 18, hospitals: 10, parks: 12, restaurants: 78, cafes: 45, gyms: 22 },
    neighbors: ['Kanjurmarg', 'Vikhroli', 'Andheri East', 'Chandivali'],
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300']
  },
  'lower-parel': {
    name: 'Lower Parel',
    location: 'South Central Mumbai',
    overallScore: 8.5,
    description: 'Lower Parel has transformed from a mill district to Mumbai\'s corporate hub. With high-rise offices, luxury residences, fine dining, and cultural spaces, it epitomizes urban regeneration.',
    heroImage: '/api/placeholder/1200/400',
    metrics: {
      safety: { score: 8.5, breakdown: { police: 8.5, lighting: 9, cctv: 9.5, crowd: 7.5 } },
      affordability: { score: 4.5, breakdown: { rent: 3.5, utilities: 5, groceries: 5, transport: 5 } },
      transit: { score: 9.2, breakdown: { metro: 9, bus: 9, local: 10, taxi: 9 } },
      amenities: { score: 9.2, breakdown: { schools: 8.5, hospitals: 9.5, parks: 8, shopping: 10 } }
    },
    costOfLiving: {
      rent: { '1bhk': 55000, '2bhk': 90000, '3bhk': 150000 },
      utilities: { electricity: 4000, water: 900, gas: 1300, internet: 1200 },
      groceries: 16000,
      transport: 4000,
      mumbaiAverage: { '1bhk': 25000, '2bhk': 45000, '3bhk': 70000 }
    },
    amenitiesCount: { schools: 15, hospitals: 18, parks: 5, restaurants: 198, cafes: 112, gyms: 45 },
    neighbors: ['Prabhadevi', 'Worli', 'Elphinstone Road', 'Mahalaxmi'],
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300']
  },
  'borivali-west': {
    name: 'Borivali West',
    location: 'Western Suburbs',
    overallScore: 7.5,
    description: 'Borivali West offers a peaceful residential environment with proximity to Sanjay Gandhi National Park. It combines affordable living with good infrastructure and connectivity to the city center.',
    heroImage: '/api/placeholder/1200/400',
    metrics: {
      safety: { score: 8.2, breakdown: { police: 8, lighting: 8, cctv: 8, crowd: 8.5 } },
      affordability: { score: 7.5, breakdown: { rent: 8, utilities: 7.5, groceries: 7, transport: 7.5 } },
      transit: { score: 8.5, breakdown: { metro: 8, bus: 9, local: 9, taxi: 8 } },
      amenities: { score: 8.0, breakdown: { schools: 8.5, hospitals: 8, parks: 9, shopping: 7 } }
    },
    costOfLiving: {
      rent: { '1bhk': 22000, '2bhk': 38000, '3bhk': 60000 },
      utilities: { electricity: 2500, water: 600, gas: 900, internet: 800 },
      groceries: 10000,
      transport: 4000,
      mumbaiAverage: { '1bhk': 25000, '2bhk': 45000, '3bhk': 70000 }
    },
    amenitiesCount: { schools: 28, hospitals: 14, parks: 15, restaurants: 89, cafes: 34, gyms: 18 },
    neighbors: ['Kandivali West', 'Borivali East', 'Gorai', 'Dahisar'],
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300']
  }
};

// Utility function to get color based on score
const getScoreColor = (score) => {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-yellow-600';
  return 'text-red-600';
};

const getScoreBgColor = (score) => {
  if (score >= 8) return 'bg-green-100';
  if (score >= 6) return 'bg-yellow-100';
  return 'bg-red-100';
};

// Components
const MetricCard = ({ title, score, icon: Icon, breakdown }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getScoreBgColor(score)}`}>
            <Icon className={`w-5 h-5 ${getScoreColor(score)}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}/10</p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        {showBreakdown ? 'Hide' : 'Show'} Breakdown
      </button>
      
      {showBreakdown && breakdown && (
        <div className="mt-4 space-y-2">
          {Object.entries(breakdown).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">{key}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${value >= 8 ? 'bg-green-500' : value >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${value * 10}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 w-8">{value}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CostItem = ({ label, value, comparison, isRent = false }) => {
  const diff = isRent ? ((value - comparison) / comparison * 100).toFixed(0) : 0;
  const isHigher = value > comparison;
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-900">₹{value.toLocaleString()}</span>
        {isRent && (
          <div className={`flex items-center gap-1 text-xs ${isHigher ? 'text-red-600' : 'text-green-600'}`}>
            {isHigher ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{Math.abs(diff)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component - Can be used as a page with slug prop
export default function AreaDetailPage({ slug = 'bandra-west' }) {
  const [activeTab, setActiveTab] = useState('overview');
  const neighborhood = neighborhoodsData[slug];
  
  if (!neighborhood) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Neighborhood Not Found</h1>
          <p className="text-gray-600">The requested neighborhood does not exist.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cost', label: 'Cost of Living' },
    { id: 'transport', label: 'Transport' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'reviews', label: 'Reviews' }
  ];

  const renderStars = (score) => {
    const stars = Math.round(score / 2);
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">{neighborhood.name}</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {neighborhood.location}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Mumbai, Maharashtra</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors">
                <Heart className="w-4 h-4" />
                <span className="font-medium">Save</span>
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="font-medium">Share</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
                <Map className="w-4 h-4" />
                <span className="font-medium">View on Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 bg-gray-300">
        <img 
          src={neighborhood.heroImage} 
          alt={neighborhood.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-xl inline-block">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Overall Score</p>
                  <p className="text-4xl font-bold text-gray-900">{neighborhood.overallScore}</p>
                </div>
                <div className="h-12 w-px bg-gray-300" />
                <div>
                  {renderStars(neighborhood.overallScore)}
                  <p className="text-xs text-gray-500 mt-1">Based on 1,245 reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 font-medium transition-colors relative ${
                  activeTab === tab.id 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About {neighborhood.name}</h2>
              <p className="text-gray-700 leading-relaxed">{neighborhood.description}</p>
            </div>

            {/* Metrics Grid */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                  title="Safety" 
                  score={neighborhood.metrics.safety.score} 
                  icon={Shield}
                  breakdown={neighborhood.metrics.safety.breakdown}
                />
                <MetricCard 
                  title="Affordability" 
                  score={neighborhood.metrics.affordability.score} 
                  icon={DollarSign}
                  breakdown={neighborhood.metrics.affordability.breakdown}
                />
                <MetricCard 
                  title="Transit" 
                  score={neighborhood.metrics.transit.score} 
                  icon={Train}
                  breakdown={neighborhood.metrics.transit.breakdown}
                />
                <MetricCard 
                  title="Amenities" 
                  score={neighborhood.metrics.amenities.score} 
                  icon={ShoppingBag}
                  breakdown={neighborhood.metrics.amenities.breakdown}
                />
              </div>
            </div>

            {/* Photos Gallery */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Photos</h2>
              <div className="grid grid-cols-3 gap-4">
                {neighborhood.photos.map((photo, idx) => (
                  <div key={idx} className="relative h-48 bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                    <img src={photo} alt={`${neighborhood.name} ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cost' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Rent Prices */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Rent Prices
                </h2>
                <div className="space-y-1">
                  <CostItem 
                    label="1 BHK" 
                    value={neighborhood.costOfLiving.rent['1bhk']} 
                    comparison={neighborhood.costOfLiving.mumbaiAverage['1bhk']}
                    isRent={true}
                  />
                  <CostItem 
                    label="2 BHK" 
                    value={neighborhood.costOfLiving.rent['2bhk']} 
                    comparison={neighborhood.costOfLiving.mumbaiAverage['2bhk']}
                    isRent={true}
                  />
                  <CostItem 
                    label="3 BHK" 
                    value={neighborhood.costOfLiving.rent['3bhk']} 
                    comparison={neighborhood.costOfLiving.mumbaiAverage['3bhk']}
                    isRent={true}
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Compared to Mumbai average</p>
                </div>
              </div>

              {/* Utilities */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Utilities</h2>
                <div className="space-y-1">
                  <CostItem label="Electricity" value={neighborhood.costOfLiving.utilities.electricity} />
                  <CostItem label="Water" value={neighborhood.costOfLiving.utilities.water} />
                  <CostItem label="Gas" value={neighborhood.costOfLiving.utilities.gas} />
                  <CostItem label="Internet" value={neighborhood.costOfLiving.utilities.internet} />
                </div>
              </div>

              {/* Other Costs */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Other Monthly Costs</h2>
                <div className="space-y-1">
                  <CostItem label="Groceries (per person)" value={neighborhood.costOfLiving.groceries} />
                  <CostItem label="Transportation" value={neighborhood.costOfLiving.transport} />
                </div>
              </div>

              {/* Cost Comparison Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Rent vs Mumbai Average</h2>
                <div className="space-y-4">
                  {['1bhk', '2bhk', '3bhk'].map(type => {
                    const local = neighborhood.costOfLiving.rent[type];
                    const avg = neighborhood.costOfLiving.mumbaiAverage[type];
                    const maxValue = Math.max(local, avg);
                    
                    return (
                      <div key={type}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium uppercase">{type.replace('bhk', ' BHK')}</span>
                          <span className="text-gray-600">₹{local.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <div className="h-8 bg-blue-100 rounded overflow-hidden">
                              <div 
                                className="h-full bg-blue-600 flex items-center justify-end pr-2"
                                style={{ width: `${(local / maxValue) * 100}%` }}
                              >
                                <span className="text-xs text-white font-medium">This Area</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="h-8 bg-gray-100 rounded overflow-hidden">
                              <div 
                                className="h-full bg-gray-400 flex items-center justify-end pr-2"
                                style={{ width: `${(avg / maxValue) * 100}%` }}
                              >
                                <span className="text-xs text-white font-medium">Mumbai Avg</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transport' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Transit Connectivity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(neighborhood.metrics.transit.breakdown).map(([mode, score]) => {
                  const icons = {
                    metro: Train,
                    bus: Bus,
                    local: Train,
                    taxi: Bus
                  };
                  const Icon = icons[mode] || Train;
                  
                  return (
                    <div key={mode} className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${getScoreBgColor(score)}`}>
                        <Icon className={`w-6 h-6 ${getScoreColor(score)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium capitalize text-gray-900">{mode}</span>
                          <span className={`font-bold ${getScoreColor(score)}`}>{score}/10</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${score >= 8 ? 'bg-green-500' : score >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${score * 10}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Transit Information</h3>
              <p className="text-blue-800 text-sm">
                {neighborhood.name} offers excellent connectivity via multiple transport modes. 
                The area is well-served by local trains, metro lines, and bus routes, making it easy to commute across Mumbai.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: School, label: 'Schools', count: neighborhood.amenitiesCount.schools },
                { icon: Hospital, label: 'Hospitals', count: neighborhood.amenitiesCount.hospitals },
                { icon: TreePine, label: 'Parks', count: neighborhood.amenitiesCount.parks },
                { icon: Utensils, label: 'Restaurants', count: neighborhood.amenitiesCount.restaurants },
                { icon: Coffee, label: 'Cafes', count: neighborhood.amenitiesCount.cafes },
                { icon: ShoppingBag, label: 'Gyms', count: neighborhood.amenitiesCount.gyms }
              ].map(({ icon: Icon, label, count }) => (
                <div key={label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                  <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-gray-900 mb-1">{count}</p>
                  <p className="text-sm text-gray-600">{label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities Breakdown</h2>
              <div className="space-y-4">
                {Object.entries(neighborhood.metrics.amenities.breakdown).map(([category, score]) => (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium capitalize text-gray-900">{category}</span>
                      <span className={`font-bold ${getScoreColor(score)}`}>{score}/10</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${score >= 8 ? 'bg-green-500' : score >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${score * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg">Reviews coming soon...</p>
            <p className="text-gray-500 text-sm mt-2">Be the first to review {neighborhood.name}!</p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Write a Review
            </button>
          </div>
        )}

        {/* Neighboring Areas */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Neighborhoods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {neighborhood.neighbors.map(neighbor => (
              <a
                key={neighbor}
                href={`/area/${neighbor.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {neighbor}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Add to Comparison CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Compare with Other Areas</h3>
              <p className="text-blue-100">Add {neighborhood.name} to your comparison list to see how it stacks up against other neighborhoods.</p>
            </div>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-colors whitespace-nowrap">
              Add to Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// For Next.js, export this function to generate static params
export function generateStaticParams() {
  return Object.keys(neighborhoodsData).map(slug => ({ slug }));
}

// Sample usage showing different neighborhoods
export function SampleNeighborhoodPages() {
  const [currentSlug, setCurrentSlug] = useState('bandra-west');
  const slugs = Object.keys(neighborhoodsData);
  
  return (
    <div>
      {/* Navigation to switch between neighborhoods */}
      <div className="bg-gray-900 text-white p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="font-bold">Sample Neighborhoods:</h2>
          <div className="flex gap-2">
            {slugs.map(slug => (
              <button
                key={slug}
                onClick={() => setCurrentSlug(slug)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentSlug === slug 
                    ? 'bg-blue-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {neighborhoodsData[slug].name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <AreaDetailPage slug={currentSlug} />
    </div>
  );
}