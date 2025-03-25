import { ClipLoader } from 'react-spinners';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';
import css from "./App.module.css"
import MovieReviews from '../MovieReviews/MovieReviews';
import MovieCast from '../MovieCast/MovieCast';

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));

export default function App() {
  return (
    <>
      <NavMenu />
      <div className={css.page}>
        <Suspense fallback={<ClipLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="reviews" element={<MovieReviews />} />
              <Route path="cast" element={<MovieCast />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}