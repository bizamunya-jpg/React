import { useContext, useEffect, useState } from 'react';
import { getGenres, POSTER_BASE_URL, searchMovies } from '../config/api';
import { MovieContext } from '../context/MovieContext';
import '../styles/HomePage.css';

function HomePage() {
    const { movies, addMovie, deleteMovie, updateMovie, isInitialized } = useContext(MovieContext);
    const [search, setSearch] = useState('');
    const [apiSearchQuery, setApiSearchQuery] = useState('');
    const [apiSearchResults, setApiSearchResults] = useState([]);
    const [apiIsLoading, setApiIsLoading] = useState(false);
    const [genres, setGenres] = useState([]);
    const [movieToEdit, setMovieToEdit] = useState(null);
    const [formName, setFormName] = useState('');
    const [formGenre, setFormGenre] = useState('');
    const [formRating, setFormRating] = useState('');

    // Fixed: Added genres as dependency to prevent stale closures
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreData = await getGenres();
                setGenres(genreData || []);
            } catch (error) {
                console.error('Failed to fetch genres:', error);
                setGenres([]);
            }
        };
        fetchGenres();
    }, []);

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

    function addMovieFromApi(movie) {
        if (!movie) return;

        const genre = (movie.genre_ids || [])
            .map((id) => {
                const genreItem = genres.find((item) => item.id === id);
                return genreItem ? genreItem.name : null;
            })
            .filter(Boolean)
            .join(', ') || 'N/A';

        const savedMovie = {
            id: movie.id || Date.now(), // Fallback ID
            name: movie.title || movie.name || 'Untitled',
            genre: genre,
            rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
            poster: movie.poster_path ? `${POSTER_BASE_URL}${movie.poster_path}` : null,
        };

        const didSave = addMovie(savedMovie);
        if (didSave) {
            setApiSearchResults([]);
            setApiSearchQuery(''); // Clear search after adding
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedName = formName.trim();
        const trimmedGenre = formGenre.trim();
        const trimmedRating = formRating.trim();

        if (!trimmedName || !trimmedGenre || !trimmedRating) {
            return; // Validation
        }

        const savedMovie = {
            name: trimmedName,
            genre: trimmedGenre,
            rating: trimmedRating
        };

        let didSave;
        if (movieToEdit) {
            didSave = updateMovie(movieToEdit.name, savedMovie);
        } else {
            didSave = addMovie(savedMovie);
        }

        if (!didSave) return;

        // Reset form
        setMovieToEdit(null);
        setFormName('');
        setFormGenre('');
        setFormRating('');
    }

    function editMovie(movie) {
        if (!movie) return;
        setMovieToEdit(movie);
        setFormName(movie.name || '');
        setFormGenre(movie.genre || '');
        setFormRating(movie.rating || '');
    }

    function cancelEdit() {
        setMovieToEdit(null);
        setFormName('');
        setFormGenre('');
        setFormRating('');
    }

    const filteredMovies = movies.filter((movie) =>
        movie.name && movie.name.toLowerCase().includes(search.toLowerCase())
    );

    if (!isInitialized) {
        return (
            <main className="home-container">
                <p>Loading movies...</p>
            </main>
        );
    }

    return (
        <main className="home-container">
            <header className="home-header">
                <h1>Movie Collection Tracker</h1>
                <p>Search, collect, and manage your favorite movies</p>
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
                                    onClick={() => addMovieFromApi(movie)}
                                >
                                    Add
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <form className="movie-form" onSubmit={handleSubmit}>
                <h2>{movieToEdit ? 'Edit Movie' : 'Add Movie Manually'}</h2>
                <input
                    value={formName}
                    onChange={(event) => setFormName(event.target.value)}
                    placeholder="Movie name"
                    required
                    aria-label="Movie name"
                />
                <input
                    value={formGenre}
                    onChange={(event) => setFormGenre(event.target.value)}
                    placeholder="Genre"
                    required
                    aria-label="Genre"
                />
                <input
                    value={formRating}
                    onChange={(event) => setFormRating(event.target.value)}
                    placeholder="Rating"
                    required
                    aria-label="Rating"
                />
                <button type="submit">
                    {movieToEdit ? 'Save Changes' : 'Add Movie'}
                </button>
                {movieToEdit && (
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={cancelEdit}
                    >
                        Cancel
                    </button>
                )}
            </form>

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
                    <p className="empty-state">No saved movies found.</p>
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
                                    <p>Rating: {movie.rating || 'N/A'}</p>
                                </div>
                                <div className="movie-actions">
                                    <button
                                        type="button"
                                        onClick={() => editMovie(movie)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() => {
                                            if (window.confirm(`Delete "${movie.name}"?`)) {
                                                deleteMovie(movie.name);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
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