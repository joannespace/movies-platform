import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, Link as RouterLink, useParams } from "react-router-dom";

import useInitialize from "../hooks/useInitialize";

function MovieDetails() {
  const { fetchData } = useInitialize();
  const allMovies = [...fetchData.movies, ...fetchData.trendings];
  const categories = fetchData.categories;

  const params = useParams();
  const movieId = params.id;

  return (
    <>
      <Stack sx={{ minHeight: "100vh" }} mt={2} spacing={1}>
        <div
          role="presentation"
          onClick={(e) => {
            e.preventDefault();
            console.log("You clicked a breadcrumb");
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="none"
              color="primary"
              component={RouterLink}
              to="/"
            >
              Home
            </Link>

            <Typography color="primary">MoviePage</Typography>
          </Breadcrumbs>
        </div>

        {allMovies
          .filter((movie) => {
            return movie.id === Number(movieId);
          })
          .map((movie) => {
            return (
              <Stack
                spacing={2}
                direction={{ xs: "column", md: "row" }}
                sx={{
                  alignItems: { xs: "center" },
                  p: 2,
                }}
                key={movie.id}
              >
                <Box
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  sx={{
                    height: { xs: "250px", md: "350px" },
                    borderRadius: "5px",
                  }}
                />
                <Stack spacing={1.5}>
                  <Typography variant="h5" sx={{ fontWeight: "bolder" }}>
                    {movie.title || movie.name}
                  </Typography>

                  <Typography variant="h7" sx={{ fontWeight: "400" }}>
                    Release year: {movie.release_date.slice(0, 4)}
                  </Typography>

                  <Typography variant="h7" sx={{ fontWeight: "400" }}>
                    Genres:{" "}
                    {movie.genre_ids
                      .map((item) => {
                        return categories.find((cat) => cat.id === item).name;
                      })
                      .join(", ")}
                  </Typography>

                  <Typography variant="h7" sx={{ fontWeight: "400" }}>
                    Vote average: {movie.vote_average}{" "}
                  </Typography>

                  <Typography variant="h7" sx={{ fontWeight: "400" }}>
                    Overview: {movie.overview}{" "}
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
      </Stack>
    </>
  );
}

export default MovieDetails;
