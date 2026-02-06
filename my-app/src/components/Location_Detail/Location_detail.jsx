'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaStar, FaHome, FaBriefcase, FaGraduationCap, FaHeartbeat, FaSubway, FaChartBar, FaDollarSign, FaMapMarkerAlt, FaUserFriends, FaComments } from 'react-icons/fa';
import Link from 'next/link';
import { getLocationById, getReviews, submitReview } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const LocationDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review form state
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const { user } = useAuth();

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchLocationData = async () => {
      const locationId = searchParams.get('id');
      if (locationId) {
        setLoading(true);
        try {
          const data = await getLocationById(locationId);
          console.log("Fetched location:", data) // Debug
          if (data) {
            setLocationData(data);
            const locationReviews = await getReviews(locationId);
            setReviews(locationReviews);
          }
        } catch (error) {
          console.error("Failed to load location", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [searchParams]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!locationData) {
    return <div className="min-h-screen flex items-center justify-center">Location not found</div>;
  }

  // TRANSFORM DB DATA TO UI FORMAT
  // This adapter layer ensures the rest of the component works with minimal changes
  const staticData = {
    population: "2.2 million (metro)",
    avgTemp: "68°F",
    ratings: {
      ...locationData.ratings,
      safety: 8.3,
      culture: 9.4
    },
    costBreakdown: {
      housing: 2300,
      utilities: 150,
      groceries: 400,
      transportation: 250,
      healthcare: 300,
      taxes: 1200
    },
    jobMarket: {
      unemployment: "3.2%",
      topIndustries: ["Technology", "Education", "Government", "Healthcare", "Creative Arts"],
      avgSalary: "$85,000",
      majorEmployers: ["Dell", "Apple", "Google", "Facebook (Meta)", "IBM", "University of Texas at Austin"]
    },
    education: {
      schools: 227,
      universities: 5,
      topSchools: ["University of Texas at Austin", "Austin Community College", "St. Edward's University"],
      rating: "A-",
      studentTeacherRatio: "15:1",
      graduationRate: "88%"
    },
    healthcare: {
      hospitals: 12,
      specialties: ["Cardiology", "Oncology", "Pediatrics", "Trauma Care"],
      insurance: "82% covered",
      avgDoctorRating: "4.5/5",
      majorHospitals: ["Ascension Seton Medical Center Austin", "St. David's Medical Center", "Dell Children's Medical Center"]
    },
    transportation: {
      publicTransit: "Capital Metro (buses, rail)",
      commuteTime: "26 mins avg",
      bikeScore: 70,
      walkScore: 45,
      carDependence: "High",
      majorHighways: ["I-35", "US-183", "Loop 1 (Mopac)"]
    },
    reviews: [
      { name: "Sarah K.", date: "2 weeks ago", rating: 5, comment: "Moved here 3 years ago and absolutely love it! The job market is amazing for tech professionals, and the food scene is incredible." },
      { name: "Michael T.", date: "1 month ago", rating: 4, comment: "Great city with lots to do, but traffic is getting worse every year. Housing prices have skyrocketed since we moved here in 2015." },
      { name: "Jennifer L.", date: "2 months ago", rating: 5, comment: "The best decision we made was moving to Austin. The community is welcoming, and there's always something fun happening. Highly recommend!" },
      { name: "David R.", date: "3 months ago", rating: 3, comment: "Austin is cool, but the cost of living is definitely a challenge. Public transport could be better, but the music scene makes up for it!" },
    ]
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= Math.round(rating / 2) ? 'text-yellow-400' : 'text-gray-300'}
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

  // Toggle section expansion
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
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
              <a href="/comparecities" className="text-gray-700 hover:text-indigo-600">Compare</a>
              <a href="#" className="text-indigo-600 font-medium">Locations</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Resources</a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {locationData.name}
              </h1>
              <p className="text-xl text-indigo-100 mb-6">
                {locationData.description}
              </p>
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm mr-3">
                  {locationData.overall_score?.toFixed(1)} Overall
                </div>
                <div className="text-white flex items-center">
                  {renderStars(locationData.overall_score)}
                  <span className="ml-2">Excellent for relocation</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 text-black flex items-center ">
                  <FaMapMarkerAlt className="mr-2" />
                  {staticData.state}, {staticData.country}
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 text-black flex items-center">
                  <FaUserFriends className="mr-2" />
                  {staticData.population}
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 text-black flex items-center">
                  <FaDollarSign className="mr-2" />
                  Cost of Living: {locationData.cost_of_living_score > 7.5 ? "High" : locationData.cost_of_living_score > 6 ? "Moderate" : "Affordable"}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              {/* Placeholder for an image */}
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-80 flex items-center justify-center text-gray-500">
                Image Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {['overview', 'cost', 'jobs', 'education', 'health', 'transport', 'reviews'].map((tab) => (
              <button
                key={tab}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Section */}
        <div className={`${activeTab === 'overview' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Statistics</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {Object.entries(staticData.ratings).map(([key, value]) => (
                  <div key={key} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="flex items-end">
                      <span className="text-2xl font-bold text-gray-900">{value.toFixed(1)}</span>
                      <span className="text-gray-400 ml-1 text-sm">/10</span>
                    </div>
                    <div className="mt-2">{renderMetricBar(value)}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About {locationData.name}</h3>
                <p className="text-gray-700 mb-4">
                  {locationData.description}
                </p>
                <p className="text-gray-700">
                  The city is known for its vibrant live music scene, with hundreds of live music venues and major music festivals like South by Southwest (SXSW) and Austin City Limits Music Festival. Austin is also known as a center for technology and business, with companies like Dell, Tesla, and Apple having major operations in the area.
                </p>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pros & Cons</h3>
                <div className="mb-6">
                  <h4 className="font-medium text-green-600 mb-2">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2 text-sm text-gray-700">Strong job market with many tech opportunities</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2 text-sm text-gray-700">Vibrant cultural and music scene</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2 text-sm text-gray-700">Good weather with mild winters</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2 text-sm text-gray-700">No state income tax</p>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-2">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-red-500">✗</div>
                      <p className="ml-2 text-sm text-gray-700">Rising cost of living and housing prices</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-red-500">✗</div>
                      <p className="ml-2 text-sm text-gray-700">Traffic congestion during peak hours</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-red-500">✗</div>
                      <p className="ml-2 text-sm text-gray-700">Hot summers with temperatures over 100°F</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-red-500">✗</div>
                      <p className="ml-2 text-sm text-gray-700">Limited public transportation options</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <FaHome className="text-indigo-600 mr-3" />
                    <span>Median Home Price: <span className="font-medium">$550,000</span></span>
                  </li>
                  <li className="flex items-center">
                    <FaDollarSign className="text-indigo-600 mr-3" />
                    <span>Avg Rent (1BR): <span className="font-medium">$1,700/month</span></span>
                  </li>
                  <li className="flex items-center">
                    <FaBriefcase className="text-indigo-600 mr-3" />
                    <span>Unemployment Rate: <span className="font-medium">{staticData.jobMarket.unemployment}</span></span>
                  </li>
                  <li className="flex items-center">
                    <FaGraduationCap className="text-indigo-600 mr-3" />
                    <span>Top University: <span className="font-medium">{staticData.education.topSchools[0]}</span></span>
                  </li>
                  <li className="flex items-center">
                    <FaHeartbeat className="text-indigo-600 mr-3" />
                    <span>Healthcare Rating: <span className="font-medium">{locationData.healthcare_score?.toFixed(1)}/10</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Neighborhood Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Downtown", type: "Urban", price: "$$", vibe: "Vibrant, walkable, nightlife" },
                { name: "East Austin", type: "Trendy", price: "$$", vibe: "Artsy, diverse, food scene" },
                { name: "Westlake", type: "Suburban", price: "$$$", vibe: "Affluent, family-friendly" },
                { name: "South Congress", type: "Eclectic", price: "$$", vibe: "Bohemian, shopping, dining" },
              ].map((area, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="font-medium text-gray-900">{area.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{area.type} • {area.price}</div>
                  <p className="text-sm text-gray-700">{area.vibe}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost of Living Section */}
        <div className={`${activeTab === 'cost' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost of Living Breakdown</h2>

              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expenses for a Family of 4 (Estimated)</h3>
                <div className="space-y-4">
                  {Object.entries(staticData.costBreakdown).map(([category, amount]) => (
                    <div key={category}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize">{category.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-medium">${amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{ width: `${(amount / Object.values(staticData.costBreakdown).reduce((a, b) => a + b, 0)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
                    <span>Total Monthly Cost</span>
                    <span>${Object.values(staticData.costBreakdown).reduce((a, b) => a + b, 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{locationData.name}</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">US Average</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { item: "Meal for 2 (Mid-range)", austin: 65, average: 60, diff: "+8.3%" },
                        { item: "1BR Apartment Rent (City Center)", austin: 1700, average: 1500, diff: "+13.3%" },
                        { item: "Utilities (Monthly)", austin: 150, average: 160, diff: "-6.3%" },
                        { item: "Gasoline (1 gallon)", austin: 3.25, average: 3.50, diff: "-7.1%" },
                        { item: "Internet (Monthly)", austin: 65, average: 60, diff: "+8.3%" },
                      ].map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.item}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${row.austin.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${row.average.toLocaleString()}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${row.diff.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                            {row.diff}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost of Living Index</h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-48 h-48 bg-indigo-50 rounded-full flex items-center justify-center">
                    <div className="absolute text-3xl font-bold text-indigo-700">{locationData.cost_of_living_score?.toFixed(1)}</div>
                    <div className="absolute bottom-4 text-gray-600 text-sm">out of 10</div>
                  </div>
                </div>
                <p className="text-gray-700 text-center">
                  {locationData.name}'s cost of living is approximately 3% higher than the national average but generally more affordable than major coastal tech hubs.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Housing Market</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Median Home Price</span>
                      <span className="font-medium">$550,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Price per sq. ft.</span>
                      <span className="font-medium">$325</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Yearly Price Change</span>
                      <span className="font-medium text-red-600">+8.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Median Rent (All Units)</span>
                      <span className="font-medium">$1,850</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Market Section */}
        <div className={`${activeTab === 'jobs' ? 'block' : 'hidden'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Market & Economy</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Employment Statistics</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaChartBar className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Unemployment Rate:</div>
                    <div className="text-gray-700 text-lg">{staticData.jobMarket.unemployment} (Below National Average)</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <FaDollarSign className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Average Annual Salary:</div>
                    <div className="text-gray-700 text-lg">{staticData.jobMarket.avgSalary}</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <FaBriefcase className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Job Growth (Last 5 Years):</div>
                    <div className="text-gray-700 text-lg">~15% (Strong Growth)</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Industries</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {staticData.jobMarket.topIndustries.map((industry, index) => (
                  <li key={index}>{industry}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Major Employers</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {staticData.jobMarket.majorEmployers.map((employer, index) => (
                  <li key={index}>{employer}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Prospects Rating</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-48 h-48 bg-indigo-50 rounded-full flex items-center justify-center">
                <div className="absolute text-3xl font-bold text-indigo-700">{locationData.job_prospects_score?.toFixed(1)}</div>
                <div className="absolute bottom-4 text-gray-600 text-sm">out of 10</div>
              </div>
            </div>
            <p className="text-gray-700 text-center">
              {locationData.name} consistently ranks as one of the best cities for job seekers, especially in the technology and startup sectors.
            </p>
          </div>
        </div>

        {/* Education Section */}
        <div className={`${activeTab === 'education' ? 'block' : 'hidden'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Education System</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Education Statistics</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaGraduationCap className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Total Public Schools:</div>
                    <div className="text-gray-700 text-lg">{staticData.education.schools}</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <FaGraduationCap className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Number of Universities:</div>
                    <div className="text-gray-700 text-lg">{staticData.education.universities}</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <FaUserFriends className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Student-Teacher Ratio:</div>
                    <div className="text-gray-700 text-lg">{staticData.education.studentTeacherRatio}</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <FaChartBar className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">High School Graduation Rate:</div>
                    <div className="text-gray-700 text-lg">{staticData.education.graduationRate}</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Educational Institutions</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {staticData.education.topSchools.map((school, index) => (
                  <li key={index}>{school}</li>
                ))}
              </ul>
              <p className="text-gray-700 mt-4">
                The University of Texas at Austin is a major public research university and a flagship institution of the University of Texas System.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Education Rating</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-48 h-48 bg-indigo-50 rounded-full flex items-center justify-center">
                <div className="absolute text-3xl font-bold text-indigo-700">{locationData.education_score?.toFixed(1)}</div>
                <div className="absolute bottom-4 text-gray-600 text-sm">out of 10</div>
              </div>
            </div>
            <p className="text-gray-700 text-center">
              {locationData.name} offers a highly-rated education system with excellent public and private school options, along with world-class universities.
            </p>
          </div>
        </div>

        {/* Healthcare Section */}
        <div className={`${activeTab === 'health' ? 'block' : 'hidden'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Healthcare System</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Healthcare Statistics</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaHeartbeat className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Number of Hospitals:</div>
                    <div className="text-gray-700 text-lg">{staticData.healthcare.hospitals}</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <FaDollarSign className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Population with Health Insurance:</div>
                    <div className="text-gray-700 text-lg">{staticData.healthcare.insurance}</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <FaStar className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Average Doctor Rating:</div>
                    <div className="text-gray-700 text-lg">{staticData.healthcare.avgDoctorRating}</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Major Hospitals & Specialties</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {staticData.healthcare.majorHospitals.map((hospital, index) => (
                  <li key={index}>{hospital}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Key Medical Specialties</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {staticData.healthcare.specialties.map((specialty, index) => (
                  <li key={index}>{specialty}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Healthcare Rating</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-48 h-48 bg-indigo-50 rounded-full flex items-center justify-center">
                <div className="absolute text-3xl font-bold text-indigo-700">{locationData.healthcare_score?.toFixed(1)}</div>
                <div className="absolute bottom-4 text-gray-600 text-sm">out of 10</div>
              </div>
            </div>
            <p className="text-gray-700 text-center">
              {locationData.name} provides comprehensive healthcare services with a good number of hospitals and specialized medical facilities.
            </p>
          </div>
        </div>

        {/* Transportation Section */}
        <div className={`${activeTab === 'transport' ? 'block' : 'hidden'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transportation & Infrastructure</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Transportation Metrics</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaSubway className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Public Transit Provider:</div>
                    <div className="text-gray-700 text-lg">{staticData.transportation.publicTransit}</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <FaHome className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Average Commute Time:</div>
                    <div className="text-gray-700 text-lg">{staticData.transportation.commuteTime}</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <FaComments className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Bike Score:</div>
                    <div className="text-gray-700 text-lg">{staticData.transportation.bikeScore}/100</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <FaUserFriends className="text-indigo-600 mr-3 text-xl" />
                  <div>
                    <div className="font-medium">Walk Score:</div>
                    <div className="text-gray-700 text-lg">{staticData.transportation.walkScore}/100</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Transportation Overview</h3>
              <p className="text-gray-700 mb-4">
                While {locationData.name} has public transportation options like Capital Metro buses and a limited rail line, the city is still largely car-dependent. Traffic congestion, especially on major highways, can be significant during peak hours.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Major Roadways</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {staticData.transportation.majorHighways.map((highway, index) => (
                  <li key={index}>{highway}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure Rating</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-48 h-48 bg-indigo-50 rounded-full flex items-center justify-center">
                <div className="absolute text-3xl font-bold text-indigo-700">{locationData.infrastructure_score?.toFixed(1)}</div>
                <div className="absolute bottom-4 text-gray-600 text-sm">out of 10</div>
              </div>
            </div>
            <p className="text-gray-700 text-center">
              {locationData.name}'s infrastructure is continually developing to keep pace with its rapid growth, though traffic remains a key challenge.
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className={`${activeTab === 'reviews' ? 'block' : 'hidden'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resident Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Satisfaction</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="text-5xl font-bold text-indigo-700 mr-4">{(locationData.overall_score * 0.5).toFixed(1)}</div> {/* Convert 10-scale to 5-scale for display */}
                <div>
                  <div className="flex">{renderStars(locationData.overall_score)}</div>
                  <div className="text-gray-600 text-sm mt-1">Based on {staticData.reviews.length} reviews</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { category: "Quality of Life", rating: (locationData.culture_score * 0.5 + locationData.safety_score * 0.5) }, // Example combination
                  { category: "Job Opportunities", rating: locationData.job_prospects_score * 0.5 },
                  { category: "Cost of Living", rating: locationData.cost_of_living_score * 0.5 },
                  { category: "Safety", rating: locationData.safety_score * 0.5 },
                  { category: "Community", rating: (locationData.culture_score + locationData.safety_score) / 2 * 0.5 }, // Another example
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.category}</span>
                      <span>{item.rating.toFixed(1)}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${(item.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h3>
              <div className="space-y-6">
                {staticData.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.name}</div>
                      <div className="text-gray-500 text-sm">{review.date}</div>
                    </div>
                    <div className="flex mb-2">{renderStars(review.rating * 2)}</div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Your Review</h3>
            {!user ? (
              <div className="text-center py-4">
                <p className="mb-2">Please log in to leave a review.</p>
                <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">Log In / Sign Up</Link>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await submitReview({
                    locationId: locationData.id,
                    rating: newReview.rating,
                    comment: newReview.comment
                  });
                  setNewReview({ rating: 5, comment: '' });
                  // Refresh reviews
                  const updatedReviews = await getReviews(locationData.id);
                  setReviews(updatedReviews);
                  alert('Review submitted!');
                } catch (err) {
                  alert(err.message);
                }
              }}>
                <div>
                  <label htmlFor="review-rating" className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className={`text-2xl focus:outline-none ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                  <textarea
                    id="review-comment"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Share your experience living in this area..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Action Section */}
        <div className="mt-12 bg-indigo-700 text-white rounded-xl p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make the Move?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Get personalized relocation assistance and detailed neighborhood reports
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-lg text-lg hover:bg-indigo-100 transition">
                Download Relocation Guide
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-white hover:bg-opacity-10 transition">
                Compare with Other Cities
              </button>
            </div>
          </div>
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

export default LocationDetailPage;