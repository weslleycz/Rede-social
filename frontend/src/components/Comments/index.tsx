import { api } from "@/services/api";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { IComment } from "../../../types/comment";
import { Comment } from "../Comment";

type Props = {
  postId: string;
};

export const Comments = ({ postId }: Props) => {
  const [commentContent, setCommentContent] = useState("");

  const { data, isLoading, isError, refetch } = useQuery(
    "getComments",
    async () => {
      const res = await api.get(`/post/comments/${postId}`);
      return res.data as IComment[];
    }
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api.post(`/post/addComment/${postId}`, {
      text: commentContent,
    });
    setCommentContent("");
    refetch();
  };

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
        <Typography sx={{ fontWeight: "500" }} variant="body1" gutterBottom>
          Comentários
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            multiline
            rows={1}
            fullWidth
            variant="standard"
            placeholder="Digite o seu comentário..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: {
                background: "#ffffff",
                "& .MuiOutlinedInput-root": {
                  border: "none",
                },
                "& .MuiInput-underline:before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "none",
                },
              },
            }}
          />
          <Box justifyContent={"end"} display={"flex"}>
            <Button type="submit" variant="contained">
              Publicar
            </Button>
          </Box>
        </form>
      </Paper>

      {data?.map((comment,index) => (
          <>
            <Comment {...comment} key={index} />
          </>
        ))}
    </>
  );
};
