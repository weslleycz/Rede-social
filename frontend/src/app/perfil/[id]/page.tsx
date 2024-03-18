"use client";

import { FeedContainer } from "@/components/FeedContainer";
import { UserProfile } from "@/components/UserPerfil";
import { api } from "@/services/api";
import { Box } from "@mui/material";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { User } from "../../../../types/user";
import { PerfilPost } from "@/components/PerfilPost";

const Perfil = ({ params }: { params: { id: string } }) => {
  const [idUser, setIdUser] = useState("");
  useEffect(() => {
    setIdUser(getCookie("id") as string);
  }, []);

  const { data, isLoading, isError, refetch } = useQuery(
    "getPerfil",
    async (): Promise<User> => {
      const res = await api.get(`/user/select/${params.id}`);
      return res.data as User;
    }
  );

  return (
    <>
      <FeedContainer>
        <Box p={1}>
          <Box
            sx={{
              borderRadius: 0,
              background: "#ffffff0",
              position: "relative",
              zIndex: 1,
              overflowY: "auto",
              maxHeight: "100vh",
              "scrollbar-width": "none",
              "::-webkit-scrollbar": {
                width: "0.4em",
                backgroundColor: "transparent", 
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent",
              },
            }}
          >
            <UserProfile user={data} idUser={idUser} id={params.id} />
            <PerfilPost id={params.id} />
          </Box>
        </Box>
      </FeedContainer>
    </>
  );
};

export default Perfil;
