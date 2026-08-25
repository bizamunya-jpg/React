// API Configuration - Shared across all pages
export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDk3ZmY2ZGI4M2EyZWM3YjI0MTEzZGQ2NzAxYWVjOCIsIm5iZiI6MTc4NTgzMTIwMy4wODksInN1YiI6IjZhNzE5ZjIzZWI5YzFjYTQwYzQ2YWRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZJh_EyAmcn2Uv7xuQbFUK7tQFpcLtdJCPjElPBCdDxo';
export const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w300';

// API Endpoints
export const ENDPOINTS = {
    // Search endpoints
    searchMovie: `${API_BASE_URL}/search/movie`,
    searchTv: `${API_BASE_URL}/search/tv`, // Search TV shows by name [citation:9]
    searchMulti: `${API_BASE_URL}/search/multi`, // Search movies, TV shows, and people [citation:9]

    // Movie list endpoints
    getPopularMovies: `${API_BASE_URL}/movie/popular`, // Get popular movies [citation:2][citation:5]
    getTopRatedMovies: `${API_BASE_URL}/movie/top_rated`, // Get top rated movies
    getUpcomingMovies: `${API_BASE_URL}/movie/upcoming`, // Get upcoming movies
    getNowPlayingMovies: `${API_BASE_URL}/movie/now_playing`, // Movies in theatres [citation:11]

    // TV list endpoints
    getPopularTv: `${API_BASE_URL}/tv/popular`, // Get popular TV shows [citation:2]
    getTopRatedTv: `${API_BASE_URL}/tv/top_rated`, // Get top rated TV shows
    getOnTheAirTv: `${API_BASE_URL}/tv/on_the_air`, // Shows currently on air

    // Discover endpoints (filtered browsing)
    discoverMovie: `${API_BASE_URL}/discover/movie`, // Filter by genre, year, rating, etc. [citation:4][citation:8]
    discoverTv: `${API_BASE_URL}/discover/tv`, // Filter TV shows by network, genre, etc. [citation:4]

    // Genre endpoints
    getGenres: `${API_BASE_URL}/genre/movie/list`, // Get movie genres
    getTvGenres: `${API_BASE_URL}/genre/tv/list`, // Get TV show genres [citation:4]

    // Configuration
    getConfiguration: `${API_BASE_URL}/configuration`, // Get image sizes and base URLs [citation:3]

    // Trending
    getTrendingMovies: `${API_BASE_URL}/trending/movie/week`,
    getTrendingTv: `${API_BASE_URL}/trending/tv/week`, // Trending TV shows
    getTrendingPeople: `${API_BASE_URL}/trending/person/week`, // Trending people
};

// Image size options (from configuration endpoint) [citation:3]
export const IMAGE_SIZES = {
    poster: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    backdrop: ['w300', 'w780', 'w1280', 'original'],
    profile: ['w45', 'w185', 'h632', 'original'],
    still: ['w92', 'w185', 'w300', 'original'],
};

// Default language for API requests [citation:5][citation:8]
export const DEFAULT_LANGUAGE = 'en-US';

// Function to search for movies
export async function searchMovies(query, options = {}) {
    try {
        const params = new URLSearchParams({
            query: encodeURIComponent(query),
            api_key: API_ACCESS_TOKEN,
            language: options.language || DEFAULT_LANGUAGE,
            include_adult: options.includeAdult || false,
            page: options.page || 1,
            ...options
        });

        const response = await fetch(
            `${ENDPOINTS.searchMovie}?${params.toString()}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}

// Search across all media types (movies, TV, people)
export async function searchMulti(query, options = {}) {
    try {
        const params = new URLSearchParams({
            query: encodeURIComponent(query),
            api_key: API_ACCESS_TOKEN,
            language: options.language || DEFAULT_LANGUAGE,
            include_adult: options.includeAdult || false,
            page: options.page || 1
        });

        const response = await fetch(
            `${ENDPOINTS.searchMulti}?${params.toString()}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error in multi search:', error);
        return [];
    }
}

// Discover movies with filters [citation:4][citation:8]
export async function discoverMovies(filters = {}) {
    try {
        const params = new URLSearchParams({
            api_key: API_ACCESS_TOKEN,
            language: filters.language || DEFAULT_LANGUAGE,
            page: filters.page || 1,
            sort_by: filters.sortBy || 'popularity.desc',
            include_adult: filters.includeAdult || false,
            ...filters
        });

        const response = await fetch(
            `${ENDPOINTS.discoverMovie}?${params.toString()}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error discovering movies:', error);
        return [];
    }
}

// Get all movie genres
export async function getGenres(language = DEFAULT_LANGUAGE) {
    try {
        const response = await fetch(
            `${ENDPOINTS.getGenres}?api_key=${API_ACCESS_TOKEN}&language=${language}`
        );
        const data = await response.json();
        return data.genres || [];
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
}

// Get TV show genres
export async function getTvGenres(language = DEFAULT_LANGUAGE) {
    try {
        const response = await fetch(
            `${ENDPOINTS.getTvGenres}?api_key=${API_ACCESS_TOKEN}&language=${language}`
        );
        const data = await response.json();
        return data.genres || [];
    } catch (error) {
        console.error('Error fetching TV genres:', error);
        return [];
    }
}

// Get popular movies
export async function getPopularMovies(page = 1, language = DEFAULT_LANGUAGE) {
    try {
        const response = await fetch(
            `${ENDPOINTS.getPopularMovies}?api_key=${API_ACCESS_TOKEN}&language=${language}&page=${page}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

// Get top rated movies
export async function getTopRatedMovies(page = 1, language = DEFAULT_LANGUAGE) {
    try {
        const response = await fetch(
            `${ENDPOINTS.getTopRatedMovies}?api_key=${API_ACCESS_TOKEN}&language=${language}&page=${page}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        return [];
    }
}

// Get popular TV shows
export async function getPopularTv(page = 1, language = DEFAULT_LANGUAGE) {
    try {
        const response = await fetch(
            `${ENDPOINTS.getPopularTv}?api_key=${API_ACCESS_TOKEN}&language=${language}&page=${page}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching popular TV shows:', error);
        return [];
    }
}

// Get trending movies
export async function getTrendingMovies() {
    try {
        const response = await fetch(
            `${ENDPOINTS.getTrendingMovies}?api_key=${API_ACCESS_TOKEN}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}

// Get configuration (for image sizes and base URLs)
export async function getConfiguration() {
    try {
        const response = await fetch(
            `${ENDPOINTS.getConfiguration}?api_key=${API_ACCESS_TOKEN}`
        );
        const data = await response.json();
        return data || {};
    } catch (error) {
        console.error('Error fetching configuration:', error);
        return {};
    }
}