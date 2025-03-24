import { useLocation, useParams } from "react-router-dom"
import css from "./MovieDetailsPage.module.css"
import { getMovieDetails } from "../../tmdb-api";
import { useEffect, useState } from "react";
export default function MovieDetailsPage()
{
    const location = useLocation();
    const { movieId } = useParams();
    const [movie, setMovie] = useState();
    useEffect(() => {
        const getMovie = async () => {
            const movie = await getMovieDetails(movieId);
            setMovie(movie);
        };
        getMovie();
    }, [movieId]);

}