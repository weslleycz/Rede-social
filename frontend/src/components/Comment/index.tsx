import { Box, Divider, Link, Paper, Stack } from "@mui/material";
import { IComment } from "../../../types/comment";
import { UserAvatar } from "../UserAvatar";
import styles from "./style.module.scss";

type Props = IComment;

export const Comment = ({ id, postId, text, user, userId }: Props) => {
  return (
    <>
      <Paper elevation={0} sx={{ p: 2, marginTop: 2, zIndex: -10 }}>
        <Stack direction="row" spacing={2}>
          <Link href={`/perfil/${userId}`}>
            <UserAvatar {...user} />
          </Link>
          <Box>
            <strong>{user?.name}</strong>
          </Box>
        </Stack>
        <Box className={styles["post-text"]} marginTop={1.5}>
          <p>{text}</p>
        </Box>
      </Paper>
    </>
  );
};
