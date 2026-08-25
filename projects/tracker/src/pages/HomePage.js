import React, { useContext, useState } from 'react';
import { POSTER_BASE_URL, searchMovies } from '../config/api';
import { MovieContext } from '../context/MovieContext';
import '../styles/HomePage.css';

function HomePage() {
    // Get movies from context
    const { movies, isInitialized } = useContext(MovieContext);

    const [search, setSearch] = useState('');
    const [apiSearchQuery, setApiSearchQuery] = useState('');
    const [apiSearchResults, setApiSearchResults] = useState([]);
    const [apiIsLoading, setApiIsLoading] = useState(false);
    // Handle API search for movies
    async function handleApiSearch() {
        if (!apiSearchQuery.trim()) return;

        setApiIsLoading(true);

        try {
            const results = await searchMovies(apiSearchQuery.trim());
            setApiSearchResults(results || []);
        } catch (error) {
            console.error('Search failed:', error);
            setApiSearchResults([]);
        } finally {
            setApiIsLoading(false);
        }
    }

    // Filter saved movies based on search
    const filteredMovies = movies.filter((movie) =>
        movie.name && movie.name.toLowerCase().includes(search.toLowerCase())
    );

    if (!isInitialized) {
        return (
            <main className="home-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading movies...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="home-container">
            <header className="home-header">
                <h1>Movie Collection Tracker</h1>
                <p>Search, collect, and manage your favorite movies</p>
                <div className="collection-stats">
                    <span>📚 {movies.length} movies in collection</span>
                </div>
            </header>

            <section className="api-search-section">
                <h2>Search and Add Movies from Database</h2>
                <div className="api-search-bar">
                    <input
                        value={apiSearchQuery}
                        onChange={(event) => setApiSearchQuery(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                handleApiSearch();
                            }
                        }}
                        placeholder="Search for movies"
                        aria-label="Search for movies"
                        disabled={apiIsLoading}
                    />
                    <button
                        type="button"
                        onClick={handleApiSearch}
                        disabled={apiIsLoading || !apiSearchQuery.trim()}
                    >
                        {apiIsLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>

                {apiSearchResults.length > 0 && (
                    <div className="api-results-grid">
                        {apiSearchResults.slice(0, 6).map((movie) => (
                            <article key={movie.id || Date.now() + Math.random()} className="api-movie-card">
                                {movie.poster_path ? (
                                    <img
                                        src={`${POSTER_BASE_URL}${movie.poster_path}`}
                                        alt={movie.title || movie.name || 'Movie poster'}
                                        className="movie-poster"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="movie-poster-placeholder">No Image</div>
                                )}
                                <h4>{movie.title || movie.name || 'Untitled'}</h4>
                                <p>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                                <p className="rating">
                                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Just show movie details, no add functionality
                                        console.log('Movie details:', movie);
                                    }}
                                >
                                    View Details
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <section className="saved-movies">
                <div className="saved-movies-heading">
                    <h2>Your Movies ({movies.length})</h2>
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search saved movies"
                        aria-label="Search saved movies"
                    />
                </div>

                {filteredMovies.length === 0 ? (
                    <div className="empty-state">
                        <p>No saved movies found.</p>
                        {movies.length === 0 ? (
                            <p>Start by searching for movies above!</p>
                        ) : (
                            <p>Try adjusting your search filter.</p>
                        )}
                    </div>
                ) : (
                    <div className="movies-list">
                        {filteredMovies.map((movie) => (
                            <article key={movie.id || movie.name} className="movie-card">
                                {movie.poster && (
                                    <img
                                        src={movie.poster}
                                        alt={movie.name || 'Movie poster'}
                                        className="movie-poster-saved"
                                        loading="lazy"
                                    />
                                )}
                                <div className="movie-info">
                                    <h3>{movie.name || 'Untitled'}</h3>
                                    <p>Genre: {movie.genre || 'N/A'}</p>
                                    <p>Rating: {movie.rating || 'N/A'}/10</p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default HomePage;