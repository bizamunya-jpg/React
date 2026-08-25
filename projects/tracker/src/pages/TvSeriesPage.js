import React, { useEffect, useState } from 'react';
import { getPopularTv, getTvGenres, POSTER_BASE_URL, DEFAULT_LANGUAGE } from '../config/api';
import '../styles/Dashboard.css';

function TvSeriesPage() {
    const [series, setSeries] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Fetch both TV series and genres in parallel
                const [items, genreList] = await Promise.all([
                    getPopularTv(1, DEFAULT_LANGUAGE),
                    getTvGenres(DEFAULT_LANGUAGE)
                ]);

                setSeries(items.slice(0, 12)); // Show first 12 series
                setGenres(genreList);
            } catch (error) {
                console.error('Error fetching TV series data:', error);
                setError('Failed to load TV series. Please try again later.');
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

    // Render a single TV series card
    const renderCard = (item) => (
        <div key={item.id} className="dashboard-card">
            {item.poster_path ? (
                <img
                    src={`${POSTER_BASE_URL}${item.poster_path}`}
                    alt={item.name || 'TV Series'}
                    className="movie-poster"
                    loading="lazy"
                />
            ) : (
                <div className="poster-placeholder">
                    <span>No Image</span>
                </div>
            )}

            <div className="card-content">
                <h3>{item.name || 'Untitled'}</h3>

                <div className="card-meta">
                    <span className="rating">
                        ⭐ {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}/10
                    </span>
                    <span className="year">
                        {item.first_air_date ? item.first_air_date.split('-')[0] : 'N/A'}
                    </span>
                </div>

                <p className="genre">
                    <strong>Genres:</strong> {getGenreNames(item.genre_ids)}
                </p>

                <p className="overview">
                    {item.overview ? item.overview.substring(0, 120) + '...' : 'No description available.'}
                </p>

                {/* Show additional TV show info if available */}
                {item.number_of_seasons && (
                    <p className="seasons">
                        <strong>Seasons:</strong> {item.number_of_seasons}
                    </p>
                )}

                {item.origin_country && item.origin_country.length > 0 && (
                    <p className="country">
                        <strong>Country:</strong> {item.origin_country.join(', ')}
                    </p>
                )}
            </div>
        </div>
    );

    return (
        <main className="dashboard-container">
            <div className="dashboard-header">
                <h1>Popular TV Series</h1>
                <p>Explore trending TV series from around the world</p>
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="spinner" />
                    <p>Loading TV series...</p>
                </div>
            ) : error ? (
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button
                        className="retry-button"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
            ) : series.length === 0 ? (
                <div className="empty-state">
                    <p>No TV series found.</p>
                </div>
            ) : (
                <div className="dashboard-grid">
                    {series.map(renderCard)}
                </div>
            )}
        </main>
    );
}

export default TvSeriesPage;