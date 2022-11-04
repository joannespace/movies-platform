import React from "react";
import useInitialize from "../hooks/useInitialize";
import MovieTrending from "../components/MovieTrending";
import MovieCategory from "../components/MovieCategory";
import { Divider } from "@mui/material";

function HomePage() {
  const { fetchData } = useInitialize();
  const { trendings, categories, movies } = fetchData;

  return (
    <>
      <MovieTrending trendings={trendings} />
      <Divider />
      <MovieCategory categories={categories} movies={movies} />
    </>
  );
}

export default HomePage;
