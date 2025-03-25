import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom"
import css from "./MovieReviews.module.css"
import { useEffect, useState } from "react";
import { getMovieReviews } from "../../tmdb-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage"

export default function MovieReviews()
{
    const { movieId } = useParams();
    const [reviews, setReviews] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getReviews = async (movieId) => {
            setLoading(true);
            setError(false);
            try {
                const movieReviews = await getMovieReviews(movieId);
                setReviews(movieReviews);
            }
            catch {
                setError(true);
            }
            finally {
                setLoading(false);
            }
        };
        getReviews(movieId);
    }, [movieId]);

    return (
        <>
            <ClipLoader loading={loading} />
            {error && <ErrorMessage />}
            {reviews?.results.length > 0 ? <ul className={css.reviews}>
                {reviews.results.map(review => (
                    <li key={review.id} className={css.review}>
                        <h3 className={css.author}>{review.author}</h3>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul> : <p>We don&apos;t have any reviews for this movie</p>}
        </>
    );
}