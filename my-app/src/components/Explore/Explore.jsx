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
  Menu,
  ExternalLink
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock Mumbai neighborhood data
const MUMBAI_NEIGHBORHOODS = [
  {
    id: 1,
    name: 'Bandra West',
    slug: 'bandra-west',
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
    },
    description: 'A vibrant suburb known for its trendy cafes, nightlife, and proximity to the sea.',
    population: 'Approx. 350,000',
    landmarks: ['Bandra-Worli Sea Link', 'Mount Mary Church', 'Carter Road Promenade'],
    popularResidentialAreas: ['Pali Hill', 'Union Park', 'Waroda Road'],
    transportHubs: ['Bandra Station (Western Line)', 'Bandra Bus Depot'],
    avgPropertyPrice: '₹4.5 - 6 Crores',
    famousFor: ['Celebrity residences', 'Boutique cafes', 'Art galleries', 'Weekend markets']
  },
  {
    id: 2,
    name: 'Andheri East',
    slug: 'andheri-east',
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
    },
    description: 'Commercial hub with excellent connectivity, corporate offices, and modern residential complexes.',
    population: 'Approx. 450,000',
    landmarks: ['Chhatrapati Shivaji International Airport', 'Saki Naka', 'Metro Station'],
    popularResidentialAreas: ['Marol', 'Saki Naka', 'Chakala'],
    transportHubs: ['Andheri Station (Western & Metro)', 'Airport Terminal'],
    avgPropertyPrice: '₹2.5 - 4 Crores',
    famousFor: ['Corporate offices', 'Industrial areas', 'Budget hotels', 'International airport proximity']
  },
  {
    id: 3,
    name: 'Powai',
    slug: 'powai',
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
    },
    description: 'Prestigious educational and corporate hub with beautiful lakeside views and modern infrastructure.',
    population: 'Approx. 250,000',
    landmarks: ['Powai Lake', 'IIT Bombay', 'Hiranandani Gardens'],
    popularResidentialAreas: ['Hiranandani Complex', 'L&T Colony', 'Tirandaz'],
    transportHubs: ['Powai Metro Station', 'Kanjurmarg Station'],
    avgPropertyPrice: '₹3.5 - 5 Crores',
    famousFor: ['IIT Bombay', 'Tech parks', 'Luxury apartments', 'Lake view properties']
  },
  {
    id: 4,
    name: 'Colaba',
    slug: 'colaba',
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
    },
    description: 'Historic peninsula area with colonial architecture, luxury boutiques, and waterfront views.',
    population: 'Approx. 120,000',
    landmarks: ['Gateway of India', 'Taj Mahal Palace Hotel', 'Colaba Causeway'],
    popularResidentialAreas: ['Cuffe Parade', 'Apollo Bandar', 'Navy Nagar'],
    transportHubs: ['CST Station', 'Colaba Bus Terminus'],
    avgPropertyPrice: '₹6 - 10 Crores',
    famousFor: ['Heritage buildings', 'Luxury hotels', 'Art galleries', 'Fine dining restaurants']
  },
  {
    id: 5,
    name: 'Malad West',
    slug: 'malad-west',
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
    },
    description: 'Residential suburb with good amenities, shopping complexes, and growing infrastructure.',
    population: 'Approx. 500,000',
    landmarks: ['Malad Creek', 'Inorbit Mall', 'Orchid City'],
    popularResidentialAreas: ['Kandivali Link Road', 'Evershine Nagar', 'Chincholi Bunder'],
    transportHubs: ['Malad Station (Western Line)', 'Mindspace Junction'],
    avgPropertyPrice: '₹1.8 - 3 Crores',
    famousFor: ['Shopping malls', 'Affordable housing', 'Beach proximity', 'Educational institutes']
  },
  {
    id: 6,
    name: 'Lower Parel',
    slug: 'lower-parel',
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
    },
    description: 'Transformed textile mill area now a prime commercial and residential hub with luxury developments.',
    population: 'Approx. 150,000',
    landmarks: ['High Street Phoenix', 'One International Centre', 'Palladium'],
    popularResidentialAreas: ['Phoenix Mills Compound', 'Kamala Mills', 'Todi Mills'],
    transportHubs: ['Lower Parel Station', 'Elphinstone Road Station'],
    avgPropertyPrice: '₹5 - 8 Crores',
    famousFor: ['Luxury shopping', 'Corporate headquarters', 'Fine dining', 'Nightlife']
  },
  {
    id: 7,
    name: 'Thane West',
    slug: 'thane-west',
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
    },
    description: 'Rapidly developing area with good infrastructure, affordability, and growing commercial spaces.',
    population: 'Approx. 1,200,000',
    landmarks: ['Upvan Lake', 'Talao Pali', 'Viviana Mall'],
    popularResidentialAreas: ['Hiranandani Estate', 'Waghbil', 'Kopri'],
    transportHubs: ['Thane Station (Central Line)', 'Metro Station'],
    avgPropertyPrice: '₹1.5 - 2.5 Crores',
    famousFor: ['Lakes', 'Affordable luxury', 'Educational institutes', 'Shopping malls']
  },
  {
    id: 8,
    name: 'Worli',
    slug: 'worli',
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
    },
    description: 'Premium residential and commercial area with sea-facing properties and high-end lifestyle.',
    population: 'Approx. 100,000',
    landmarks: ['Worli Sea Face', 'Nehru Centre', 'Worli Fort', 'Bandra-Worli Sea Link'],
    popularResidentialAreas: ['Worli Sea Face', 'Babulnath', 'Atria Mall Area'],
    transportHubs: ['Worli Naka', 'Sea Link Access'],
    avgPropertyPrice: '₹8 - 15 Crores',
    famousFor: ['Sea views', 'Celebrity homes', 'Corporate offices', 'Luxury apartments']
  },
  {
    id: 9,
    name: 'Goregaon East',
    slug: 'goregaon-east',
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
    },
    description: 'Mixed residential and commercial area with film industry presence and green spaces.',
    population: 'Approx. 350,000',
    landmarks: ['Film City', 'Aarey Colony', 'Oberoi Mall'],
    popularResidentialAreas: ['Oberoi Garden City', 'Aarey Colony', 'Goregaon Link Road'],
    transportHubs: ['Goregaon Station (Western Line)', 'Metro Station'],
    avgPropertyPrice: '₹2 - 3.5 Crores',
    famousFor: ['Film City', 'Green spaces', 'Shopping malls', 'Affordable housing']
  },
  {
    id: 10,
    name: 'Juhu',
    slug: 'juhu',
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
    },
    description: 'Beachfront suburb popular with Bollywood celebrities, offering luxury living and entertainment.',
    population: 'Approx. 220,000',
    landmarks: ['Juhu Beach', 'Prithvi Theatre', 'ISKCON Temple'],
    popularResidentialAreas: ['Juhu Scheme', 'Juhu Tara Road', 'Gulmohar Road'],
    transportHubs: ['Vile Parle Station', 'Juhu Aerodrome'],
    avgPropertyPrice: '₹6 - 9 Crores',
    famousFor: ['Beach promenade', 'Bollywood celebrities', 'Luxury hotels', 'Street food']
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
      
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
    </div>
  );
};

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
      router.push(`/areas/${neighborhood.slug}`);
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (map.current) return;

    // Create map
    map.current = L.map(mapContainer.current, {
      center: [19.0760, 72.8777],
      zoom: 11,
      zoomControl: true,
      preferCanvas: true // Better performance
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map.current);

    // Create a separate layer group for labels to control z-index
    const labelLayer = L.layerGroup().addTo(map.current);

    // Add neighborhood polygons
    MUMBAI_NEIGHBORHOODS.forEach(neighborhood => {
      const polygon = L.polygon(neighborhood.bounds, {
        color: '#1e293b',
        weight: 2,
        fillColor: '#3b82f6',
        fillOpacity: 0.3,
        className: 'neighborhood-polygon'
      }).addTo(map.current);

      // Single click handler with debounce
      let clickTimer;
      polygon.on('click', (e) => {
        e.originalEvent.stopPropagation();
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
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
        }, 200);
      });

      // Double-click for details
      polygon.on('dblclick', (e) => {
        e.originalEvent.stopPropagation();
        clearTimeout(clickTimer);
        navigateToAreaDetails(neighborhood);
      });

      // Hover effects
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

      polygonsRef.current[neighborhood.id] = polygon;

      // Create label as a custom divIcon with better styling
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
          transition: all 0.2s ease;
          cursor: pointer;
          user-select: none;
          font-family: 'Montserrat', sans-serif;
        ">
          ${neighborhood.name}
        </div>
      `;

      // Create label using custom icon class
      const labelIcon = new CustomLabelIcon({
        html: labelDiv,
        className: 'custom-label-icon',
        iconSize: [100, 40],
        iconAnchor: [50, 20]
      });

      const label = L.marker(neighborhood.coordinates, {
        icon: labelIcon,
        interactive: true,
        bubblingMouseEvents: false, // Prevent event bubbling to map
        zIndexOffset: 1000 // Ensure labels stay on top
      }).addTo(labelLayer);

      // Add click handler to label
      label.on('click', (e) => {
        e.originalEvent.stopPropagation();
        e.originalEvent.preventDefault();
        navigateToAreaDetails(neighborhood);
      });

      // Add hover effects to label
      label.on('mouseover', (e) => {
        e.originalEvent.stopPropagation();
        const element = label.getElement();
        if (element) {
          const innerDiv = element.querySelector('div');
          if (innerDiv) {
            innerDiv.style.background = '#f59e0b';
            innerDiv.style.color = '#1e293b';
            innerDiv.style.transform = 'scale(1.1)';
            innerDiv.style.boxShadow = '0 5px 15px rgba(245, 158, 11, 0.4)';
            innerDiv.style.borderColor = '#f59e0b';
          }
        }
      });

      label.on('mouseout', (e) => {
        e.originalEvent.stopPropagation();
        const element = label.getElement();
        if (element) {
          const innerDiv = element.querySelector('div');
          if (innerDiv) {
            innerDiv.style.background = 'white';
            innerDiv.style.color = '#1e293b';
            innerDiv.style.transform = 'scale(1)';
            innerDiv.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16)';
            innerDiv.style.borderColor = 'transparent';
          }
        }
      });

      labelsRef.current[neighborhood.id] = label;
    });

    // Add click event to map to clear selection
    map.current.on('click', (e) => {
      // Only clear if clicking directly on map (not on polygon or label)
      if (e.originalEvent.target.className === 'leaflet-container' || 
          e.originalEvent.target.className === 'leaflet-pane leaflet-map-pane') {
        Object.values(polygonsRef.current).forEach(polygon => {
          polygon.setStyle({
            fillColor: '#3b82f6',
            fillOpacity: 0.3
          });
        });
        setSelectedNeighborhood(null);
      }
    });

    // Force labels to stay on top
    setTimeout(() => {
      Object.values(labelsRef.current).forEach(label => {
        const element = label.getElement();
        if (element) {
          element.style.zIndex = '1000';
          element.style.pointerEvents = 'auto';
        }
      });
    }, 100);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      polygonsRef.current = {};
      labelsRef.current = {};
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
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-900 border border-amber-500/30 rounded-xl shadow-xl hover:bg-slate-800 transition-all"
      >
        <Menu className="w-6 h-6 text-amber-500" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r-4 border-amber-500 shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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

          <button
            onClick={() => setIsDrawerOpen(true)}
            disabled={comparisonList.length === 0}
            className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-slate-900 disabled:text-slate-500 font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
          >
            <BarChart3 className="w-5 h-5" />
            Compare {comparisonList.length > 0 && `(${comparisonList.length})`}
          </button>

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
          className="hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 p-3 bg-slate-900 border border-amber-500/30 rounded-r-xl shadow-xl hover:bg-slate-800 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-amber-500" />
        </button>
      </div>

      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-slate-900 border border-amber-500/30 rounded-r-xl shadow-xl hover:bg-slate-800 transition-all"
        >
          <ChevronRight className="w-5 h-5 text-amber-500" />
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
        
        /* Fix for Leaflet marker z-index */
        .leaflet-pane > svg {
          z-index: 200;
        }
        
        .leaflet-pane > canvas {
          z-index: 100;
        }
        
        .leaflet-marker-pane {
          z-index: 1000 !important;
        }
      `}</style>
    </div>
  );
}