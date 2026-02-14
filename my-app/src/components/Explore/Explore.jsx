'use client';

import { useEffect, useRef, useState } from 'react';
// import L from 'leaflet'; // Dynamic import used instead
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
  Menu,
  ExternalLink
} from 'lucide-react';
import { getLocations } from '@/lib/api';
import { useRouter } from 'next/navigation';

// Mock Mumbai neighborhood data - Removed in favor of Supabase data
const MUMBAI_NEIGHBORHOODS = [];
import { useMapStore } from '@/lib/store';
import { useAuth } from '@/context/AuthContext';

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
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t-4 border-amber-500 shadow-2xl transform transition-transform duration-500 ease-out pointer-events-auto ${isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        style={{ maxHeight: '75vh', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}
      >
        <div className="relative h-full flex flex-col">
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
                              <td key={neighborhood.id} className={`py-4 px-4 text-center transition-all ${isWinner
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

      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />
    </div>
  );
};

// Custom Label Icon Class moved inside useEffect to avoid SSR issues

// Main Component
export default function RelocationMapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const polygonsRef = useRef({});
  const labelsRef = useRef({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState(null);
  const router = useRouter();

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

  const navigateToAreaDetails = (neighborhood) => {
    if (neighborhood?.slug) {
      console.log('Navigating to:', `/areas/${neighborhood.slug}`, 'for', neighborhood.name);
      router.push(`/areas/${neighborhood.slug}`);
    }
  };

  const { user } = useAuth();
  // Fetch locations from Supabase
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLocations();
        // Transform data to match Explore component structure (0-100 scale)
        const transformed = data.map(loc => ({
          ...loc, // Preserve all original properties for Compare Dashboard
          id: loc.id,
          name: loc.name,
          slug: loc.slug,
          coordinates: [loc.lat || 19.0760, loc.lng || 72.8777], // Default to Mumbai center if missing
          metrics: {
            safety: (loc.safety_score || 0) * 10,
            affordability: (loc.cost_of_living_score || 0) * 10,
            transit: (loc.infrastructure_score || 0) * 10, // approximating transit with infrastructure
            amenities: (loc.healthcare_score || 0) * 10, // approximating amenities
            schools: (loc.education_score || 0) * 10,
            avgRent: 2000, // Placeholder or parse from cost_breakdown
            walkScore: 70 // Placeholder
          },
          description: loc.description,
          population: loc.population ? `${(loc.population / 1000000).toFixed(1)}M` : 'N/A'
        }));
        setLocations(transformed);
      } catch (error) {
        console.error("Failed to load locations", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (map.current || loading || locations.length === 0) return;

    const initMap = async () => {
      // Dynamic import
      const L = (await import('leaflet')).default;

      // Custom Label Icon Class
      class CustomLabelIcon extends L.DivIcon {
        createIcon(oldIcon) {
          const div = super.createIcon(oldIcon);
          div.style.pointerEvents = 'auto';
          div.style.cursor = 'pointer';
          div.style.zIndex = '1000';
          return div;
        }
      }

      if (map.current) {
        map.current.remove();
        map.current = null;
      }

      // Create map centered on Mumbai
      map.current = L.map(mapContainer.current, {
        center: [19.0760, 72.8777],
        zoom: 12,
        zoomControl: true,
        preferCanvas: true
      });

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map.current);

      const labelLayer = L.layerGroup().addTo(map.current);

      // Add markers
      locations.forEach((location) => {
        // Use CircleMarker for cities
        const marker = L.circleMarker(location.coordinates, {
          radius: 10,
          fillColor: '#3b82f6',
          color: '#1e293b',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map.current);

        marker.on('click', (e) => {
          e.originalEvent.stopPropagation();
          setSelectedNeighborhood(location);
          map.current.flyTo(location.coordinates, 13); // Changed zoom from 6 to 13 for city level

          // Visual feedback
          marker.setStyle({ fillColor: '#f59e0b', radius: 15 });
        });

        // Hover
        marker.on('mouseover', () => {
          setHoveredNeighborhood(location);
          marker.setStyle({ fillColor: '#f59e0b' });
        });
        marker.on('mouseout', () => {
          setHoveredNeighborhood(null);
          if (selectedNeighborhood?.id !== location.id) {
            marker.setStyle({ fillColor: '#3b82f6' });
          }
        });

        // Labels
        const labelDiv = document.createElement('div');
        labelDiv.className = 'neighborhood-label';
        labelDiv.innerHTML = `
        <div style="
          background: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 12px;
          color: #1e293b;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16);
          white-space: nowrap;
          border: 2px solid transparent;
          font-family: 'Montserrat', sans-serif;
        ">
          ${location.name}
        </div>
      `;

        const labelIcon = new CustomLabelIcon({
          html: labelDiv,
          className: 'custom-label-icon',
          iconSize: [100, 40],
          iconAnchor: [50, -10]
        });

        const label = L.marker(location.coordinates, {
          icon: labelIcon,
          interactive: true,
          zIndexOffset: 1000
        }).addTo(labelLayer);

        label.on('click', () => {
          setSelectedNeighborhood(location);
        });

      });
    };

    initMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [loading, locations]);


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

  const sortedNeighborhoods = [...locations].sort((a, b) =>
    calculateScore(b) - calculateScore(a)
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-24 left-4 z-50 p-3 bg-slate-900 border border-amber-500/30 rounded-xl shadow-xl hover:bg-slate-800 transition-all"
      >
        <Menu className="w-6 h-6 text-amber-500" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r-4 border-amber-500 shadow-2xl z-40 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{ width: '400px' }}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em' }}>
              Mumbai
              <span className="text-amber-500">.</span>
            </h1>
            <p className="text-slate-400 text-sm">Find your perfect neighborhood</p>
          </div>

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


          {selectedNeighborhood && (
            <div className="mb-6 p-4 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedNeighborhood.name}
                </h3>
                <button
                  onClick={() => navigateToAreaDetails(selectedNeighborhood)}
                  className="p-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg transition-all"
                  title="View Area Details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
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
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => addToComparison(selectedNeighborhood)}
                  className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-all text-sm"
                  disabled={comparisonList.length >= 4 || comparisonList.find(n => n.id === selectedNeighborhood.id)}
                >
                  {comparisonList.find(n => n.id === selectedNeighborhood.id) ? 'Already in Comparison' : 'Add to Compare'}
                </button>
                <button
                  onClick={() => navigateToAreaDetails(selectedNeighborhood)}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all text-sm flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Details
                </button>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Commute Settings
            </h3>

            <button
              onClick={() => {
                setWorkLocation([19.0760, 72.8777]);
              }}
              className="w-full mb-4 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              {workLocation ? 'Update Work Location' : 'Set Work Location'}
            </button>

            <button
              onClick={() => {
                if (!user) {
                  router.push('/login');
                  return;
                }
                if (comparisonList.length > 0) {
                  router.push('/compare');
                }
              }}
              disabled={comparisonList.length === 0}
              className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-slate-900 disabled:text-slate-500 font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
            >
              <BarChart3 className="w-5 h-5" />
              Compare {comparisonList.length > 0 && `(${comparisonList.length})`}
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
                        className={`p-3 rounded-lg border-2 transition-all ${commuteMode === mode
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




          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Top Matches
              </h3>
              <span className="text-xs text-slate-400">Click labels for details</span>
            </div>
            <div className="space-y-2">
              {sortedNeighborhoods.slice(0, 5).map((neighborhood, index) => (
                <div
                  key={neighborhood.id}
                  className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg transition-all hover:border-amber-500/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-bold flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <span className="text-white font-semibold">{neighborhood.name}</span>
                    </div>
                    <span className="text-amber-500 font-bold">{calculateScore(neighborhood)}%</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedNeighborhood(neighborhood);
                        map.current?.flyTo(neighborhood.coordinates, 13);
                      }}
                      className="flex-1 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded transition-all"
                    >
                      View on Map
                    </button>
                    <button
                      onClick={() => navigateToAreaDetails(neighborhood)}
                      className="flex-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-all flex items-center justify-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className="hidden lg:block absolute right-4 top-4 z-50 p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all"
        >
          <X className="w-5 h-5 text-slate-400 hover:text-white" />
        </button>
      </div>

      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-[5000] p-3 bg-slate-900 border-2 border-amber-500 rounded-r-xl shadow-2xl hover:bg-slate-800 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-amber-500" />
        </button>
      )}

      <div
        ref={mapContainer}
        className="absolute inset-0"
        style={{
          marginLeft: isSidebarOpen ? '400px' : '0',
          transition: 'margin-left 300ms ease-in-out'
        }}
      />

      {hoveredNeighborhood && (
        <div className="fixed top-4 right-4 z-30 p-4 bg-slate-900 border-2 border-amber-500 rounded-xl shadow-2xl max-w-xs pointer-events-none">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-white font-bold text-lg">{hoveredNeighborhood.name}</h4>
            <button
              onClick={() => navigateToAreaDetails(hoveredNeighborhood)}
              className="p-1 bg-amber-500 text-slate-900 rounded text-xs font-bold"
              title="View Details"
            >
              →
            </button>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Safety:</span>
              <span className="text-white font-semibold">{hoveredNeighborhood.metrics.safety}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Transit:</span>
              <span className="text-white font-semibold">{hoveredNeighborhood.metrics.transit}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rent:</span>
              <span className="text-white font-semibold">₹{hoveredNeighborhood.metrics.avgRent.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Click label for area details</p>
        </div>
      )}

      <ComparisonDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 text-sm text-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500/30 rounded"></div>
            <span>Click</span>
          </div>
          <div className="text-slate-400">Select area</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded"></div>
            <span>Click label</span>
          </div>
          <div className="text-slate-400">View area details</div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');
        
        .leaflet-container {
          font-family: 'Montserrat', sans-serif;
        }
        
        .custom-label-icon {
          background: none !important;
          border: none !important;
        }
        
        .leaflet-marker-icon {
          z-index: 1000 !important;
        }
        
        .neighborhood-polygon {
          cursor: pointer;
          transition: fill 0.3s ease;
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
        
        .leaflet-pane > svg {
          z-index: 200;
        }
        
        .leaflet-pane > canvas {
          z-index: 100;
        }
        
        .leaflet-marker-pane {
          z-index: 1000 !important;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #0f172a; 
        }

        ::-webkit-scrollbar-thumb {
          background: #1e3a8a; 
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #1e40af; 
        }
      `}</style>
    </div>
  );
}