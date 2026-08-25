import React, { useEffect, useState } from 'react';
import { getTopRatedMovies, getGenres, POSTER_BASE_URL, DEFAULT_LANGUAGE } from '../config/api';
import '../styles/Dashboard.css';

function Dashboard() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Fetch both movies and genres in parallel
                const [items, genreList] = await Promise.all([
                    getTopRatedMovies(1, DEFAULT_LANGUAGE),
                    getGenres(DEFAULT_LANGUAGE)
                ]);

                // Filter for high-rated movies (>= 7) and sort by rating
                const highRatedMovies = items
                    .filter((movie) => movie.vote_average >= 7)
                    .sort((a, b) => b.vote_average - a.vote_average)
                    .slice(0, 8);

                setMovies(highRatedMovies);
                setGenres(genreList);
            } catch (error) {
                console.error('Error fetching movies data:', error);
                setError('Failed to load movies. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Get genre names from genre IDs
    const getGenreNames = (ids = []) => {
        if (!Array.isArray(ids) || ids.length === 0) return 'N/A';

        return ids
            .map((id) => {
                const genre = genres.find((genre) => genre.id === id);
                return genre ? genre.name : null;
            })
            .filter(Boolean)
            .join(', ') || 'N/A';
    };

    // Render loading state
    if (isLoading) {
        return (
            <main className="dashboard-container">
                <div className="loading-container">
                    <div className="spinner" />
                    <p>Loading top movies...</p>
                </div>
            </main>
        );
    }

    // Render error state
    if (error) {
        return (
            <main className="dashboard-container">
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button
                        className="retry-button"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dashboard - Top Rated Movies</h1>
                <p>Explore our collection of the best-rated movies</p>
                {movies.length > 0 && (
                    <div className="movies-stats">
                        Showing {movies.length} top-rated movies (⭐ 7+)
                    </div>
                )}
            </div>

            {movies.length === 0 ? (
                <div className="empty-state">
                    <p>No high-rated movies found.</p>
                </div>
            ) : (
                <div className="dashboard-grid">
                    {movies.map((movie) => (
                        <div key={movie.id} className="dashboard-card">
                            {movie.poster_path ? (
                                <img
                                    src={`${POSTER_BASE_URL}${movie.poster_path}`}
                                    alt={movie.title || 'Movie'}
                                    className="movie-poster"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="poster-placeholder">
                                    <span>No Image</span>
                                </div>
                            )}

                            <div className="card-content">
                                <h3>{movie.title || 'Untitled'}</h3>

                                <div className="card-meta">
                                    <span className="rating">
                                        ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
                                    </span>
                                    <span className="year">
                                        {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                                    </span>
                                </div>

                                <p className="genre">
                                    <strong>Genres:</strong> {getGenreNames(movie.genre_ids)}
                                </p>

                                <p className="overview">
                                    {movie.overview
                                        ? movie.overview.substring(0, 120) + '...'
                                        : 'No description available.'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Dashboard;