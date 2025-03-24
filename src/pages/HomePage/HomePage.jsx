import css from "./HomePage.module.css";
import { getTrendingMovies } from "../../tmdb-api";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage()
{
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            const trendingMovies = await getTrendingMovies();
            setMovies(trendingMovies.results);
        };
        getMovies();
    }, []);

    return (
        <>
            <h1 className={css.header}>Trending movies</h1>
            <MovieList movies={movies} />
        </>
    );
}