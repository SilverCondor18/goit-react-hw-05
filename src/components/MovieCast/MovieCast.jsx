import { useParams } from "react-router-dom"
import css from "./MovieCast.module.css"
import { useEffect, useState } from "react";
import { getMovieCredits, getImageUrl } from "../../tmdb-api";
import { ClipLoader } from "react-spinners";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieCast()
{
    const { movieId } = useParams();
    const [cast, setCast] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCast = async movieId => {
            try {
                setLoading(true);
                setError(false);
                const movieCast = await getMovieCredits(movieId)
                setCast(movieCast.cast);
            }
            catch {
                setError(true);
            }
            finally {
                setLoading(false);
            }
        };
        getCast(movieId);
    }, [movieId]);

    return (
        <>
            <ClipLoader loading={loading} />
            {error && <ErrorMessage />}
            {cast && <ul className={css.casts}>
                {cast.map(actor => (
                    <li className={css.actor} key={actor.id}>
                        <img className={css.photo} src={getImageUrl(actor.profile_path)} alt={actor.name} />
                        <h3>{actor.name}</h3>
                        <p>Character name: {actor.character}</p>
                    </li>
                ))}
            </ul>}
        </>
    )
}