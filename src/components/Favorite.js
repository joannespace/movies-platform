import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import useInitialize from "../hooks/useInitialize";
import MovieCard from "./MovieCard";

function Favorite() {
  const { favorite } = useInitialize();
  console.log(favorite);

  return (
    <Stack direction="column" sx={{ minHeight: "100vh", mt: 2 }}>
      <Box>
        <Typography variant="h5">Favorite Movies</Typography>
      </Box>
      <Grid container>
        {favorite.map((movie) => (
          <Grid item key={movie.id} xs={6} md={3}>
            <MovieCard movie={movie}></MovieCard>
          </Grid>
        ))}
      </Grid>

      {favorite.length !== 0 ? (
        <div></div>
      ) : (
        <Box mt={3}>
          <Typography>There's no favorite movie yet.</Typography>
        </Box>
      )}
    </Stack>
  );
}

export default Favorite;
