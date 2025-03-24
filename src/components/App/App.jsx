import ClipLoader from 'react-spinners/ClipLoader'

import { useState, useEffect, Suspense, lazy } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';
import css from "./App.module.css"

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));

export default function App() {
  return (
    <>
      <NavMenu />
      <div className={css.page}>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}