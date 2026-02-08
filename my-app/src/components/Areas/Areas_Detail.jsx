'use client';

import { useState, useEffect } from 'react';
import { MapPin, Star, TrendingUp, TrendingDown, Home, Train, ShoppingBag, Heart, Share2, Map, Shield, DollarSign, Bus, School, Hospital, TreePine, Utensils, Coffee, ChevronRight, Users, Clock, ArrowRight, X } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import { getLocationBySlug, getReviews, submitReview } from '@/lib/api';

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
                    style={{ width: `${typeof value === 'number' ? value * 10 : 0}%` }}
                  />
                </div>
                {typeof value === 'number' && <span className="text-sm font-medium text-gray-700 w-8">{value}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CostItem = ({ label, value, comparison, isRent = false }) => {
  if (!value) return null;
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const diff = (isRent && comparison) ? ((numValue - comparison) / comparison * 100).toFixed(0) : 0;
  const isHigher = numValue > comparison;

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-900">{typeof value === 'number' ? `₹${value.toLocaleString()}` : value}</span>
        {isRent && comparison && (
          <div className={`flex items-center gap-1 text-xs ${isHigher ? 'text-red-600' : 'text-green-600'}`}>
            {isHigher ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{Math.abs(diff)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
export default function AreaDetailPage({ slug }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [neighborhood, setNeighborhood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Comparison logic
  const { addToComparison, comparisonList } = useMapStore();
  const isInComparison = comparisonList.some(item => item.slug === slug);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getLocationBySlug(slug);
        if (!data) {
          setError('Location not found');
        } else {
          // Transform DB data to Component structure
          const transformed = {
            ...data,
            location: `${data.state}, ${data.country}`,
            overallScore: data.overall_score || 0,
            heroImage: (data.images && data.images.length > 0)
              ? (data.images[0].startsWith('http') ? data.images[0] : `https://placehold.co/1200x400?text=${data.name}`)
              : `https://placehold.co/1200x400?text=${data.name}`,
            metrics: {
              safety: { score: data.safety_score || 0, breakdown: { police: 8, lighting: 8 } }, // Mock breakdown for now if not in DB
              affordability: { score: data.cost_of_living_score || 0, breakdown: { rent: 6, utilities: 6 } },
              transit: { score: data.infrastructure_score || 0, breakdown: { metro: 8, bus: 8 } },
              amenities: { score: data.healthcare_score || 0, breakdown: { hospitals: 8, parks: 8 } }
            },
            costOfLiving: {
              rent: {
                '1bhk': data.cost_breakdown?.housing ? data.cost_breakdown.housing * 0.7 : 2000,
                '2bhk': data.cost_breakdown?.housing || 3000,
                '3bhk': data.cost_breakdown?.housing ? data.cost_breakdown.housing * 1.5 : 4500
              }, // Estimations based on base housing cost
              utilities: {
                electricity: data.cost_breakdown?.utilities || 200,
                water: 50,
                gas: 50,
                internet: 60
              },
              groceries: data.cost_breakdown?.groceries || 400,
              transport: data.cost_breakdown?.transportation || 150,
              mumbaiAverage: { '1bhk': 1500, '2bhk': 2500, '3bhk': 3500 } // Mock specific comparison base
            },
            amenitiesCount: { schools: 45, hospitals: 12, parks: 20, restaurants: 150, cafes: 40, gyms: 25 }, // Mock for now
            photos: data.images?.length > 1 ? data.images.slice(1) : [`https://placehold.co/400x300?text=${data.name}+1`, `https://placehold.co/400x300?text=${data.name}+2`, `https://placehold.co/400x300?text=${data.name}+3`],
            neighbors: [] // TODO: Spatial query for neighbors
          };
          setNeighborhood(transformed);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load location data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  // Review State
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch reviews when tab is active
  useEffect(() => {
    if (activeTab === 'reviews' && neighborhood?.id) {
      setReviewsLoading(true);
      getReviews(neighborhood.id)
        .then(data => setReviews(data))
        .catch(err => console.error(err))
        .finally(() => setReviewsLoading(false));
    }
  }, [activeTab, neighborhood?.id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const result = await submitReview({
        location_id: neighborhood.id,
        rating: newReview.rating,
        comment: newReview.comment
      });

      if (result) {
        setReviews([result, ...reviews]);
        setNewReview({ rating: 5, comment: '' });
        setShowReviewForm(false);
      }
    } catch (error) {
      alert('Failed to submit review. Please ensure you are logged in.');
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error || !neighborhood) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Location Not Found</h1>
          <p className="text-gray-600">The requested location "{slug}" could not be found.</p>
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
                <span className="text-sm">{neighborhood.state}, {neighborhood.country}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsSaved(!isSaved);
                  alert(isSaved ? 'Removed from saved locations' : 'Added to saved locations');
                }}
                className={`px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors ${isSaved ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span className="font-medium">{isSaved ? 'Saved' : 'Save'}</span>
              </button>
              <button
                onClick={async () => {
                  try {
                    if (navigator.share) {
                      await navigator.share({
                        title: neighborhood.name,
                        text: `Check out ${neighborhood.name} on Relocation Assistant`,
                        url: window.location.href,
                      });
                    } else {
                      await navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  } catch (err) {
                    console.error('Error sharing:', err);
                  }
                }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="font-medium">Share</span>
              </button>
              <button
                onClick={() => {
                  if (neighborhood.lat && neighborhood.lng) {
                    window.open(`https://www.google.com/maps/search/?api=1&query=${neighborhood.lat},${neighborhood.lng}`, '_blank');
                  } else {
                    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(neighborhood.name + ', ' + neighborhood.location)}`, '_blank');
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
              >
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
                  {/* <p className="text-xs text-gray-500 mt-1">Based on X reviews</p> */}
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
                className={`pb-4 px-1 font-medium transition-colors relative ${activeTab === tab.id
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
                {neighborhood.photos && neighborhood.photos.map((photo, idx) => (
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
                  <p className="text-xs text-gray-500">Compared to National average</p>
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

            </div>
          </div>
        )}

        {activeTab === 'transport' && (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Transport Stats</h3>
            {neighborhood.metrics.transit && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded">
                  <div className="text-sm text-gray-500">Infrastructure Score</div>
                  <div className="text-2xl font-bold">{neighborhood.metrics.transit.score}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'amenities' && (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Amenities Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Healthcare Score</div>
                <div className="text-2xl font-bold">{neighborhood.metrics.amenities.score}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">User Reviews</h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {showReviewForm ? 'Cancel' : 'Write a Review'}
              </button>
            </div>

            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Comment</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share your experience..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {submitLoading ? 'Submitting...' : 'Post Review'}
                </button>
              </form>
            )}

            {reviewsLoading ? (
              <p className="text-center text-gray-500">Loading reviews...</p>
            ) : reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {review.user?.full_name?.[0] || 'U'}
                      </div>
                      <span className="font-semibold text-gray-900">{review.user?.full_name || 'Anonymous User'}</span>
                      <span className="text-sm text-gray-500">• {new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No reviews yet.</p>
                {!showReviewForm && (
                  <p className="text-sm text-blue-600">Be the first to leave a review!</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add to Comparison CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Compare with Other Areas</h3>
              <p className="text-blue-100">Add {neighborhood.name} to your comparison list to see how it stacks up against other neighborhoods.</p>
            </div>
            <button
              onClick={() => {
                if (!isInComparison) {
                  addToComparison(neighborhood);
                  alert(`${neighborhood.name} added to comparison list!`);
                }
              }}
              disabled={isInComparison}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${isInComparison
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
            >
              {isInComparison ? 'Added to Comparison' : 'Add to Comparison'}
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
                className={`px-4 py-2 rounded-lg transition-colors ${currentSlug === slug
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