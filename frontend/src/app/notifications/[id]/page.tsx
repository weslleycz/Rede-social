"use client";

import { FeedContainer } from "@/components/FeedContainer";
import { Notification } from "@/components/Notification";
import { api } from "@/services/api";
import { Box, Container } from "@mui/material";
import { useQuery } from "react-query";
import { INotifications } from "../../../../types/notifications";

const Notifications = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, isError, refetch } = useQuery(
    "getNotifications",
    async () => {
      const res = await api.get(`/notifications/${params.id}}`);
      return res.data as INotifications[];
    }
  );
  return (
    <>
      <FeedContainer>
        <Container maxWidth="md">
          <Box
            sx={{
              borderRadius: 0,
              background: "#EBEBEB",
              height: "100vh",
            }}
            p={1}
          >
            <Box
              sx={{
                borderRadius: 0,
                background: "#EBEBEB",
                position: "relative",
                zIndex: 1,
                overflowY: "auto",
                maxHeight: "100vh",
                "::-webkit-scrollbar": {
                  backgroundColor: "#ff00000",
                },
              }}
            >
              <h1 style={{ fontWeight: 900, color: "#7a32ff" }}>
                Notificações
              </h1>
              {data?.map((notification, index) => {
                return (
                  <>
                    <Notification {...notification} key={index} />
                  </>
                );
              })}
            </Box>
          </Box>
        </Container>
      </FeedContainer>
    </>
  );
};

export default Notifications;
