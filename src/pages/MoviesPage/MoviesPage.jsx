import { searchMovies } from "../../tmdb-api"
import SearchBox from "../../components/SearchBox/SearchBox"
import MovieList from "../../components/MovieList/MovieList"
import { useState, useEffect } from "react";
export default function MoviesPage()
{
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
        const getMovies = async (search) => {
            const movies = await searchMovies(search);
            setMovies(movies.results);
        }
        if (query !== "") {
            getMovies(query);
        }
    }, [query]);

    const onMovieSearch = search => {
        setQuery(search);
    };
    const hasMovies = movies.length > 0;
    return (
        <>
            <SearchBox onSearch={onMovieSearch} />
            {hasMovies && <MovieList movies={movies} />}
        </>
    )
}