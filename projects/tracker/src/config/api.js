// API Configuration - Shared across all pages
export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDk3ZmY2ZGI4M2EyZWM3YjI0MTEzZGQ2NzAxYWVjOCIsIm5iZiI6MTc4NTgzMTIwMy4wODksInN1YiI6IjZhNzE5ZjIzZWI5YzFjYTQwYzQ2YWRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZJh_EyAmcn2Uv7xuQbFUK7tQFpcLtdJCPjElPBCdDxo';
export const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w300';

// API Endpoints
export const ENDPOINTS = {
    searchMovie: `${API_BASE_URL}/search/movie`,
    getGenres: `${API_BASE_URL}/genre/movie/list`,
    getTrendingMovies: `${API_BASE_URL}/trending/movie/week`,
    getTvSeries: `${API_BASE_URL}/tv/popular`,
};

// Function to search for movies
export async function searchMovies(query) {
    try {
        const response = await fetch(
            `${ENDPOINTS.searchMovie}?query=${encodeURIComponent(query)}&api_key=${API_ACCESS_TOKEN}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}

// Function to get all genres
export async function getGenres() {
    try {
        const response = await fetch(
            `${ENDPOINTS.getGenres}?api_key=${API_ACCESS_TOKEN}`
        );
        const data = await response.json();
        return data.genres || [];
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
}

// Function to get trending movies
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

// Function to get TV series
export async function getTvSeries() {
    try {
        const response = await fetch(
            `${ENDPOINTS.getTvSeries}?api_key=${API_ACCESS_TOKEN}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching TV series:', error);
        return [];
    }
}