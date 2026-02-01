'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { create } from 'zustand';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  Car,
  Bike,
  Footprints,
  X,
  TrendingUp,
  BarChart3,
  Menu
} from 'lucide-react';

// Mock Mumbai neighborhood data
const MUMBAI_NEIGHBORHOODS = [
  {
    id: 1,
    name: 'Bandra West',
    coordinates: [19.0596, 72.8281],
    bounds: [
      [19.0496, 72.8181],
      [19.0496, 72.8381],
      [19.0696, 72.8381],
      [19.0696, 72.8181],
      [19.0496, 72.8181]
    ],
    metrics: {
      safety: 85,
      affordability: 45,
      transit: 90,
      amenities: 95,
      schools: 88,
      avgRent: 65000,
      crimeRate: 'Low',
      transitScore: 'Excellent',
      walkScore: 92
    }
  },
  {
    id: 2,
    name: 'Andheri East',
    coordinates: [19.1136, 72.8697],
    bounds: [
      [19.1036, 72.8597],
      [19.1036, 72.8797],
      [19.1236, 72.8797],
      [19.1236, 72.8597],
      [19.1036, 72.8597]
    ],
    metrics: {
      safety: 78,
      affordability: 60,
      transit: 85,
      amenities: 82,
      schools: 80,
      avgRent: 48000,
      crimeRate: 'Moderate',
      transitScore: 'Very Good',
      walkScore: 78
    }
  },
  {
    id: 3,
    name: 'Powai',
    coordinates: [19.1176, 72.9050],
    bounds: [
      [19.1076, 72.8950],
      [19.1076, 72.9150],
      [19.1276, 72.9150],
      [19.1276, 72.8950],
      [19.1076, 72.8950]
    ],
    metrics: {
      safety: 90,
      affordability: 50,
      transit: 70,
      amenities: 88,
      schools: 92,
      avgRent: 55000,
      crimeRate: 'Very Low',
      transitScore: 'Good',
      walkScore: 75
    }
  },
  {
    id: 4,
    name: 'Colaba',
    coordinates: [18.9067, 72.8147],
    bounds: [
      [18.8967, 72.8047],
      [18.8967, 72.8247],
      [18.9167, 72.8247],
      [18.9167, 72.8047],
      [18.8967, 72.8047]
    ],
    metrics: {
      safety: 88,
      affordability: 30,
      transit: 75,
      amenities: 90,
      schools: 85,
      avgRent: 85000,
      crimeRate: 'Low',
      transitScore: 'Good',
      walkScore: 88
    }
  },
  {
    id: 5,
    name: 'Malad West',
    coordinates: [19.1875, 72.8397],
    bounds: [
      [19.1775, 72.8297],
      [19.1775, 72.8497],
      [19.1975, 72.8497],
      [19.1975, 72.8297],
      [19.1775, 72.8297]
    ],
    metrics: {
      safety: 75,
      affordability: 70,
      transit: 80,
      amenities: 75,
      schools: 78,
      avgRent: 38000,
      crimeRate: 'Moderate',
      transitScore: 'Very Good',
      walkScore: 70
    }
  },
  {
    id: 6,
    name: 'Lower Parel',
    coordinates: [18.9956, 72.8311],
    bounds: [
      [18.9856, 72.8211],
      [18.9856, 72.8411],
      [19.0056, 72.8411],
      [19.0056, 72.8211],
      [18.9856, 72.8211]
    ],
    metrics: {
      safety: 82,
      affordability: 40,
      transit: 92,
      amenities: 85,
      schools: 75,
      avgRent: 72000,
      crimeRate: 'Low',
      transitScore: 'Excellent',
      walkScore: 85
    }
  },
  {
    id: 7,
    name: 'Thane West',
    coordinates: [19.2183, 72.9781],
    bounds: [
      [19.2083, 72.9681],
      [19.2083, 72.9881],
      [19.2283, 72.9881],
      [19.2283, 72.9681],
      [19.2083, 72.9681]
    ],
    metrics: {
      safety: 80,
      affordability: 75,
      transit: 75,
      amenities: 78,
      schools: 82,
      avgRent: 32000,
      crimeRate: 'Moderate',
      transitScore: 'Good',
      walkScore: 68
    }
  },
  {
    id: 8,
    name: 'Worli',
    coordinates: [19.0176, 72.8169],
    bounds: [
      [19.0076, 72.8069],
      [19.0076, 72.8269],
      [19.0276, 72.8269],
      [19.0276, 72.8069],
      [19.0076, 72.8069]
    ],
    metrics: {
      safety: 92,
      affordability: 25,
      transit: 88,
      amenities: 93,
      schools: 90,
      avgRent: 95000,
      crimeRate: 'Very Low',
      transitScore: 'Excellent',
      walkScore: 90
    }
  },
  {
    id: 9,
    name: 'Goregaon East',
    coordinates: [19.1653, 72.8697],
    bounds: [
      [19.1553, 72.8597],
      [19.1553, 72.8797],
      [19.1753, 72.8797],
      [19.1753, 72.8597],
      [19.1553, 72.8597]
    ],
    metrics: {
      safety: 77,
      affordability: 65,
      transit: 82,
      amenities: 80,
      schools: 79,
      avgRent: 42000,
      crimeRate: 'Moderate',
      transitScore: 'Very Good',
      walkScore: 72
    }
  },
  {
    id: 10,
    name: 'Juhu',
    coordinates: [19.1075, 72.8267],
    bounds: [
      [19.0975, 72.8167],
      [19.0975, 72.8367],
      [19.1175, 72.8367],
      [19.1175, 72.8167],
      [19.0975, 72.8167]
    ],
    metrics: {
      safety: 87,
      affordability: 35,
      transit: 78,
      amenities: 88,
      schools: 86,
      avgRent: 78000,
      crimeRate: 'Low',
      transitScore: 'Good',
      walkScore: 80
    }
  }
];

// Zustand Store
const useMapStore = create((set) => ({
  mapView: {
    center: [19.0760, 72.8777],
    zoom: 11
  },
  preferences: {
    safety: 50,
    affordability: 50,
    transit: 50,
    amenities: 50,
    schools: 50
  },
  selectedNeighborhood: null,
  comparisonList: [],
  workLocation: null,
  commuteMode: 'car',
  commuteTime: 30,
  
  setMapView: (view) => set({ mapView: view }),
  setPreference: (key, value) => set((state) => ({
    preferences: { ...state.preferences, [key]: value }
  })),
  setSelectedNeighborhood: (neighborhood) => set({ selectedNeighborhood: neighborhood }),
  addToComparison: (neighborhood) => set((state) => {
    if (state.comparisonList.length >= 4) return state;
    if (state.comparisonList.find(n => n.id === neighborhood.id)) return state;
    return { comparisonList: [...state.comparisonList, neighborhood] };
  }),
  removeFromComparison: (neighborhoodId) => set((state) => ({
    comparisonList: state.comparisonList.filter(n => n.id !== neighborhoodId)
  })),
  clearComparison: () => set({ comparisonList: [] }),
  setWorkLocation: (location) => set({ workLocation: location }),
  setCommuteMode: (mode) => set({ commuteMode: mode }),
  setCommuteTime: (time) => set({ commuteTime: time })
}));

// Drawer Component
const ComparisonDrawer = ({ isOpen, onClose }) => {
  const { comparisonList, removeFromComparison } = useMapStore();
  
  if (!isOpen) return null;

  const metrics = [
    { key: 'safety', label: 'Safety Score', format: (v) => `${v}%` },
    { key: 'affordability', label: 'Affordability Score', format: (v) => `${v}%` },
    { key: 'transit', label: 'Transit Score', format: (v) => `${v}%` },
    { key: 'amenities', label: 'Amenities Score', format: (v) => `${v}%` },
    { key: 'schools', label: 'Schools Score', format: (v) => `${v}%` },
    { key: 'avgRent', label: 'Avg. Rent (₹/month)', format: (v) => `₹${v.toLocaleString()}` },
    { key: 'walkScore', label: 'Walk Score', format: (v) => `${v}/100` }
  ];

  const getWinner = (metricKey) => {
    if (comparisonList.length === 0) return null;
    
    const isLowerBetter = metricKey === 'avgRent';
    let winner = comparisonList[0];
    
    comparisonList.forEach(n => {
      const currentValue = n.metrics[metricKey];
      const winnerValue = winner.metrics[metricKey];
      
      if (isLowerBetter) {
        if (currentValue < winnerValue) winner = n;
      } else {
        if (currentValue > winnerValue) winner = n;
      }
    });
    
    return winner.id;
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div 
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t-4 border-amber-500 shadow-2xl transform transition-transform duration-500 ease-out pointer-events-auto ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '75vh', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}
      >
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Neighborhood Comparison
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-300" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {comparisonList.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No neighborhoods selected for comparison</p>
                <p className="text-slate-500 text-sm mt-2">Click on neighborhoods to add them</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-4 px-4 text-slate-400 font-semibold">Metric</th>
                      {comparisonList.map(neighborhood => (
                        <th key={neighborhood.id} className="text-center py-4 px-4">
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-white font-bold text-lg">{neighborhood.name}</span>
                            <button
                              onClick={() => removeFromComparison(neighborhood.id)}
                              className="text-xs text-red-400 hover:text-red-300 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map(metric => {
                      const winnerId = getWinner(metric.key);
                      return (
                        <tr key={metric.key} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                          <td className="py-4 px-4 text-slate-300 font-medium">{metric.label}</td>
                          {comparisonList.map(neighborhood => {
                            const isWinner = neighborhood.id === winnerId;
                            return (
                              <td key={neighborhood.id} className={`py-4 px-4 text-center transition-all ${
                                isWinner 
                                  ? 'bg-amber-500/20 text-amber-300 font-bold scale-105' 
                                  : 'text-slate-400'
                              }`}>
                                <div className="flex items-center justify-center gap-2">
                                  {isWinner && <TrendingUp className="w-4 h-4" />}
                                  {metric.format(neighborhood.metrics[metric.key])}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
    </div>
  );
};

// Main Component
export default function RelocationMapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const polygonsRef = useRef({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState(null);
  
  const {
    preferences,
    selectedNeighborhood,
    comparisonList,
    workLocation,
    commuteMode,
    commuteTime,
    setPreference,
    setSelectedNeighborhood,
    addToComparison,
    setWorkLocation,
    setCommuteMode,
    setCommuteTime
  } = useMapStore();

  // Initialize Leaflet Map
  useEffect(() => {
    if (map.current) return;

    // Create map
    map.current = L.map(mapContainer.current, {
      center: [19.0760, 72.8777],
      zoom: 11,
      zoomControl: true
    });

    // Add OpenStreetMap tiles (completely free!)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map.current);

    // Alternative free tile providers you can use:
    // 1. CartoDB Positron (light theme)
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    //   attribution: '&copy; OpenStreetMap &copy; CartoDB',
    //   maxZoom: 19
    // }).addTo(map.current);

    // 2. CartoDB Dark Matter (dark theme)
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    //   attribution: '&copy; OpenStreetMap &copy; CartoDB',
    //   maxZoom: 19
    // }).addTo(map.current);

    // 3. Stamen Terrain
    // L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
    //   attribution: 'Map tiles by Stamen Design, CC BY 3.0 &mdash; Map data &copy; OpenStreetMap',
    //   maxZoom: 18
    // }).addTo(map.current);

    // Add neighborhood polygons
    MUMBAI_NEIGHBORHOODS.forEach(neighborhood => {
      const polygon = L.polygon(neighborhood.bounds, {
        color: '#1e293b',
        weight: 2,
        fillColor: '#3b82f6',
        fillOpacity: 0.3
      }).addTo(map.current);

      // Add click event
      polygon.on('click', () => {
        setSelectedNeighborhood(neighborhood);
        map.current.flyTo(neighborhood.coordinates, 13);
        
        // Reset all polygons
        Object.values(polygonsRef.current).forEach(p => {
          p.setStyle({
            fillColor: '#3b82f6',
            fillOpacity: 0.3
          });
        });
        
        // Highlight selected
        polygon.setStyle({
          fillColor: '#f59e0b',
          fillOpacity: 0.5
        });
      });

      // Add hover events
      polygon.on('mouseover', () => {
        setHoveredNeighborhood(neighborhood);
        if (!selectedNeighborhood || selectedNeighborhood.id !== neighborhood.id) {
          polygon.setStyle({
            fillColor: '#f59e0b',
            fillOpacity: 0.6
          });
        }
      });

      polygon.on('mouseout', () => {
        setHoveredNeighborhood(null);
        if (!selectedNeighborhood || selectedNeighborhood.id !== neighborhood.id) {
          polygon.setStyle({
            fillColor: '#3b82f6',
            fillOpacity: 0.3
          });
        }
      });

      // Add label
      const label = L.marker(neighborhood.coordinates, {
        icon: L.divIcon({
          className: 'neighborhood-label',
          html: `<div style="
            background: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 12px;
            color: #1e293b;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            white-space: nowrap;
          ">${neighborhood.name}</div>`,
          iconSize: [100, 40],
          iconAnchor: [50, 20]
        })
      }).addTo(map.current);

      polygonsRef.current[neighborhood.id] = polygon;
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update selected neighborhood styling
  useEffect(() => {
    if (selectedNeighborhood) {
      Object.entries(polygonsRef.current).forEach(([id, polygon]) => {
        if (parseInt(id) === selectedNeighborhood.id) {
          polygon.setStyle({
            fillColor: '#f59e0b',
            fillOpacity: 0.5
          });
        } else {
          polygon.setStyle({
            fillColor: '#3b82f6',
            fillOpacity: 0.3
          });
        }
      });
    }
  }, [selectedNeighborhood]);

  const calculateScore = (neighborhood) => {
    const weights = preferences;
    const metrics = neighborhood.metrics;
    
    const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
    if (totalWeight === 0) return 0;
    
    const score = (
      (metrics.safety * weights.safety) +
      (metrics.affordability * weights.affordability) +
      (metrics.transit * weights.transit) +
      (metrics.amenities * weights.amenities) +
      (metrics.schools * weights.schools)
    ) / totalWeight;
    
    return Math.round(score);
  };

  const sortedNeighborhoods = [...MUMBAI_NEIGHBORHOODS].sort((a, b) => 
    calculateScore(b) - calculateScore(a)
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-900 border border-amber-500/30 rounded-xl shadow-xl hover:bg-slate-800 transition-all"
      >
        <Menu className="w-6 h-6 text-amber-500" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r-4 border-amber-500 shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '400px' }}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em' }}>
              Mumbai
              <span className="text-amber-500">.</span>
            </h1>
            <p className="text-slate-400 text-sm">Find your perfect neighborhood</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search location..."
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Your Preferences
            </h3>
            <div className="space-y-6">
              {[
                { key: 'safety', label: 'Safety', icon: '🛡️' },
                { key: 'affordability', label: 'Affordability', icon: '💰' },
                { key: 'transit', label: 'Transit', icon: '🚇' },
                { key: 'amenities', label: 'Amenities', icon: '🏪' },
                { key: 'schools', label: 'Schools', icon: '🎓' }
              ].map(({ key, label, icon }) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 font-medium flex items-center gap-2">
                      <span>{icon}</span>
                      {label}
                    </span>
                    <span className="text-amber-500 font-bold">{preferences[key]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={preferences[key]}
                    onChange={(e) => setPreference(key, parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${preferences[key]}%, #334155 ${preferences[key]}%, #334155 100%)`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Commute Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Commute Settings
            </h3>
            
            <button
              onClick={() => {
                // Mock work location setting
                setWorkLocation([19.0760, 72.8777]);
              }}
              className="w-full mb-4 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              {workLocation ? 'Update Work Location' : 'Set Work Location'}
            </button>

            {workLocation && (
              <>
                <div className="mb-4">
                  <label className="text-slate-300 text-sm mb-2 block">Transport Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { mode: 'car', icon: Car, label: 'Car' },
                      { mode: 'bike', icon: Bike, label: 'Bike' },
                      { mode: 'walk', icon: Footprints, label: 'Walk' }
                    ].map(({ mode, icon: Icon, label }) => (
                      <button
                        key={mode}
                        onClick={() => setCommuteMode(mode)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          commuteMode === mode
                            ? 'bg-amber-500 border-amber-500 text-slate-900'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-amber-500/50'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-xs font-semibold">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-slate-300 text-sm">Commute Time</label>
                    <span className="text-amber-500 font-bold">{commuteTime} min</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="15"
                    value={commuteTime}
                    onChange={(e) => setCommuteTime(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((commuteTime - 15) / 45) * 100}%, #334155 ${((commuteTime - 15) / 45) * 100}%, #334155 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>15min</span>
                    <span>30min</span>
                    <span>45min</span>
                    <span>60min</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Selected Neighborhood */}
          {selectedNeighborhood && (
            <div className="mb-6 p-4 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {selectedNeighborhood.name}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Match Score</span>
                  <span className="text-amber-500 font-bold">{calculateScore(selectedNeighborhood)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg. Rent</span>
                  <span className="text-white font-semibold">₹{selectedNeighborhood.metrics.avgRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Crime Rate</span>
                  <span className="text-white font-semibold">{selectedNeighborhood.metrics.crimeRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Transit Score</span>
                  <span className="text-white font-semibold">{selectedNeighborhood.metrics.transitScore}</span>
                </div>
              </div>
              <button
                onClick={() => addToComparison(selectedNeighborhood)}
                className="w-full mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-all text-sm"
                disabled={comparisonList.length >= 4 || comparisonList.find(n => n.id === selectedNeighborhood.id)}
              >
                {comparisonList.find(n => n.id === selectedNeighborhood.id) ? 'Already in Comparison' : 'Add to Compare'}
              </button>
            </div>
          )}

          {/* Compare Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            disabled={comparisonList.length === 0}
            className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-slate-900 disabled:text-slate-500 font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
          >
            <BarChart3 className="w-5 h-5" />
            Compare {comparisonList.length > 0 && `(${comparisonList.length})`}
          </button>

          {/* Top Matches */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Top Matches
            </h3>
            <div className="space-y-2">
              {sortedNeighborhoods.slice(0, 5).map((neighborhood, index) => (
                <button
                  key={neighborhood.id}
                  onClick={() => {
                    setSelectedNeighborhood(neighborhood);
                    map.current?.flyTo(neighborhood.coordinates, 13);
                  }}
                  className="w-full p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 rounded-lg transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-bold flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <span className="text-white font-semibold">{neighborhood.name}</span>
                    </div>
                    <span className="text-amber-500 font-bold">{calculateScore(neighborhood)}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 p-3 bg-slate-900 border border-amber-500/30 rounded-r-xl shadow-xl hover:bg-slate-800 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-amber-500" />
        </button>
      </div>

      {/* Sidebar Toggle (when closed) */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-slate-900 border border-amber-500/30 rounded-r-xl shadow-xl hover:bg-slate-800 transition-all"
        >
          <ChevronRight className="w-5 h-5 text-amber-500" />
        </button>
      )}

      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="absolute inset-0"
        style={{ 
          marginLeft: isSidebarOpen ? '400px' : '0',
          transition: 'margin-left 300ms ease-in-out'
        }}
      />

      {/* Hover Tooltip */}
      {hoveredNeighborhood && (
        <div className="fixed top-4 right-4 z-30 p-4 bg-slate-900 border-2 border-amber-500 rounded-xl shadow-2xl max-w-xs pointer-events-none">
          <h4 className="text-white font-bold text-lg mb-2">{hoveredNeighborhood.name}</h4>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Safety:</span>
              <span className="text-white font-semibold">{hoveredNeighborhood.metrics.safety}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Transit:</span>
              <span className="text-white font-semibold">{hoveredNeighborhood.metrics.transit}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Drawer */}
      <ComparisonDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');
        
        .leaflet-container {
          font-family: 'Montserrat', sans-serif;
        }
        
        .neighborhood-label {
          background: none !important;
          border: none !important;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 3px solid #1e293b;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.5);
          transition: all 0.2s;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.6);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 3px solid #1e293b;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.5);
          transition: all 0.2s;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.6);
        }
      `}</style>
    </div>
  );
}