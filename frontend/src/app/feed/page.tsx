"use client";

import { FeedContainer } from "@/components/FeedContainer";
import { Post } from "@/components/Post";
import { PostingBox } from "@/components/PostingBox";
import { api } from "@/services/api";
import { socket } from "@/services/socket";
import { Box, Container, Skeleton } from "@mui/material";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { useQuery } from "react-query";

const Feed = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "getFeed",
    async () => {
      const res = await api.get("/post/feed");
      return res.data;
    }
  );

  useEffect(() => {
    const socketInstancia = socket;
    socketInstancia.emit(`feed`, {
      clientId: getCookie("token") as string,
    });

    socketInstancia.on("feed", (data: any) => {
      refetch();
    });

    return () => {
      socketInstancia.off("feed", (data: any) => {});
    };
  }, []);

  return (
    <>
      <FeedContainer>
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
                {isLoading ? (
                  <>
                    <Skeleton variant="rounded" width={"100%"} height={100} />
                    <Skeleton
                      variant="rounded"
                      sx={{ marginTop: 1 }}
                      width={"100%"}
                      height={100}
                    />
                    <Skeleton
                      variant="rounded"
                      sx={{ marginTop: 1 }}
                      width={"100%"}
                      height={100}
                    />
                    <Skeleton
                      variant="rounded"
                      sx={{ marginTop: 1 }}
                      width={"100%"}
                      height={100}
                    />
                  </>
                ) : (
                  <>
                    {data.map((item: any, i: number) => (
                      <div key={i}>
                        <Post {...item} />
                      </div>
                    ))}
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </FeedContainer>
    </>
  );
};

export default Feed;
