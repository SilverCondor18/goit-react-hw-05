import { useLocation, useParams, Link, Outlet } from "react-router-dom"
import css from "./MovieDetailsPage.module.css"
import { getMovieDetails, getImageUrl } from "../../tmdb-api";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieDetailsPage()
{
    const location = useLocation();
    const { movieId } = useParams();
    const [movie, setMovie] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getMovie = async () => {
            try {
                setLoading(true);
                setError(false);
                const currentMovie = await getMovieDetails(movieId);
                setMovie(currentMovie);
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
        getMovie();
    }, [movieId]);

    return (
        <>
            <ClipLoader loading={loading} />
            {error && <ErrorMessage />}
            {movie && <div className={css.movieContainer}>
                <Link to={location.state}><button className={css.back} type="button">← Go back</button></Link>
                <div className={css.movieInfo}>
                    <img className={css.poster} src={getImageUrl(movie.poster_path)} alt={movie.title} />
                    <div className={css.infoBlock}>
                        <h1 className={css.title}>{movie.title}</h1>
                        <p className={css.text}>User Score: {movie.vote_average * 10}%</p>
                        <h2 className={css.subtitle}>Overview</h2>
                        <p className={css.text}>{movie.overview}</p>
                        <h2 className={css.subtitle}>Genres</h2>
                        <p className={css.text}>{movie.genres.map(genre => genre.name).join(", ")}</p>
                    </div>
                </div>
                <p className={css.text}>Additional information</p>
                <ul className={css.links}>
                    <li><Link to="cast">Cast</Link></li>
                    <li><Link to="reviews">Reviews</Link></li>
                </ul>
                <Outlet />
            </div>}
        </>
    );
}