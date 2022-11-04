import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Face4Icon from "@mui/icons-material/Face4";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import useInitialize from "../hooks/useInitialize";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";

const settings = ["Favorites", "Logout"];

export default function NavBar() {
  const { isLoggedIn, logout, username, open, setOpen } = useInitialize();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOutBtn = async () => {
    logout();
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <Face4Icon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MovieSpace
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {!isLoggedIn ? (
              <Button color="inherit" onClick={() => setOpen(true)}>
                Login
              </Button>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{ mr: "10px", color: "white" }}
                    >
                      {username}
                    </Typography>
                    <Avatar alt={username} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "25px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseNavMenu}>
                      {setting === "Logout" ? (
                        <Button onClick={handleLogOutBtn}>{setting}</Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setAnchorElUser(null);
                            navigate("favorite");
                          }}
                        >
                          {setting}
                        </Button>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>

          <LoginForm open={open} setOpen={setOpen} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
