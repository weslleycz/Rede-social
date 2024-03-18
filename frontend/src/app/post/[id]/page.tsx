"use client";

import { Box, Container, Skeleton } from "@mui/material";
import { FeedContainer } from "../../../components/FeedContainer";
import { useQuery } from "react-query";
import { api } from "@/services/api";
import { IPost } from "../../../../types/post";
import { Post } from "@/components/Post";
import { Comments } from "@/components/Comments";

const PostPag = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, isError, refetch } = useQuery(
    "getPost",
    async (): Promise<IPost> => {
      const res = await api.get(`/post/select/${params.id}`);
      return res.data as IPost;
    }
  );
  return (
    <>
      <FeedContainer>
        <Container maxWidth="lg">
          <Box p={1}>
            <Box
              sx={{
                borderRadius: 0,
                background: "#EBEBEB",
                height: "100vh",
              }}
            >
              <Box
                sx={{
                  borderRadius: 0,
                  background: "#EBEBEB",
                  position: "relative",
                  zIndex: 1,
                  overflowY: "auto",
                  maxHeight: "100vh",
                  "scrollbar-width": "none",
                  "::-webkit-scrollbar": {
                    backgroundColor: "#ff00000",
                  },
                }}
              >
                <Box marginBottom={25}>
                  {isLoading ? (
                    <>
                      <Skeleton variant="rounded" width={"100%"} height={100} />
                    </>
                  ) : (
                    <>
                      <Post
                        key={data?.id}
                        comments={data?.comments as any[]}
                        content={data?.content as string}
                        id={data?.id as string}
                        links={data?.links as string[]}
                        createDate={data?.createDate as string}
                        refetch={refetch}
                        urlImg={data?.urlImg as string}
                        user={data?.user as { name: string; id: string }}
                        userId={data?.user.id as string}
                      />
                      <Comments postId={params.id} />
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </FeedContainer>
    </>
  );
};

export default PostPag;
