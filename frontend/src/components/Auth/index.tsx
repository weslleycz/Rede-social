"use client";

import { Box, Container, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import { Login } from "../Login";
import { useEffect, useState } from "react";
import { Register } from "../Register";

export const Auth = () => {
  const matches = useMediaQuery("(min-width:900px)");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const renderContent = () => (
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
  );

  return (
    <>
      {isLoading ? null : (
        <>
          {matches ? (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ background: "#ffff", paddingTop: 1 }}
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
                {renderContent()}
              </Grid>
            </Grid>
          ) : (
            <Box height={"100vh"} bgcolor={"#ffff"}>
              {renderContent()}
            </Box>
          )}
        </>
      )}
    </>
  );
};
