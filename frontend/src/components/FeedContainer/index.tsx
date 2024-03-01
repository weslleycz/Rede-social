"use client";

import { ReactNode, useEffect, useState } from "react";

import { Menu } from "@/components/Menu";
import { Post } from "@/components/Post";
import { PostingBox } from "@/components/PostingBox";
import { Box, Container, Grid } from "@mui/material";

type Props = {
  children: ReactNode;
};

export const FeedContainer = ({ children }: Props) => {
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoadingFeed(false);
    }, 100);
    return () => clearTimeout(loadingTimeout);
  }, []);
  return (
    <>
      {isLoadingFeed ? null : (
        <Grid container>
          <Grid item xs>
            <Box
              sx={{
                height: "70vh",
                borderRadius: 0,
                background: "#ffffff",
                display: "flex",
                position: "sticky",
                top: 0,
              }}
            >
              <Menu />
            </Box>
          </Grid>

          <Grid item xs={8}>
            {children}
          </Grid>

          <Grid item xs>
            {/* <Box
                sx={{
                  height: "85vh",
                  borderRadius: 0,
                  background: "#ffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "sticky",
                  top: 0,
                }}
              ></Box> */}
          </Grid>
        </Grid>
      )}
    </>
  );
};


