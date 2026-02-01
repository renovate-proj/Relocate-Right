'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaStar, FaChartBar, FaSearch, FaPlus, FaTrash, FaInfoCircle, FaExchangeAlt } from 'react-icons/fa';

export const locationData = [
    {
      id: 1,
      name: 'Austin, TX',
      costOfLiving: 8.2,
      jobProspects: 9.1,
      education: 8.5,
      healthcare: 8.0,
      infrastructure: 8.7,
      overall: 8.5,
      description: 'Fast-growing tech hub with vibrant culture and warm climate. Known for its music scene and outdoor activities.',
      image: 'austin',
    },
    {
      id: 2,
      name: 'Denver, CO',
      costOfLiving: 7.8,
      jobProspects: 8.3,
      education: 8.2,
      healthcare: 8.5,
      infrastructure: 8.0,
      overall: 8.2,
      description: 'Mountain city with strong economy and outdoor lifestyle. High quality of life but increasing cost of living.',
      image: 'denver',
    },
    {
      id: 3,
      name: 'Raleigh, NC',
      costOfLiving: 7.2,
      jobProspects: 8.7,
      education: 9.0,
      healthcare: 8.3,
      infrastructure: 7.8,
      overall: 8.2,
      description: 'Part of the Research Triangle with top universities and growing tech sector. Affordable with mild climate.',
      image: 'raleigh',
    },
    {
      id: 4,
      name: 'Portland, OR',
      costOfLiving: 8.5,
      jobProspects: 7.8,
      education: 8.1,
      healthcare: 8.7,
      infrastructure: 8.4,
      overall: 8.3,
      description: 'Progressive city known for sustainability, food scene, and access to nature. Rainy climate but mild winters.',
      image: 'portland',
    },
  ];

const ComparisonDashboard = () => {
  const [selectedLocations, setSelectedLocations] = useState([locationData[0], locationData[1]]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(locationData);
  const [activeMetric, setActiveMetric] = useState('overall');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Handle search
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredLocations(locationData);
    } else {
      const filtered = locationData.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchTerm]);

  // Add location to comparison
  const addLocation = (location) => {
    if (selectedLocations.length < 4 && !selectedLocations.some(l => l.id === location.id)) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  // Remove location from comparison
  const removeLocation = (id) => {
    setSelectedLocations(selectedLocations.filter(location => location.id !== id));
  };

  // Sort locations
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted locations
  const getSortedLocations = () => {
    if (!sortConfig.key) return selectedLocations;

    return [...selectedLocations].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  // Render metric bar
  const renderMetricBar = (value) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full" 
          style={{ width: `${value * 10}%` }}
        ></div>
      </div>
    );
  };

  // Metric labels
  const metricLabels = {
    overall: 'Overall Rating',
    costOfLiving: 'Cost of Living',
    jobProspects: 'Job Prospects',
    education: 'Education',
    healthcare: 'Healthcare',
    infrastructure: 'Infrastructure'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-indigo-600 w-8 h-8 rounded-lg"></div>
                <span className="ml-2 text-xl font-bold text-gray-900">RelocateRight</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-indigo-600">Home</a>
              <a href="/comparecities" className="text-indigo-600 font-medium">Compare</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Resources</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Methodology</a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Location Comparison</h1>
            <p className="text-gray-600 mt-2">
              Compare locations based on key metrics important for relocation
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              <FaExchangeAlt className="mr-2" />
              Compare Up to 4 Locations
            </button>
          </div>
        </div>

        {/* Location Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
              Selected Locations ({selectedLocations.length}/4)
            </h2>
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search locations..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Selected Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {selectedLocations.map(location => (
              <div key={location.id} className="border rounded-lg p-4 relative">
                <button 
                  onClick={() => removeLocation(location.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10"
                >
                  <FaTrash />
                </button>
                <Link href={`/locationdetail?id=${location.id}`} passHref>
                  <div className="cursor-pointer">
                    <div className={`bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-3 ${location.image}`} />
                    <h3 className="font-medium text-gray-900">{location.name}</h3>
                    <div className="flex items-center mt-1">
                      {renderStars(location.overall)}
                      <span className="ml-2 text-sm font-medium text-gray-900">{location.overall}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            
            {selectedLocations.length < 4 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-4 cursor-pointer hover:border-indigo-400 transition">
                <div 
                  className="text-center text-gray-500 hover:text-indigo-600"
                  onClick={() => addLocation(filteredLocations[0])}
                >
                  <FaPlus className="mx-auto text-2xl mb-2" />
                  <span>Add Location</span>
                </div>
              </div>
            )}
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Search Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredLocations
                  .filter(loc => !selectedLocations.some(selected => selected.id === loc.id))
                  .map(location => (
                    <div 
                      key={location.id} 
                      className="border rounded-lg p-3 flex items-center cursor-pointer hover:bg-indigo-50 transition"
                      onClick={() => addLocation(location)}
                    >
                      <div className={`bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3 ${location.image}`} />
                      <div>
                        <h4 className="font-medium text-gray-900">{location.name}</h4>
                        <div className="flex items-center">
                          {renderStars(location.overall)}
                          <span className="ml-1 text-xs font-medium text-gray-900">{location.overall}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Metrics Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {Object.keys(metricLabels).map(metric => (
              <button
                key={metric}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeMetric === metric
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveMetric(metric)}
              >
                {metricLabels[metric]}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                  >
                    Location
                  </th>
                  {getSortedLocations().map(location => (
                    <th 
                      key={location.id} 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort(activeMetric)}
                    >
                      <div className="flex items-center">
                        <div className={`bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-2 ${location.image}`} />
                        {location.name}
                        <span className="ml-1">
                          {sortConfig.key === activeMetric && 
                            (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {metricLabels[activeMetric]}
                  </td>
                  {getSortedLocations().map(location => (
                    <td key={location.id} className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900 mr-3">
                          {location[activeMetric].toFixed(1)}
                        </span>
                        {renderStars(location[activeMetric])}
                      </div>
                      <div className="mt-2 w-full">
                        {renderMetricBar(location[activeMetric])}
                      </div>
                    </td>
                  ))}
                </tr>
                
                {/* Detailed Metrics */}
                {activeMetric === 'overall' && Object.keys(metricLabels)
                  .filter(metric => metric !== 'overall')
                  .map(metric => (
                    <tr key={metric} className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 pl-10">
                        {metricLabels[metric]}
                      </td>
                      {getSortedLocations().map(location => (
                        <td key={`${location.id}-${metric}`} className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900 mr-3">
                              {location[metric].toFixed(1)}
                            </span>
                            <div className="w-24">
                              {renderMetricBar(location[metric])}
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Location Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {getSortedLocations().map(location => (
            <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{location.name}</h3>
                    <div className="flex items-center mt-1">
                      {renderStars(location.overall)}
                      <span className="ml-2 text-sm font-medium text-gray-900">{location.overall} Overall</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-indigo-600">
                      <FaInfoCircle className="text-lg" />
                    </button>
                    <button 
                      onClick={() => removeLocation(location.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </div>
                
                <p className="mt-4 text-gray-600">{location.description}</p>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Cost of Living</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-bold text-gray-900 mr-2">{location.costOfLiving.toFixed(1)}</span>
                      <div className="w-24">{renderMetricBar(location.costOfLiving)}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Job Prospects</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-bold text-gray-900 mr-2">{location.jobProspects.toFixed(1)}</span>
                      <div className="w-24">{renderMetricBar(location.jobProspects)}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Education</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-bold text-gray-900 mr-2">{location.education.toFixed(1)}</span>
                      <div className="w-24">{renderMetricBar(location.education)}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Infrastructure</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-bold text-gray-900 mr-2">{location.infrastructure.toFixed(1)}</span>
                      <div className="w-24">{renderMetricBar(location.infrastructure)}</div>
                    </div>
                  </div>
                </div>
                
                <Link href={`/locationdetail?id=${location.id}`} passHref>
                    <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                        View Detailed Report
                    </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">RelocateRight</h3>
              <p className="text-gray-400">
                Making relocation decisions easier through data-driven comparisons
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">City Comparison</a></li>
                <li><a href="#" className="hover:text-white">Cost Calculator</a></li>
                <li><a href="#" className="hover:text-white">Relocation Guides</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Research Methodology</a></li>
                <li><a href="#" className="hover:text-white">Data Sources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@relocateright.app</li>
                <li>Feedback</li>
                <li>Report Issues</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2023 RelocateRight. Final Year Project.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComparisonDashboard;
