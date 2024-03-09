"use client";

import { ExplorarUser } from "@/components/ExplorarUser";
import { FeedContainer } from "@/components/FeedContainer";
import { api } from "@/services/api";
import { Box, Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { User } from "../../../types/user";

const Explorar = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data, isLoading, isError, refetch } = useQuery(
    "getUsers",
    async () => {
      const res = await api.get(`/user/search/${search}`);
      return res.data as User[];
    }
  );
  return (
    <>
      <FeedContainer>
        <Container maxWidth="md">
          <Box
            sx={{
              borderRadius: 0,
              position: "relative",
              zIndex: 1,
              overflowY: "auto",
              maxHeight: "100vh",
              "::-webkit-scrollbar": {
                backgroundColor: "#ff00000",
              },
            }}
          >
            {isLoading ? (
              <></>
            ) : (
              <>
                {data?.map((user) => (
                  <ExplorarUser {...user} key={user.id} />
                ))}
              </>
            )}
          </Box>
        </Container>
      </FeedContainer>
    </>
  );
};

export default Explorar;
