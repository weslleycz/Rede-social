"use client";

import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import { Post } from "@/components/Post";
import { PostingBox } from "@/components/PostingBox";
import { Box, Container, Grid,  Paper } from "@mui/material";
import { useEffect, useState } from "react";

const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const items = ["Item 1", "Item 2"];

  return (
    <>
      <Box style={{ background: "#EBEBEB", padding: 2 }}>
        <Header />
        {isLoading ? null : (
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
              <Container maxWidth="md">
                <PostingBox />

                <Box
                  sx={{
                    borderRadius: 0,
                    background: "#EBEBEB",
                    height: "80vh",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 0,
                      background: "#EBEBEB",
                      position: "relative",
                      zIndex: 1,
                      overflowY: "auto",
                      maxHeight: "80vh",
                      "::-webkit-scrollbar": {
                        backgroundColor: "#ff00000",
                      },
                    }}
                  >
                    <Box marginBottom={14}>
                      {items.map((item, i) => (
                        <div key={i}>
                          <Post />
                        </div>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Container>
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
      </Box>
    </>
  );
};

export default Feed;
