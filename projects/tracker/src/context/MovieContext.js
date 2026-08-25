import { createContext, useCallback, useEffect, useState } from 'react';

export const MovieContext = createContext(null);

const STORAGE_KEY = 'movieTrackerMovies';

export function MovieProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const savedMovies = localStorage.getItem(STORAGE_KEY);
            if (savedMovies) {
                const parsedMovies = JSON.parse(savedMovies);
                if (Array.isArray(parsedMovies)) {
                    setMovies(parsedMovies);
                }
            }
        } catch (error) {
            console.error('Error loading movies from localStorage:', error);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
        }
    }, [movies, isInitialized]);

    const addMovie = useCallback((newMovie) => {
        const alreadyExists = movies.some(
            (movie) => movie.name.toLowerCase() === newMovie.name.toLowerCase()
        );

        if (alreadyExists) {
            alert('That movie cannot be assigned twice.');
            return false;
        }

        setMovies((currentMovies) => [...currentMovies, newMovie]);
        return true;
    }, [movies]);

    const deleteMovie = useCallback((movieName) => {
        setMovies((currentMovies) =>
            currentMovies.filter((movie) => movie.name !== movieName)
        );
    }, []);

    const updateMovie = useCallback((movieName, updatedMovie) => {
        const alreadyExists = movies.some(
            (movie) =>
                movie.name.toLowerCase() === updatedMovie.name.toLowerCase() &&
                movie.name !== movieName
        );

        if (alreadyExists) {
            alert('That movie cannot be assigned twice.');
            return false;
        }

        setMovies((currentMovies) =>
            currentMovies.map((movie) =>
                movie.name === movieName ? { ...movie, ...updatedMovie } : movie
            )
        );
        return true;
    }, [movies]);

    return (<MovieContext.Provider value={
            { movies, isInitialized, addMovie, deleteMovie, updateMovie }}>
        {children} </MovieContext.Provider>
        );
}