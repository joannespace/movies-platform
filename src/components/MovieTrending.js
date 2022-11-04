import { Grid, Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
// import useFetchProvider from "../hooks/useFetchProvider";
import MovieCard from "./MovieCard";

function MovieTrending({ trendings }) {
  const [pagination, setPagination] = useState({
    from: 0,
    to: 4,
  });

  const handlePageChange = (event, page) => {
    setPagination({
      ...pagination,
      from: Math.floor(page * 4 - 4),
      to: Math.floor(page * 4),
    });
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        TRENDING NOW
      </Typography>

      <Grid
        container
        sx={{
          p: 1,
          display: "flex",
          flexWrap: { xs: "wrap", md: "none" },
          justifyContent: "space-between",
        }}
      >
        {trendings.slice(pagination.from, pagination.to).map((movie) => {
          return (
            <Grid item key={movie.id} sx={{ p: "0px 10px" }} xs={6} md={3}>
              <MovieCard movie={movie} onChange={handlePageChange} />
            </Grid>
          );
        })}
      </Grid>

      <Pagination
        count={Math.ceil(trendings.length / 4)}
        color="primary"
        sx={{
          mt: 1,
          mb: 2,
          display: "flex",
          justifyContent: "center",
        }}
        onChange={handlePageChange}
      />
    </Box>
  );
}

export default MovieTrending;
