import { Box, Paper, Stack } from "@mui/material";
import { UserAvatar } from "../UserAvatar";
import styles from "./style.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export const Post = () => {
  return (
    <>
      {" "}
      <Paper
        sx={{
          background: "#ffffff",
          padding: 2,
          margin: "10px 0",
        }}
        elevation={0}
      >
        <Stack direction="row" spacing={2}>
          <UserAvatar />
          <Box>
            <strong className={styles["post-title"]}>Fracisco Weslley</strong>
            <p className={styles["post-data"]}>23/11/2024</p>
          </Box>
        </Stack>
        <Box className={styles["post-text"]}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            provident odit doloremque modi quam. Voluptas illum, repudiandae, ut
            tenetur, aliquam mollitia et nam magni id quidem corporis fugit quam
            error!
          </p>
        </Box>
        <Box className={styles["post-img"]} marginTop={2}>
          <img
            width={"auto"}
            height={390}
            src="https://files.tecnoblog.net/wp-content/uploads/2021/03/Como-jogar-god-of-war-001.jpg"
          />
        </Box>
        <Box display={"flex"} marginTop={2}>
          <Box marginRight={2} display={"flex"}>
            <FavoriteBorderIcon sx={{ color: "gray" }} />
            <p className={styles['footer-text']}>50 Likes</p>
          </Box>
          <Box display={"flex"}>
            <ChatBubbleOutlineIcon sx={{ color: "gray" }} />
            <p className={styles['footer-text']}>50 Comentários</p>
          </Box>
        </Box>
      </Paper>
    </>
  );
};
