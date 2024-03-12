"use client";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FeedIcon from "@mui/icons-material/Feed";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Grid } from "@mui/material";
import { getCookie, deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const pathname = usePathname();

  const handleExit = () => {
    deleteCookie("id");
    deleteCookie("token");
    deleteCookie("clintSession");
    window.location.href = "/";
  };

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
          variant={
            pathname === `/perfil/${getCookie("id")}` ? "contained" : "text"
          }
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

      <Box marginTop={1} />
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

      <Box marginTop={1} />

      <Button
        fullWidth
        variant={"text"}
        color="primary"
        style={{ textTransform: "none" }}
        onClick={() => handleExit()}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <ExitToAppIcon />
          </Grid>
          <Grid item>{capitalizeFirstLetter("Perfil")}</Grid>
        </Grid>
      </Button>
    </Box>
  );
};
