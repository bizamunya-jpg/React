// API Configuration - Shared across all pages
export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDk3ZmY2ZGI4M2EyZWM3YjI0MTEzZGQ2NzAxYWVjOCIsIm5iZiI6MTc4NTgzMTIwMy4wODksInN1YiI6IjZhNzE5ZjIzZWI5YzFjYTQwYzQ2YWRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZJh_EyAmcn2Uv7xuQbFUK7tQFpcLtdJCPjElPBCdDxo';
export const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w300';
export const API_KEY = 'e097ff6db83a2ec7b24113dd6701aec8';

// API Endpoints
export const ENDPOINTS = {
    // Search endpoints
    searchMovie: `${API_BASE_URL}/search/movie`,
    searchTv: `${API_BASE_URL}/search/tv`,
    searchMulti: `${API_BASE_URL}/search/multi`,

    // Movie list endpoints
    getPopularMovies: `${API_BASE_URL}/movie/popular`,
    getTopRatedMovies: `${API_BASE_URL}/movie/top_rated`,
    getUpcomingMovies: `${API_BASE_URL}/movie/upcoming`,
    getNowPlayingMovies: `${API_BASE_URL}/movie/now_playing`,

    // TV list endpoints
    getPopularTv: `${API_BASE_URL}/tv/popular`,
    getTopRatedTv: `${API_BASE_URL}/tv/top_rated`,
    getOnTheAirTv: `${API_BASE_URL}/tv/on_the_air`,
    getAiringTodayTv: `${API_BASE_URL}/tv/airing_today`,

    // Discover endpoints
    discoverMovie: `${API_BASE_URL}/discover/movie`,
    discoverTv: `${API_BASE_URL}/discover/tv`,

    // Genre endpoints
    getGenres: `${API_BASE_URL}/genre/movie/list`,
    getTvGenres: `${API_BASE_URL}/genre/tv/list`,

    // Configuration
    getConfiguration: `${API_BASE_URL}/configuration`,

    // Trending
    getTrendingMovies: `${API_BASE_URL}/trending/movie/week`,
    getTrendingTv: `${API_BASE_URL}/trending/tv/week`,
    getTrendingPeople: `${API_BASE_URL}/trending/person/week`,

    // Movie details
    getMovieDetails: `${API_BASE_URL}/movie`,
    getTvDetails: `${API_BASE_URL}/tv`,
};

// Image size options
export const IMAGE_SIZES = {
    poster: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    backdrop: ['w300', 'w780', 'w1280', 'original'],
    profile: ['w45', 'w185', 'h632', 'original'],
    still: ['w92', 'w185', 'w300', 'original'],
};

// Default language for API requests
export const DEFAULT_LANGUAGE = 'en-US';

// Helper function for API calls with proper authentication
async function tmdbFetch(endpoint, params = {}, options = {}) {
    const url = new URL(endpoint);

    // Add default params
    const defaultParams = {
        api_key: API_KEY, // Using API key instead of access token for v3
        language: DEFAULT_LANGUAGE,
        ...params
    };

    Object.keys(defaultParams).forEach(key => {
        if (defaultParams[key] !== undefined && defaultParams[key] !== null) {
            url.searchParams.append(key, defaultParams[key]);
        }
    });

    const response = await fetch(url.toString(), {
        headers: {
            'Accept': 'application/json',
            ...options.headers
        },
        ...options
    });

    if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// Function to search for movies
export async function searchMovies(query, options = {}) {
    try {
        const params = {
            query: encodeURIComponent(query),
            include_adult: options.includeAdult || false,
            page: options.page || 1,
            ...options
        };

        const data = await tmdbFetch(ENDPOINTS.searchMovie, params);
        return data.results || [];
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}

// Search TV shows
export async function searchTv(query, options = {}) {
    try {
        const params = {
            query: encodeURIComponent(query),
            include_adult: options.includeAdult || false,
            page: options.page || 1,
            ...options
        };

        const data = await tmdbFetch(ENDPOINTS.searchTv, params);
        return data.results || [];
    } catch (error) {
        console.error('Error searching TV shows:', error);
        return [];
    }
}

// Search across all media types (movies, TV, people)
export async function searchMulti(query, options = {}) {
    try {
        const params = {
            query: encodeURIComponent(query),
            include_adult: options.includeAdult || false,
            page: options.page || 1,
            ...options
        };

        const data = await tmdbFetch(ENDPOINTS.searchMulti, params);
        return data.results || [];
    } catch (error) {
        console.error('Error in multi search:', error);
        return [];
    }
}

// Discover movies with filters
export async function discoverMovies(filters = {}) {
    try {
        const params = {
            sort_by: filters.sortBy || 'popularity.desc',
            include_adult: filters.includeAdult || false,
            page: filters.page || 1,
            ...filters
        };

        const data = await tmdbFetch(ENDPOINTS.discoverMovie, params);
        return data.results || [];
    } catch (error) {
        console.error('Error discovering movies:', error);
        return [];
    }
}

// Discover TV shows with filters
export async function discoverTv(filters = {}) {
    try {
        const params = {
            sort_by: filters.sortBy || 'popularity.desc',
            include_adult: filters.includeAdult || false,
            page: filters.page || 1,
            ...filters
        };

        const data = await tmdbFetch(ENDPOINTS.discoverTv, params);
        return data.results || [];
    } catch (error) {
        console.error('Error discovering TV shows:', error);
        return [];
    }
}

// Get all movie genres
export async function getGenres(language = DEFAULT_LANGUAGE) {
    try {
        const data = await tmdbFetch(ENDPOINTS.getGenres, { language });
        return data.genres || [];
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
}

// Get TV show genres
export async function getTvGenres(language = DEFAULT_LANGUAGE) {
    try {
        const data = await tmdbFetch(ENDPOINTS.getTvGenres, { language });
        return data.genres || [];
    } catch (error) {
        console.error('Error fetching TV genres:', error);
        return [];
    }
}

// Get popular movies
export async function getPopularMovies(page = 1, language = DEFAULT_LANGUAGE) {
    try {
        const data = await tmdbFetch(ENDPOINTS.getPopularMovies, { page, language });
        return data.results || [];
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

// Get top rated movies
export async function getTopRatedMovies(page = 1, language = DEFAULT_LANGUAGE) {
    try {
        const data = await tmdbFetch(ENDPOINTS.getTopRatedMovies, { page, language });
        return data.results || [];
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        return [];
    }
}

// Get upcoming movies
export async function getUpcomingMovies(page = 1, language = DEFAULT_LANGUAGE) {
    try {
        const data = await tmdbFetch(ENDPOINTS.getUpcomingMovies, { page, language });
        return data.results || [];
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        return [];
    }
}

// Get now playing movies
export async function getNowPlayingMovies(page = 1, language = DEFAULT_LANGUAGE) {
    try {
        const data = await tmdbFetch(ENDPOINTS.getNowPlayingMovies, { page, language });
        return data.results || [];
    } catch (error) {
        console.error('Error fetching now playing movies:', error);
        return [];
    }
}

// Get popular TV shows
export async function getPopularTv(page = 1, language = DEFAULT_LANGUAGE) {
    try {
        const data = await tmdbFetch(ENDPOINTS.getPopularTv, { page, language });
        return data.results || [];
    } catch (error) {
        console.error('Error fetching popular TV shows:', error);
        return [];
    }
}

// Get top rated TV shows
export async function getTopRatedTv(page = 1, language = DEFAULT_LANGUAGE) {
    try {
        const data = await tmdbFetch(ENDPOINTS.getTopRatedTv, { page, language });
        return data.results || [];
    } catch (error) {
        console.error('Error fetching top rated TV shows:', error);
        return [];
    }
}

// Get trending movies
export async function getTrendingMovies(timeWindow = 'week') {
    try {
        const endpoint = timeWindow === 'week' ?
            ENDPOINTS.getTrendingMovies :
            `${API_BASE_URL}/trending/movie/day`;
        const data = await tmdbFetch(endpoint);
        return data.results || [];
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}

// Get movie details by ID
export async function getMovieDetails(movieId, language = DEFAULT_LANGUAGE) {
    try {
        const data = await tmdbFetch(`${ENDPOINTS.getMovieDetails}/${movieId}`, { language });
        return data || null;
    } catch (error) {
        console.error(`Error fetching movie details for ID ${movieId}:`, error);
        return null;
    }
}

// Get TV show details by ID
export async function getTvDetails(tvId, language = DEFAULT_LANGUAGE) {
    try {
        const data = await tmdbFetch(`${ENDPOINTS.getTvDetails}/${tvId}`, { language });
        return data || null;
    } catch (error) {
        console.error(`Error fetching TV details for ID ${tvId}:`, error);
        return null;
    }
}

// Get configuration (for image sizes and base URLs)
export async function getConfiguration() {
    try {
        const data = await tmdbFetch(ENDPOINTS.getConfiguration);
        return data || {};
    } catch (error) {
        console.error('Error fetching configuration:', error);
        return {};
    }
}

// Utility function to get full image URL
export function getImageUrl(path, size = 'w300') {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

// Utility function to format date
export function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.getFullYear();
}

// Utility function to format rating
export function formatRating(rating) {
    if (!rating) return 'N/A';
    return rating.toFixed(1);
}