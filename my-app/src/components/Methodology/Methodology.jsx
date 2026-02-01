'use client';
import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Shield, DollarSign, Users, Briefcase, Cloud, TrendingUp, Database, CheckCircle, GitBranch, Activity } from 'lucide-react';

const MethodologyPage = () => {
  const [activeSection, setActiveSection] = useState('data-collection');

  // Data for weight distribution
  const weightData = [
    { name: 'Safety', value: 25, color: '#3b82f6' },
    { name: 'Affordability', value: 25, color: '#10b981' },
    { name: 'Employment', value: 20, color: '#f59e0b' },
    { name: 'Demographics', value: 15, color: '#8b5cf6' },
    { name: 'Climate', value: 15, color: '#ec4899' }
  ];

  // Data sources credibility
  const dataSources = [
    { name: 'FBI Crime Database', credibility: 95, icon: Shield, category: 'Safety' },
    { name: 'Bureau of Labor Statistics', credibility: 98, icon: Briefcase, category: 'Employment' },
    { name: 'Census Bureau', credibility: 99, icon: Users, category: 'Demographics' },
    { name: 'Zillow/Redfin APIs', credibility: 90, icon: DollarSign, category: 'Affordability' },
    { name: 'NOAA Climate Data', credibility: 97, icon: Cloud, category: 'Climate' }
  ];

  // Normalization example data
  const normalizationExample = [
    { city: 'City A', raw: 450000, normalized: 0.75 },
    { city: 'City B', raw: 300000, normalized: 0.45 },
    { city: 'City C', raw: 600000, normalized: 1.0 },
    { city: 'City D', raw: 200000, normalized: 0.0 }
  ];

  const sections = [
    { id: 'data-collection', label: 'Data Collection', icon: Database },
    { id: 'scoring', label: 'Scoring Algorithm', icon: Activity },
    { id: 'normalization', label: 'Normalization', icon: TrendingUp },
    { id: 'metrics', label: 'Metric Definitions', icon: CheckCircle },
    { id: 'verification', label: 'Data Verification', icon: GitBranch }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-slate-900">Methodology Documentation</h1>
          <p className="mt-2 text-lg text-slate-600">Understanding the Data Science Behind Our Relocation Tool</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-24 space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Data Collection Section */}
            {activeSection === 'data-collection' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Data Collection Methods</h2>
                  
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-700 leading-relaxed">
                      Our relocation tool aggregates data from multiple authoritative sources to provide comprehensive 
                      city comparisons. The data collection process follows a structured pipeline that ensures accuracy, 
                      timeliness, and reliability.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Collection Pipeline</h3>
                    
                    <div className="bg-slate-50 rounded-lg p-6 my-6 border-l-4 border-blue-600">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                          <div>
                            <h4 className="font-semibold text-slate-900">API Integration</h4>
                            <p className="text-slate-600">Automated daily pulls from government and commercial APIs</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                          <div>
                            <h4 className="font-semibold text-slate-900">Data Validation</h4>
                            <p className="text-slate-600">Schema validation and outlier detection algorithms</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                          <div>
                            <h4 className="font-semibold text-slate-900">Transformation</h4>
                            <p className="text-slate-600">Normalization and standardization across data sources</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                          <div>
                            <h4 className="font-semibold text-slate-900">Storage</h4>
                            <p className="text-slate-600">Time-series database with version control</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Data Source Credibility</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                      {dataSources.map((source, idx) => {
                        const Icon = source.icon;
                        return (
                          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3">
                              <Icon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900">{source.name}</h4>
                                <p className="text-sm text-slate-600">{source.category}</p>
                                <div className="mt-2">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                                      <div 
                                        className="bg-green-600 h-2 rounded-full" 
                                        style={{ width: `${source.credibility}%` }}
                                      />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">{source.credibility}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Update Frequency</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-200 my-6">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Data Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Update Frequency</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Last Updated</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          <tr><td className="px-6 py-4 text-sm text-slate-900">Crime Statistics</td><td className="px-6 py-4 text-sm text-slate-600">Monthly</td><td className="px-6 py-4 text-sm text-slate-600">Jan 2026</td></tr>
                          <tr><td className="px-6 py-4 text-sm text-slate-900">Housing Prices</td><td className="px-6 py-4 text-sm text-slate-600">Weekly</td><td className="px-6 py-4 text-sm text-slate-600">Jan 2026</td></tr>
                          <tr><td className="px-6 py-4 text-sm text-slate-900">Employment Data</td><td className="px-6 py-4 text-sm text-slate-600">Monthly</td><td className="px-6 py-4 text-sm text-slate-600">Dec 2025</td></tr>
                          <tr><td className="px-6 py-4 text-sm text-slate-900">Demographics</td><td className="px-6 py-4 text-sm text-slate-600">Annually</td><td className="px-6 py-4 text-sm text-slate-600">2025</td></tr>
                          <tr><td className="px-6 py-4 text-sm text-slate-900">Climate Data</td><td className="px-6 py-4 text-sm text-slate-600">Daily</td><td className="px-6 py-4 text-sm text-slate-600">Feb 2026</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scoring Algorithm Section */}
            {activeSection === 'scoring' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Scoring Algorithm Explanation</h2>
                  
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-700 leading-relaxed">
                      The scoring algorithm combines multiple normalized metrics using a weighted sum approach. 
                      Each city receives a composite score between 0 and 100, representing its overall suitability 
                      based on user preferences.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Weighted Sum Formula</h3>
                    
                    <div className="bg-slate-900 rounded-lg p-6 my-6 overflow-x-auto">
                      <code className="text-green-400 font-mono text-lg block">
                        <div className="mb-4">S<sub className="text-blue-400">city</sub> = Σ(w<sub className="text-blue-400">i</sub> × n<sub className="text-blue-400">i</sub>)</div>
                        <div className="text-sm text-slate-400 ml-8">where:</div>
                        <div className="text-sm text-slate-300 ml-12">S = Final composite score</div>
                        <div className="text-sm text-slate-300 ml-12">w<sub className="text-blue-400">i</sub> = Weight for metric i</div>
                        <div className="text-sm text-slate-300 ml-12">n<sub className="text-blue-400">i</sub> = Normalized value for metric i</div>
                        <div className="text-sm text-slate-300 ml-12">Σw<sub className="text-blue-400">i</sub> = 1.0 (weights sum to 100%)</div>
                      </code>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Default Weight Distribution</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
                      <div>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={weightData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value }) => `${name}: ${value}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {weightData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-col justify-center space-y-3">
                        {weightData.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                            <span className="text-slate-700 font-medium">{item.name}</span>
                            <span className="ml-auto text-slate-600 font-semibold">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Calculation Example</h3>
                    
                    <div className="bg-blue-50 rounded-lg p-6 my-6 border border-blue-200">
                      <h4 className="font-semibold text-slate-900 mb-4">City X Composite Score Calculation</h4>
                      <div className="space-y-2 text-sm font-mono">
                        <div className="flex justify-between"><span>Safety (normalized): 0.85 × 0.25 =</span><span className="font-bold">0.2125</span></div>
                        <div className="flex justify-between"><span>Affordability (normalized): 0.70 × 0.25 =</span><span className="font-bold">0.1750</span></div>
                        <div className="flex justify-between"><span>Employment (normalized): 0.92 × 0.20 =</span><span className="font-bold">0.1840</span></div>
                        <div className="flex justify-between"><span>Demographics (normalized): 0.78 × 0.15 =</span><span className="font-bold">0.1170</span></div>
                        <div className="flex justify-between"><span>Climate (normalized): 0.65 × 0.15 =</span><span className="font-bold">0.0975</span></div>
                        <div className="border-t-2 border-blue-300 mt-2 pt-2 flex justify-between font-bold text-base">
                          <span>Final Score (× 100):</span><span className="text-blue-700">78.6 / 100</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Commute Decay Function</h3>
                    
                    <p className="text-slate-700 leading-relaxed">
                      For users who specify a workplace location, we apply an exponential decay function to adjust 
                      neighborhood scores based on commute distance:
                    </p>

                    <div className="bg-slate-900 rounded-lg p-6 my-6 overflow-x-auto">
                      <code className="text-green-400 font-mono text-lg block">
                        <div className="mb-4">S<sub className="text-blue-400">adjusted</sub> = S<sub className="text-blue-400">base</sub> × e<sup className="text-yellow-400">(-λd)</sup></div>
                        <div className="text-sm text-slate-400 ml-8">where:</div>
                        <div className="text-sm text-slate-300 ml-12">S<sub className="text-blue-400">adjusted</sub> = Adjusted score with commute penalty</div>
                        <div className="text-sm text-slate-300 ml-12">S<sub className="text-blue-400">base</sub> = Base neighborhood score</div>
                        <div className="text-sm text-slate-300 ml-12">λ = Decay constant (default: 0.05)</div>
                        <div className="text-sm text-slate-300 ml-12">d = Commute distance in miles</div>
                      </code>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> The decay constant λ can be adjusted based on user preferences. 
                        A higher λ value creates a steeper penalty for longer commutes.
                      </p>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Algorithm Pseudocode</h3>
                    
                    <div className="bg-slate-900 rounded-lg p-6 my-6 overflow-x-auto">
                      <pre className="text-green-400 font-mono text-sm">
{`function calculateCityScore(city, userWeights, workplaceCoords) {
  // Step 1: Normalize all metrics
  normalizedMetrics = {
    safety: minMaxNormalize(city.crimeRate, allCities),
    affordability: minMaxNormalize(city.housingCost, allCities),
    employment: minMaxNormalize(city.jobGrowth, allCities),
    demographics: minMaxNormalize(city.diversity, allCities),
    climate: minMaxNormalize(city.weatherScore, allCities)
  };
  
  // Step 2: Apply user weights
  weightedScore = 0;
  for (metric in normalizedMetrics) {
    weightedScore += normalizedMetrics[metric] * userWeights[metric];
  }
  
  // Step 3: Apply commute decay if workplace specified
  if (workplaceCoords) {
    distance = calculateDistance(city.coords, workplaceCoords);
    commuteMultiplier = Math.exp(-0.05 * distance);
    weightedScore *= commuteMultiplier;
  }
  
  // Step 4: Convert to 0-100 scale
  return weightedScore * 100;
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Normalization Section */}
            {activeSection === 'normalization' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Normalization Process</h2>
                  
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-700 leading-relaxed">
                      To ensure fair comparison across different metrics with varying scales and units, we apply 
                      min-max normalization to transform all values to a common 0-1 scale.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Min-Max Normalization Formula</h3>
                    
                    <div className="bg-slate-900 rounded-lg p-6 my-6 overflow-x-auto">
                      <code className="text-green-400 font-mono text-lg block">
                        <div className="mb-4">n<sub className="text-blue-400">i</sub> = (x<sub className="text-blue-400">i</sub> - min(X)) / (max(X) - min(X))</div>
                        <div className="text-sm text-slate-400 ml-8">where:</div>
                        <div className="text-sm text-slate-300 ml-12">n<sub className="text-blue-400">i</sub> = Normalized value (0 to 1)</div>
                        <div className="text-sm text-slate-300 ml-12">x<sub className="text-blue-400">i</sub> = Original value for city i</div>
                        <div className="text-sm text-slate-300 ml-12">min(X) = Minimum value across all cities</div>
                        <div className="text-sm text-slate-300 ml-12">max(X) = Maximum value across all cities</div>
                      </code>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Inversion for Cost Metrics</h3>
                    
                    <p className="text-slate-700 leading-relaxed">
                      For metrics where lower values are better (e.g., crime rate, cost of living), we invert 
                      the normalization to maintain consistent directionality:
                    </p>

                    <div className="bg-slate-900 rounded-lg p-6 my-6 overflow-x-auto">
                      <code className="text-green-400 font-mono text-lg block">
                        <div className="mb-4">n<sub className="text-blue-400">i</sub> = 1 - [(x<sub className="text-blue-400">i</sub> - min(X)) / (max(X) - min(X))]</div>
                        <div className="text-sm text-slate-400 ml-8">Result: Lower original values → Higher normalized scores</div>
                      </code>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Practical Example: Housing Costs</h3>
                    
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">City</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Raw Price ($)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Calculation</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Normalized (Inverted)</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">City A</td>
                            <td className="px-6 py-4 text-sm text-slate-600">$450,000</td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-mono">1 - (250k/400k)</td>
                            <td className="px-6 py-4 text-sm font-semibold text-blue-600">0.375</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">City B</td>
                            <td className="px-6 py-4 text-sm text-slate-600">$300,000</td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-mono">1 - (100k/400k)</td>
                            <td className="px-6 py-4 text-sm font-semibold text-blue-600">0.750</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">City C</td>
                            <td className="px-6 py-4 text-sm text-slate-600">$600,000</td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-mono">1 - (400k/400k)</td>
                            <td className="px-6 py-4 text-sm font-semibold text-blue-600">0.000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">City D</td>
                            <td className="px-6 py-4 text-sm text-slate-600">$200,000</td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-mono">1 - (0/400k)</td>
                            <td className="px-6 py-4 text-sm font-semibold text-blue-600">1.000</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-sm text-slate-500 mt-2 italic">
                        Range: $200,000 (min) to $600,000 (max) | Spread: $400,000
                      </p>
                    </div>

                    <div className="my-6">
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={normalizationExample}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="city" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="normalized" fill="#3b82f6" name="Normalized Score" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Outlier Handling</h3>
                    
                    <p className="text-slate-700 leading-relaxed">
                      Before normalization, we identify and handle outliers using the Interquartile Range (IQR) method 
                      to prevent extreme values from skewing the distribution:
                    </p>

                    <div className="bg-slate-900 rounded-lg p-6 my-6 overflow-x-auto">
                      <pre className="text-green-400 font-mono text-sm">
{`function removeOutliers(data) {
  // Calculate quartiles
  Q1 = percentile(data, 25);
  Q3 = percentile(data, 75);
  IQR = Q3 - Q1;
  
  // Define outlier bounds
  lowerBound = Q1 - 1.5 * IQR;
  upperBound = Q3 + 1.5 * IQR;
  
  // Cap outliers at bounds instead of removing
  return data.map(x => {
    if (x < lowerBound) return lowerBound;
    if (x > upperBound) return upperBound;
    return x;
  });
}`}
                      </pre>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                      <p className="text-sm text-green-800">
                        <strong>Robustness:</strong> By capping rather than removing outliers, we preserve all cities 
                        in the dataset while preventing extreme values from dominating the normalized scores.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Metrics Definition Section */}
            {activeSection === 'metrics' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Metric Definitions</h2>
                  
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-700 leading-relaxed mb-8">
                      Each metric is calculated using multiple sub-indicators to provide a comprehensive assessment. 
                      Below are detailed definitions and calculation methods for each primary metric.
                    </p>

                    {/* Safety Metric */}
                    <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
                      <div className="flex items-start gap-4">
                        <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold text-slate-900 mt-0 mb-3">Safety Score</h3>
                          <p className="text-slate-700 mb-4">
                            Composite measure of public safety based on crime statistics, police presence, and emergency response times.
                          </p>
                          
                          <h4 className="font-semibold text-slate-900 mb-2">Sub-Indicators:</h4>
                          <ul className="space-y-2 mb-4">
                            <li className="text-slate-700"><strong>Violent Crime Rate</strong> (40%): Incidents per 100,000 residents (murder, assault, robbery, rape)</li>
                            <li className="text-slate-700"><strong>Property Crime Rate</strong> (30%): Incidents per 100,000 residents (burglary, theft, vehicle theft)</li>
                            <li className="text-slate-700"><strong>Police-to-Population Ratio</strong> (20%): Officers per 1,000 residents</li>
                            <li className="text-slate-700"><strong>Emergency Response Time</strong> (10%): Average minutes to scene</li>
                          </ul>

                          <div className="bg-white rounded p-4 border border-blue-200">
                            <code className="text-sm font-mono text-slate-800">
                              Safety = 0.4×(1 - normalize(violentCrime)) + 0.3×(1 - normalize(propertyCrime)) + 0.2×normalize(policeRatio) + 0.1×(1 - normalize(responseTime))
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Affordability Metric */}
                    <div className="bg-green-50 rounded-lg p-6 mb-6 border-l-4 border-green-600">
                      <div className="flex items-start gap-4">
                        <DollarSign className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold text-slate-900 mt-0 mb-3">Affordability Score</h3>
                          <p className="text-slate-700 mb-4">
                            Comprehensive cost-of-living assessment including housing, taxes, utilities, and general expenses.
                          </p>
                          
                          <h4 className="font-semibold text-slate-900 mb-2">Sub-Indicators:</h4>
                          <ul className="space-y-2 mb-4">
                            <li className="text-slate-700"><strong>Median Home Price</strong> (35%): Median sale price of single-family homes</li>
                            <li className="text-slate-700"><strong>Rent-to-Income Ratio</strong> (25%): Average rent as % of median household income</li>
                            <li className="text-slate-700"><strong>Tax Burden</strong> (20%): Combined state/local tax rate</li>
                            <li className="text-slate-700"><strong>Cost of Living Index</strong> (20%): Composite of groceries, utilities, transportation</li>
                          </ul>

                          <div className="bg-white rounded p-4 border border-green-200">
                            <code className="text-sm font-mono text-slate-800">
                              Affordability = 0.35×(1 - normalize(homePrice)) + 0.25×(1 - normalize(rentRatio)) + 0.2×(1 - normalize(taxBurden)) + 0.2×(1 - normalize(colIndex))
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Employment Metric */}
                    <div className="bg-amber-50 rounded-lg p-6 mb-6 border-l-4 border-amber-600">
                      <div className="flex items-start gap-4">
                        <Briefcase className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold text-slate-900 mt-0 mb-3">Employment Score</h3>
                          <p className="text-slate-700 mb-4">
                            Labor market strength and economic opportunity based on job availability, growth, and compensation.
                          </p>
                          
                          <h4 className="font-semibold text-slate-900 mb-2">Sub-Indicators:</h4>
                          <ul className="space-y-2 mb-4">
                            <li className="text-slate-700"><strong>Unemployment Rate</strong> (30%): Inverted percentage of workforce unemployed</li>
                            <li className="text-slate-700"><strong>Job Growth Rate</strong> (30%): YoY percentage change in total employment</li>
                            <li className="text-slate-700"><strong>Median Household Income</strong> (25%): Adjusted for local cost of living</li>
                            <li className="text-slate-700"><strong>Industry Diversity</strong> (15%): Shannon entropy of employment distribution</li>
                          </ul>

                          <div className="bg-white rounded p-4 border border-amber-200">
                            <code className="text-sm font-mono text-slate-800">
                              Employment = 0.3×(1 - normalize(unemployment)) + 0.3×normalize(jobGrowth) + 0.25×normalize(income) + 0.15×normalize(diversity)
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Demographics Metric */}
                    <div className="bg-purple-50 rounded-lg p-6 mb-6 border-l-4 border-purple-600">
                      <div className="flex items-start gap-4">
                        <Users className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold text-slate-900 mt-0 mb-3">Demographics Score</h3>
                          <p className="text-slate-700 mb-4">
                            Population characteristics including age distribution, diversity, education, and cultural amenities.
                          </p>
                          
                          <h4 className="font-semibold text-slate-900 mb-2">Sub-Indicators:</h4>
                          <ul className="space-y-2 mb-4">
                            <li className="text-slate-700"><strong>Diversity Index</strong> (30%): Simpson's diversity index across race/ethnicity</li>
                            <li className="text-slate-700"><strong>Education Level</strong> (30%): % of population with bachelor's degree or higher</li>
                            <li className="text-slate-700"><strong>Age Match Score</strong> (25%): Alignment with user's preferred age demographic</li>
                            <li className="text-slate-700"><strong>Cultural Amenities</strong> (15%): Museums, theaters, restaurants per capita</li>
                          </ul>

                          <div className="bg-white rounded p-4 border border-purple-200">
                            <code className="text-sm font-mono text-slate-800">
                              Demographics = 0.3×normalize(diversityIndex) + 0.3×normalize(education) + 0.25×ageMatchScore + 0.15×normalize(amenities)
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Climate Metric */}
                    <div className="bg-pink-50 rounded-lg p-6 mb-6 border-l-4 border-pink-600">
                      <div className="flex items-start gap-4">
                        <Cloud className="w-8 h-8 text-pink-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold text-slate-900 mt-0 mb-3">Climate Score</h3>
                          <p className="text-slate-700 mb-4">
                            Weather patterns, natural disaster risk, and seasonal variation based on 30-year climate data.
                          </p>
                          
                          <h4 className="font-semibold text-slate-900 mb-2">Sub-Indicators:</h4>
                          <ul className="space-y-2 mb-4">
                            <li className="text-slate-700"><strong>Temperature Comfort</strong> (35%): Days per year within 60-80°F range</li>
                            <li className="text-slate-700"><strong>Precipitation Level</strong> (25%): Annual rainfall/snowfall vs. preference</li>
                            <li className="text-slate-700"><strong>Natural Disaster Risk</strong> (25%): FEMA risk index for floods, hurricanes, earthquakes</li>
                            <li className="text-slate-700"><strong>Air Quality</strong> (15%): Average AQI over past year</li>
                          </ul>

                          <div className="bg-white rounded p-4 border border-pink-200">
                            <code className="text-sm font-mono text-slate-800">
                              Climate = 0.35×normalize(comfortDays) + 0.25×precipitationMatch + 0.25×(1 - normalize(disasterRisk)) + 0.15×(1 - normalize(aqi))
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Section */}
            {activeSection === 'verification' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Data Verification Process</h2>
                  
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-700 leading-relaxed">
                      We implement a multi-stage verification process to ensure data accuracy, consistency, and reliability 
                      before it's used in our scoring algorithms.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Verification Pipeline</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</div>
                          <h4 className="font-semibold text-slate-900 text-lg">Schema Validation</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>• Type checking (integers, floats, strings)</li>
                          <li>• Required field presence</li>
                          <li>• Format validation (dates, coordinates)</li>
                          <li>• Range constraints</li>
                        </ul>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</div>
                          <h4 className="font-semibold text-slate-900 text-lg">Statistical Checks</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>• Outlier detection (IQR method)</li>
                          <li>• Distribution analysis</li>
                          <li>• Trend consistency checks</li>
                          <li>• Year-over-year validation</li>
                        </ul>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</div>
                          <h4 className="font-semibold text-slate-900 text-lg">Cross-Reference</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>• Compare multiple data sources</li>
                          <li>• Verify conflicting values</li>
                          <li>• Prioritize authoritative sources</li>
                          <li>• Flag discrepancies for review</li>
                        </ul>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">4</div>
                          <h4 className="font-semibold text-slate-900 text-lg">Manual Review</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>• Spot-check random samples</li>
                          <li>• Investigate flagged anomalies</li>
                          <li>• Validate new data sources</li>
                          <li>• Quarterly comprehensive audits</li>
                        </ul>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Automated Testing Suite</h3>

                    <div className="bg-slate-900 rounded-lg p-6 my-6 overflow-x-auto">
                      <pre className="text-green-400 font-mono text-sm">
{`class DataValidator {
  validateCity(cityData) {
    const tests = [
      this.checkRequiredFields(cityData),
      this.validateRanges(cityData),
      this.detectOutliers(cityData),
      this.crossReferenceMetrics(cityData),
      this.checkTemporalConsistency(cityData)
    ];
    
    const results = tests.map(test => test.run());
    const passedAll = results.every(r => r.passed);
    
    if (!passedAll) {
      this.flagForReview(cityData, results);
    }
    
    return {
      valid: passedAll,
      confidence: this.calculateConfidence(results),
      issues: results.filter(r => !r.passed)
    };
  }
  
  checkRequiredFields(data) {
    const required = [
      'city_name', 'state', 'population',
      'crime_rate', 'median_income', 'home_price'
    ];
    
    return {
      passed: required.every(field => data[field] !== null),
      message: 'All required fields present'
    };
  }
  
  validateRanges(data) {
    const checks = {
      population: [1000, 10000000],
      crime_rate: [0, 10000],
      median_income: [20000, 500000],
      home_price: [50000, 5000000]
    };
    
    for (const [field, [min, max]] of Object.entries(checks)) {
      if (data[field] < min || data[field] > max) {
        return { 
          passed: false, 
          message: \`\${field} outside valid range\`
        };
      }
    }
    
    return { passed: true, message: 'All values in range' };
  }
}`}
                      </pre>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Quality Metrics</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                        <div className="text-4xl font-bold text-green-700 mb-2">99.2%</div>
                        <div className="text-slate-700 font-medium">Data Completeness</div>
                        <div className="text-sm text-slate-600 mt-2">Cities with full metric coverage</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                        <div className="text-4xl font-bold text-blue-700 mb-2">97.8%</div>
                        <div className="text-slate-700 font-medium">Validation Pass Rate</div>
                        <div className="text-sm text-slate-600 mt-2">Records passing all checks</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="text-4xl font-bold text-purple-700 mb-2">24hrs</div>
                        <div className="text-slate-700 font-medium">Update Latency</div>
                        <div className="text-sm text-slate-600 mt-2">Max time from source to system</div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Error Handling Strategy</h3>

                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Error Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Detection Method</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Resolution</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">Missing Values</td>
                            <td className="px-6 py-4 text-sm text-slate-600">Null/undefined checks</td>
                            <td className="px-6 py-4 text-sm text-slate-600">Imputation or source retry</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">Outliers</td>
                            <td className="px-6 py-4 text-sm text-slate-600">IQR analysis, Z-scores</td>
                            <td className="px-6 py-4 text-sm text-slate-600">Manual review + capping</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">Inconsistency</td>
                            <td className="px-6 py-4 text-sm text-slate-600">Cross-source comparison</td>
                            <td className="px-6 py-4 text-sm text-slate-600">Prioritize trusted source</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">Stale Data</td>
                            <td className="px-6 py-4 text-sm text-slate-600">Timestamp validation</td>
                            <td className="px-6 py-4 text-sm text-slate-600">Force refresh from API</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">Format Errors</td>
                            <td className="px-6 py-4 text-sm text-slate-600">Schema validation</td>
                            <td className="px-6 py-4 text-sm text-slate-600">Automated transformation</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Continuous Monitoring</h3>

                    <p className="text-slate-700 leading-relaxed">
                      Our system continuously monitors data quality through automated dashboards and alerts:
                    </p>

                    <div className="bg-blue-50 rounded-lg p-6 my-6 border border-blue-200">
                      <h4 className="font-semibold text-slate-900 mb-3">Real-Time Alerts</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li>• <strong>Data Drift:</strong> Alert when metric distributions shift significantly</li>
                        <li>• <strong>Source Failures:</strong> Immediate notification if API calls fail</li>
                        <li>• <strong>Validation Drops:</strong> Alert if pass rate falls below 95%</li>
                        <li>• <strong>Update Delays:</strong> Flag if data hasn't refreshed in expected timeframe</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                      <p className="text-sm text-green-800">
                        <strong>Transparency Commitment:</strong> When data quality issues affect scores, we clearly 
                        indicate this to users with confidence ratings and data freshness indicators on each city profile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">About This Methodology</h3>
              <p className="text-slate-400 text-sm">
                Our scoring system is continuously refined based on user feedback and advances in data science. 
                Last updated: February 2026
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">Data Sources</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>FBI Crime Database</li>
                <li>U.S. Census Bureau</li>
                <li>Bureau of Labor Statistics</li>
                <li>NOAA Climate Data</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">Questions?</h3>
              <p className="text-slate-400 text-sm">
                For questions about our methodology or data sources, please contact our research team.
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-6 text-center text-sm text-slate-400">
            {/* © 2026 Relocation Tool. All methodology and algorithms are proprietary. */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MethodologyPage;