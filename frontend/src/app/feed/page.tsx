"use client";

import { PostingBox } from "@/components/PostingBox";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Box, Container, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";

const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
  ];

  return (
    <>
      <Box style={{ background: "#EBEBEB", padding: 2 }}>
        {isLoading ? null : (
          <Grid container>
            <Grid item xs>
              <Box
                sx={{
                  height: "85vh",
                  borderRadius: 0,
                  background: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  position: "sticky",
                  top: 0,
                }}
              >
                <SportsEsportsIcon color="primary" sx={{ fontSize: 60 }} />
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
                    <Box marginBottom={10}>
                      {items.map((item, i) => (
                        <Paper
                          key={i}
                          sx={{
                            background: "#ffffff",
                            padding: 2,
                            margin: "10px 0",
                          }}
                          elevation={0}
                        >
                          {item}
                        </Paper>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Grid>

            <Grid item xs>
              <Box
                sx={{
                  height: "100vh",
                  borderRadius: 0,
                  background: "#ffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "sticky",
                  top: 0,
                }}
              ></Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Feed;
