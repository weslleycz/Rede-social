"use client";

import React from "react";
import { Box, Button, Grid } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import FeedIcon from "@mui/icons-material/Feed";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const pathname = usePathname();

  return (
    <Box p={2} marginTop={3}>
      <Link href={"/feed"}>
        <Button
          fullWidth
          variant={pathname === "/feed" ? "contained" : "text"}
          color="primary"
          style={{ textTransform: "none" }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <FeedIcon />
            </Grid>
            <Grid item>{capitalizeFirstLetter("feed")}</Grid>
          </Grid>
        </Button>
      </Link>

      <Box marginTop={1} />
      <Link href={`/perfil/${getCookie("id")}`}>
        <Button
          fullWidth
          variant={pathname === `/perfil/${getCookie("id")}` ? "contained" : "text"}
          color="primary"
          style={{ textTransform: "none" }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <PersonIcon />
            </Grid>
            <Grid item>{capitalizeFirstLetter("Perfil")}</Grid>
          </Grid>
        </Button>
      </Link>

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
          <Grid item>{capitalizeFirstLetter("Mensagens")}</Grid>
        </Grid>
      </Button>

    </Box>
  );
};
