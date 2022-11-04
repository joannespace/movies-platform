import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Stack } from "@mui/system";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useInitialize from "../hooks/useInitialize";
import { Box, Dialog } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function MovieCard({ movie }) {
  const { id, title, name, poster_path, overview } = movie;
  const navigate = useNavigate();

  const location = useLocation();

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const { addFavorite, isLoggedIn, setOpen, removeFavorite } = useInitialize();

  const [openPUF, setOpenPUF] = useState(false);

  const handleLikeBtn = async () => {
    if (isLoggedIn) {
      addFavorite(movie);
      return setOpenPUF(true);
    } else {
      setOpen(true);
    }
  };

  const handleDelBtn = async () => {
    removeFavorite(movie);
  };

  return (
    <Card sx={{ m: 1 }}>
      <Stack
        position="relative"
        display="flex"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        sx={{
          border: "1px solid black",
          boxShadow: "0px 1px 1.5px 1px grey",
        }}
      >
        <CardMedia
          component="img"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title || name}
        />

        {isHovering && (
          <Stack
            position="absolute"
            sx={{
              background: "grey",
              opacity: 0.9,
              m: 0,
            }}
            justifyContent="space-between"
            height={1}
            spacing={1}
          >
            <Box
              onClick={handleClick}
              sx={{ height: 0.7, justifyContent: "space-between" }}
            >
              <CardContent sx={{}}>
                <Typography variant="h10" fontSize="15px" fontWeight="bold">
                  {title || name}
                </Typography>
              </CardContent>

              <CardContent>
                <Typography
                  variant="body2"
                  fontSize="12px"
                  color="text.secondary"
                >
                  {overview.split(" ").slice(0, 18).join(" ")}...
                </Typography>
              </CardContent>
            </Box>

            {location.pathname === "/favorite" ? (
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <IconButton
                  component="div"
                  color="primary"
                  aria-label="add to favorites"
                  size="12px"
                  onClick={handleDelBtn}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            ) : (
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <IconButton
                  component="div"
                  color="primary"
                  aria-label="add to favorites"
                  size="12px"
                  onClick={handleLikeBtn}
                >
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            )}
          </Stack>
        )}

        <Dialog
          open={openPUF}
          onClose={() => setOpenPUF(false)}
          fullWidth
          maxWidth="xs"
        >
          <Stack spacing={2} sx={{ m: 3 }}>
            Movie {title || name} was added to
            <Link to="favorite">Favorite Link</Link>
          </Stack>
        </Dialog>
      </Stack>
    </Card>
  );
}

export default MovieCard;
