import { Box, Paper, Stack } from "@mui/material";
import { UserAvatar } from "../UserAvatar";
import styles from "./style.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

type Props = {
  id: string;
  content: string;
  urlImg: string;
  links: string[];
  comments: any[];
  userId: string;
  user: {
    name: string;
    id: string;
  };
};

export const Post = ({
  comments,
  content,
  id,
  links,
  urlImg,
  userId,
  user,
}: Props) => {
  return (
    <>
      <Paper
        sx={{
          background: "#ffffff",
          padding: 2,
          margin: "10px 0",
        }}
        elevation={0}
      >
        <Stack direction="row" spacing={2}>
          <UserAvatar {...user} />
          <Box>
            <strong className={styles["post-title"]}>Fracisco Weslley</strong>
            <p className={styles["post-data"]}>23/11/2024</p>
          </Box>
        </Stack>
        <Box className={styles["post-text"]}>
          <p>{content}</p>
        </Box>
        <Box className={styles["post-img"]} marginTop={2}>
          <img
            width={"auto"}
            height={390}
            src={`${process.env.API_Url}/post/img${urlImg}`}
          />
        </Box>
        <Box display={"flex"} marginTop={2}>
          <Box marginRight={2} display={"flex"}>
            <FavoriteBorderIcon sx={{ color: "gray" }} />
            <p className={styles["footer-text"]}>{links.length} Likes</p>
          </Box>
          <Box display={"flex"}>
            <ChatBubbleOutlineIcon sx={{ color: "gray" }} />
            <p className={styles["footer-text"]}>
              {comments.length} Comentários
            </p>
          </Box>
        </Box>
      </Paper>
    </>
  );
};
