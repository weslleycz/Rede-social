import { Avatar, Box, Paper, Stack } from "@mui/material";
import { INotifications } from "../../../types/notifications";
import styles from "./style.module.scss";
import Link from "next/link";
import { api } from "@/services/api";

export const Notification = ({
  text,
  matadados,
  postId,
  id,
}: INotifications) => {
  const handDeleteNotification = async (id: string) => {
    console.log(id);
    try {
      await api.delete(`/notifications/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link
        href={
          postId != null
            ? `/post/${postId}`
            : `/perfil/${JSON.parse(matadados).userId}`
        }
      >
        <Box onClick={() => handDeleteNotification(id)}>
          <Paper
            sx={{
              background: "#ffffff",
              padding: 2,
              margin: "10px 0",
              zIndex: -10,
            }}
            elevation={0}
          >
            <Stack direction="row" spacing={2}>
              <Box>
                <Link href={`/perfil/${JSON.parse(matadados).userId}`}>
                  <Avatar
                    src={
                      process.env.API_Url +
                      "/user/avatar/" +
                      JSON.parse(matadados).userId
                    }
                  />
                </Link>
              </Box>
              <Box>
                <Stack spacing={1}>
                  <Box>
                    <Link href={`/perfil/${JSON.parse(matadados).userId}`}>
                      <strong className={styles["post-title"]}>
                        {JSON.parse(matadados).name}
                      </strong>
                    </Link>
                  </Box>
                  <p className={styles["post-text"]}>{text}</p>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Link>
    </>
  );
};
