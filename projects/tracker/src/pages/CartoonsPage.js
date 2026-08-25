import React, { useEffect, useState } from 'react';
import { getGenres, POSTER_BASE_URL, searchMovies } from '../config/api';
import '../styles/Dashboard.css';

function CartoonsPage() {
    const [cartoons, setCartoons] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([searchMovies('animated'), getGenres()]).then(([results, genreList]) => {
            setCartoons(results.filter((movie) => (movie.genre_ids || []).includes(16)).slice(0, 12));
            setGenres(genreList);
        }).finally(() => setIsLoading(false));
    }, []);

    const genreNames = (ids = []) => ids.map((id) => genres.find((genre) => genre.id === id)?.name).filter(Boolean).join(', ') || 'Animation';
    const card = (movie) => React.createElement('div', { key: movie.id, className: 'dashboard-card' },
        movie.poster_path ? React.createElement('img', { src: `${POSTER_BASE_URL}${movie.poster_path}`, alt: movie.title, className: 'movie-poster' }) : React.createElement('div', { className: 'poster-placeholder' }, 'No Image'),
        React.createElement('div', { className: 'card-content' },
            React.createElement('h3', null, movie.title || movie.name),
            React.createElement('div', { className: 'card-meta' }, React.createElement('span', { className: 'rating' }, `⭐ ${movie.vote_average?.toFixed(1) || 'N/A'}/10`), React.createElement('span', { className: 'year' }, movie.release_date?.split('-')[0] || 'N/A')),
            React.createElement('p', { className: 'genre' }, genreNames(movie.genre_ids)),
            React.createElement('p', { className: 'overview' }, movie.overview?.substring(0, 120) || 'No description available.')));

    return React.createElement('main', { className: 'dashboard-container' },
        React.createElement('div', { className: 'dashboard-header' }, React.createElement('h1', null, 'Cartoons & Animated Movies'), React.createElement('p', null, 'Explore animated films and cartoons for all ages')),
        isLoading ? React.createElement('div', { className: 'loading' }, React.createElement('div', { className: 'spinner' }), React.createElement('p', null, 'Loading cartoons...')) : React.createElement('div', { className: 'dashboard-grid' }, cartoons.map(card)));
}

export default CartoonsPage;
