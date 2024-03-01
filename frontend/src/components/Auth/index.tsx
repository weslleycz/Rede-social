"use client";

import { Box, Container, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import { Login } from "../Login";
import { useEffect, useState } from "react";
import { Register } from "../Register";

export const Auth = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <>
      {isLoading ? null : (
        <>
          {matches ? (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{background: "#ffff", paddingTop:1}}
            >
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                height={"100vh"}
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
                  {isRegister ? (
                    <Register setIsRegister={setIsRegister} />
                  ) : (
                    <Login setIsRegister={setIsRegister} />
                  )}
                </Container>
              </Grid>
            </Grid>
          ) : (
            <Box height={"100vh"} bgcolor={"#ffff"}>
              <Box
                alignContent={"center"}
                bgcolor={"#1aff90"}
                alignItems={"center"}
                justifyContent={"center"}
                display={"flex"}
                p={2}
              >
                <Image
                  src="/controller.png"
                  width={100}
                  height={100}
                  alt="Controller"
                />
              </Box>
              <Container
                sx={{
                  height: "20vh",
                  alignItems: "center",
                  display: "flex",
                }}
                maxWidth="sm"
              >
                {isRegister ? (
                  <Register setIsRegister={setIsRegister} />
                ) : (
                  <Login setIsRegister={setIsRegister} />
                )}
              </Container>
            </Box>
          )}
        </>
      )}
    </>
  );
};
