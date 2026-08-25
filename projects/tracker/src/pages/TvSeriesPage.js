import React, { useEffect, useState } from 'react';
import { getGenres, getTvSeries, POSTER_BASE_URL } from '../config/api';
import '../styles/Dashboard.css';

function TvSeriesPage() {
    const [series, setSeries] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => { Promise.all([getTvSeries(), getGenres()]).then(([items, genreList]) => { setSeries(items.slice(0, 12)); setGenres(genreList); }).finally(() => setIsLoading(false)); }, []);
    const genreNames = (ids = []) => ids.map((id) => genres.find((genre) => genre.id === id)?.name).filter(Boolean).join(', ') || 'N/A';
    const card = (item) => React.createElement('div', { key: item.id, className: 'dashboard-card' }, item.poster_path ? React.createElement('img', { src: `${POSTER_BASE_URL}${item.poster_path}`, alt: item.name, className: 'movie-poster' }) : React.createElement('div', { className: 'poster-placeholder' }, 'No Image'), React.createElement('div', { className: 'card-content' }, React.createElement('h3', null, item.name), React.createElement('div', { className: 'card-meta' }, React.createElement('span', { className: 'rating' }, `⭐ ${item.vote_average?.toFixed(1) || 'N/A'}/10`), React.createElement('span', { className: 'year' }, item.first_air_date?.split('-')[0] || 'N/A')), React.createElement('p', { className: 'genre' }, genreNames(item.genre_ids)), React.createElement('p', { className: 'overview' }, item.overview?.substring(0, 120) || 'No description available.')));
    return React.createElement('main', { className: 'dashboard-container' }, React.createElement('div', { className: 'dashboard-header' }, React.createElement('h1', null, 'Popular TV Series'), React.createElement('p', null, 'Explore trending TV series from around the world')), isLoading ? React.createElement('div', { className: 'loading' }, React.createElement('div', { className: 'spinner' }), React.createElement('p', null, 'Loading TV series...')) : React.createElement('div', { className: 'dashboard-grid' }, series.map(card)));
}
export default TvSeriesPage;
