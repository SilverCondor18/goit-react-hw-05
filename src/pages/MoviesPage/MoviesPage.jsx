import { searchMovies } from "../../tmdb-api"
import SearchBox from "../../components/SearchBox/SearchBox"
import MovieList from "../../components/MovieList/MovieList"
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MoviesPage()
{
    const [query, setQuery] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const getMovies = async (search) => {
            try {
                setLoading(true);
                setError(false);
                const movies = await searchMovies(search);
                setMovies(movies.results);
            }
            catch
            {
                setError(true);
            }
            finally
            {
                setLoading(false);
            }
        }
        const search = query?.get("query");
        if (search) {
            getMovies(search);
        }
    }, [query]);

    const onMovieSearch = search => {
        const newQuery = new URLSearchParams(query);
        newQuery.set("query", search);
        setQuery(newQuery);
    };
    const hasMovies = movies.length > 0;
    return (
        <>
            <SearchBox onSearch={onMovieSearch} />
            <ClipLoader loading={loading} />
            {error && <ErrorMessage />}
            {hasMovies && <MovieList movies={movies} />}
        </>
    )
}