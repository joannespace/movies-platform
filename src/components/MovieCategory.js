import { Button, Grid, InputBase, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieCategory({ categories, movies }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Stack>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          component="div"
          variant="h5"
          fontWeight="bold"
          mb={3}
          mt={3}
          mr={1}
        >
          CATEGORY
        </Typography>

        <Paper
          sx={{
            display: "flex",
            width: "30%",
            justifyContent: "flex-end",
            p: 0.3,
          }}
        >
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              fontSize: "14px",
            }}
            placeholder="Search"
            inputProps={{ "aria-label": "search movie" }}
            value={searchParams.get("query") || ""}
            onChange={(event) => {
              let query = event.target.value;
              if (query) {
                setSearchParams({ query });
              } else {
                setSearchParams({});
              }
            }}
          />
        </Paper>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }}>
        <Stack
          flexDirection={{ xs: "row", md: "column" }}
          flexWrap={{ xs: "wrap", md: "none" }}
          alignItems={{ xs: "space-between" }}
          spacing={1}
          mr={4}
        >
          <Button
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
              width: { xs: 0.3, md: 1 },
              bgcolor: "warning.main",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "secondary.main",
                color: "black",
              },
            }}
            onClick={() => setSearchParams({})}
          >
            Clear filter
          </Button>
          {categories.map((cat) => {
            return (
              <Button
                value={cat.id}
                key={cat.id}
                sx={{
                  justifyContent: { xs: "center", md: "flex-start" },
                  borderRadius: "5px",
                  cursor: "pointer",
                  textAlign: { xs: "center", md: "left" },
                  width: { xs: 0.3, md: 1 },
                }}
                onClick={(e) => {
                  let catId = JSON.parse(e.target.value);
                  console.log(catId);
                  if (catId) {
                    setSearchParams({ catId });
                  } else {
                    setSearchParams({});
                  }
                }}
              >
                {cat.name}
              </Button>
            );
          })}
        </Stack>

        <Grid container spacing={3}>
          {movies
            .filter((movie) => {
              let query = searchParams.get("query");
              let catId = searchParams.get("catId");

              if (!query && !catId) return true;

              if (query) {
                let movieName = movie.title || movie.name;
                return movieName.toLowerCase().startsWith(query.toLowerCase());
              }

              if (catId) {
                let movieId = movie["genre_ids"];
                return movieId.includes(JSON.parse(catId));
              } else {
                return true;
              }
            })
            .map((movie) => (
              <Grid item xs={6} md={4} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

export default MovieCategory;
