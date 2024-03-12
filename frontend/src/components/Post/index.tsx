import { Box, Paper, Stack } from "@mui/material";
import { UserAvatar } from "../UserAvatar";
import styles from "./style.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import Link from "next/link";

type Props = {
  id: string;
  refetch: any;
  content: string;
  urlImg: string;
  links: string[];
  comments: any[];
  userId: string;
  createDate: string;
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
  createDate,
}: Props) => {
  const [liked, setLiked] = useState<string[]>([]);
  const handleLiked = async () => {
    try {
      const res = await api.get(`/post/link/${id}`);
      setLiked([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLiked([...links]);
  }, []);
  return (
    <>
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
          <Link href={`/perfil/${userId}`}>
            <UserAvatar {...user} />
          </Link>
          <Box>
            <strong className={styles["post-title"]}>{user?.name}</strong>
            <p className={styles["post-data"]}>
              {" "}
              {formatDistanceToNow(createDate, {
                addSuffix: true,
                locale: ptBR,
              }).toString()}
            </p>
          </Box>
        </Stack>
        <Box className={styles["post-text"]}>
          <p>{content}</p>
        </Box>
        {urlImg != null ? (
          <Box className={styles["post-img"]} marginTop={2}>
            <img
              width={"auto"}
              height={450}
              src={`${process.env.API_Url}/post/img${urlImg}`}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "450px",
                objectFit: "cover",
              }}
            />
          </Box>
        ) : null}
        <Box display={"flex"} marginTop={2}>
          <Box marginRight={2} display={"flex"}>
            {liked.indexOf(getCookie("id") as string) !== -1 ? (
              <FavoriteIcon
                onClick={() => handleLiked()}
                sx={{ color: "#DC4A6E", cursor: "pointer" }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => handleLiked()}
                sx={{ color: "gray", cursor: "pointer" }}
              />
            )}
            <p className={styles["footer-text"]}>{liked.length} Likes</p>
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
