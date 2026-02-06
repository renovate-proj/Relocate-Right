import { supabase } from '@/lib/supabase';

// --- LOCATIONS ---

/**
 * Fetch all locations (summary data)
 */
export async function getLocations() {
    const { data, error } = await supabase
        .from('locations')
        .select('id, name, slug, description, lat, lng, overall_score, cost_of_living_score, job_prospects_score, education_score, healthcare_score, infrastructure_score, images')
        .order('name');

    if (error) {
        console.error('Error fetching locations:', error);
        return [];
    }
    return data;
}

/**
 * Fetch a single location by ID with all details
 * @param {string|number} id 
 */
export async function getLocationById(id) {
    const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching location ${id}:`, error);
        return null;
    }
    return data;
}

/**
 * Fetch a single location by Slug with all details
 * @param {string} slug 
 */
export async function getLocationBySlug(slug) {
    const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error(`Error fetching location by slug ${slug}:`, error);
        return null;
    }
    return data;
}

/**
 * Search locations by name
 * @param {string} query 
 */
export async function searchLocations(query) {
    const { data, error } = await supabase
        .from('locations')
        .select('id, name, slug, overall_score, images')
        .ilike('name', `%${query}%`)
        .limit(5);

    if (error) {
        console.error('Error searching locations:', error);
        return [];
    }
    return data;
}

// --- REVIEWS ---

/**
 * Fetch reviews for a specific location
 * @param {string|number} locationId 
 */
export async function getReviews(locationId) {
    const { data, error } = await supabase
        .from('reviews')
        .select(`
      id,
      rating,
      comment,
      created_at,
      user:profiles(full_name, avatar_url)
    `)
        .eq('location_id', locationId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
    // Flatten user object for easier consumption
    return data.map(review => ({
        ...review,
        name: review.user?.full_name || 'Anonymous',
        date: new Date(review.created_at).toLocaleDateString()
    }));
}

/**
 * Submit a new review
 * @param {object} reviewData 
 */
export async function submitReview({ locationId, rating, comment }) {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('You must be logged in to review');

    const { data, error } = await supabase
        .from('reviews')
        .insert({
            location_id: locationId,
            user_id: user.id,
            rating,
            comment
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}
