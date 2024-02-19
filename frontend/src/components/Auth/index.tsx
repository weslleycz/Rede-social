"use client";

import { Container, Grid } from "@mui/material";
import { theme } from "../../theme";
import Image from "next/image";
import { useState } from "react";
import { Login } from "../Login";

export const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          height={"101vh"}
          bgcolor={"#1aff90"}
          item
          xs={6}
        >
          <Image
            src="/controller.png"
            width={400}
            height={400}
            alt="Controller"
          />
        </Grid>
        <Grid item xs={6}>
          <Container
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
            component="main"
            maxWidth="xs"
          >
            <Login />
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
