import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import FooterLayout from "./FooterLayout";
import HeaderLayout from "./HeaderLayout";

function MainLayout({ children }) {
  return (
    <Grid container minHeight="100vh" minWidth="100vh">
      <Grid item xs={12}>
        <HeaderLayout />
      </Grid>

      <Grid item xs={12} sx={{ m: 2 }}>
        <Container>
          <Outlet />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <FooterLayout />
      </Grid>
    </Grid>
  );
}

export default MainLayout;
