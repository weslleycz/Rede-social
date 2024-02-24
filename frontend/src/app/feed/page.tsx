"use client";

import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import { Post } from "@/components/Post";
import { PostingBox } from "@/components/PostingBox";
import { api } from "@/services/api";
import { socket } from "@/services/socket";
import { Box, Container, Grid, Paper } from "@mui/material";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Feed = () => {
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);

  const { data, isLoading, isError } = useQuery("getFeed", async () => {
    const res = await api.get("/post/feed");
    console.log(res.data);
    return res.data;
  });

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoadingFeed(false);
    }, 100);
    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    socket.emit(`feed`, {
      clientId: getCookie("token") as string,
    });
    socket.on("feed", (data: any) => {
      console.log(data);
    });
  }, []);

  return (
    <>
      <Box style={{ background: "#EBEBEB", padding: 2 }}>
        <Header />
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
                      {data.map((item, i) => (
                        <div key={i}>
                          <Post {...item} />
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
