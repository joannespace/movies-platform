import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthRequire from "../context/AuthRequire";
import MainLayout from "../layouts/MainLayout";
import FavoritePage from "../pages/FavoritePage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MovieDetails from "../pages/MovieDetails";
import NoMatch from "../pages/NoMatch";

function Router() {
  let location = useLocation();
  let state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NoMatch />} />
          <Route
            path="favorite"
            element={
              <AuthRequire>
                <FavoritePage />
              </AuthRequire>
            }
          />
        </Route>
      </Routes>

      {/* {state?.backgroundLocation && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )} */}
    </>
  );
}

export default Router;
