import { useState, useEffect } from 'react';
import { searchMovies, getGenres, POSTER_BASE_URL } from '../config/api';
import '../styles/Dashboard.css';

function AnimePage() {
    const [anime, setAnime] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const [searchResults, genresList] = await Promise.all([
                searchMovies('anime'),
                getGenres()
            ]);

            const animeContent = searchResults.slice(0, 12);

            setAnime(animeContent);
            setGenres(genresList);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    const getGenreNames = (genreIds = []) => {
        return genreIds
            .map((id) => genres.find((g) => g.id === id)?.name)
            .filter(Boolean)
            .join(', ') || 'Anime';
    };

    return (<main className="dashboard-container">
        <div className="dashboard-header">
            <h1> Anime </h1> <p> Discover popular anime titles from around the world </p>
        </div>

        {isLoading ? (<div className="loading">
            <div className="spinner">
            </div>
            <p> Loading anime... </p>
        </div>) : anime.length === 0 ? (
            <div className="empty-state">
                <p> No anime content found </p>
            </div>
        ) : (<div className="dashboard-grid" >
            {anime.map((animeItem) => (<div key={animeItem.id}
                className="dashboard-card" > {animeItem.poster_path ? (<img src={`${POSTER_BASE_URL}${animeItem.poster_path}`}
                    alt={animeItem.title}
                    className="movie-poster" />
                ) : (<div className="poster-placeholder" > No Image </div>)}
                <div className="card-content" >
                    <h3> {animeItem.title || animeItem.name} </h3>
                    <div className="card-meta" >
                        <span className="rating" > {animeItem.vote_average?.toFixed(1) || 'N/A'} /10
                        </span>
                        <span className="year" > {animeItem.release_date?.split('-')[0] || 'N/A'} </span> </div>
                    <p className="genre" > {getGenreNames(animeItem.genre_ids)} </p>
                    <p className="overview" > {animeItem.overview?.substring(0, 120) || 'No description available.'} </p>
                </div>   </div>
            ))
            }
        </div>
        )
        }
    </main>
    );
}

export default AnimePage;