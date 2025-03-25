import css from "./HomePage.module.css";
import { getTrendingMovies } from "../../tmdb-api";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { ClipLoader } from "react-spinners";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function HomePage()
{
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const getMovies = async () => {
            try {
                setError(false);
                setLoading(true);
                const trendingMovies = await getTrendingMovies();
                setMovies(trendingMovies.results);
            }
            catch
            {
                setError(true);
            }
            finally
            {
                setLoading(false);
            }
        };
        getMovies();
    }, []);

    return (
        <>
            <h1 className={css.header}>Trending movies</h1>
            <ClipLoader loading={loading} />
            {error && <ErrorMessage />}
            <MovieList movies={movies} />
        </>
    );
}