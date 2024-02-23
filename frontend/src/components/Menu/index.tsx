import React from "react";
import { Box, Button, Grid } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import FeedIcon from "@mui/icons-material/Feed";
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import PersonIcon from '@mui/icons-material/Person';

export const Menu = () => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Box p={2} marginTop={3}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        style={{ textTransform: "none" }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <FeedIcon />
          </Grid>
          <Grid item>
            {capitalizeFirstLetter("feed")}
          </Grid>
        </Grid>
      </Button>
      <Box marginTop={1} />
      <Button
        fullWidth
        variant="text"
        color="primary"
        style={{ textTransform: "none" }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <PersonIcon />
          </Grid>
          <Grid item>
            {capitalizeFirstLetter("Perfil")}
          </Grid>
        </Grid>
      </Button>
      <Button
        fullWidth
        variant="text"
        color="primary"
        style={{ textTransform: "none" }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <InsertCommentIcon />
          </Grid>
          <Grid item>
            {capitalizeFirstLetter("Mensagens")}
          </Grid>
        </Grid>
      </Button>

      <Button
        fullWidth
        variant="text"
        color="primary"
        style={{ textTransform: "none" }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <ExploreIcon />
          </Grid>
          <Grid item>
            {capitalizeFirstLetter("explorar")}
          </Grid>
        </Grid>
      </Button>
    </Box>
  );
};
