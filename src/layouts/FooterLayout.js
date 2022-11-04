import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

function FooterLayout() {
  return (
    <Stack>
      <Box minWidth="100vh" height={30} />
      <Typography sx={{ m: "auto" }}>
        Copyright @ Joannespace in 2022
      </Typography>
    </Stack>
  );
}

export default FooterLayout;
