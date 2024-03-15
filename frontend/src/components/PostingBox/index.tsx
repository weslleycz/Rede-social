import { UploadImg } from "@/components/UploadImg"; // Corrigindo o nome do componente
import { api } from "@/services/api";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";

export const PostingBox = () => {
  const [postContent, setPostContent] = useState("");
  const { refetch } = useQuery("getFeed");

  const [imageBase64, setImageBase64] = useState("");
  const [imageName, setImageName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageBase64(reader.result);
        setImageName(file.name);
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = async () => {
    if (postContent === "" && imageBase64 === "") {
      return;
    }
    try {
      setIsLoading(true);
      const res = await api.post("/post", {
        img: imageBase64,
        text: postContent,
      });
      setImageBase64("");
      setPostContent("");
      setImageName("");
      refetch();
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.response.status);
      setIsLoading(false);
    }
  };

  const handleCloseImg = () => {
    setImageBase64("");
    setImageName("");
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 1,
          marginBottom: 1,
          background: "#ffffff",
          borderRadius: 2,
        }}
      >
        <Box p={2}>
          <TextField
            multiline
            rows={1}
            fullWidth
            variant="standard"
            placeholder="Digite aqui..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
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
          <Box marginTop={1}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                {imageName !== "" ? (
                  <UploadImg
                    closeImg={handleCloseImg}
                    name={imageName}
                    url={imageBase64}
                  />
                ) : (
                  <>
                    <label htmlFor="image-upload">
                      <IconButton color="primary" component="span">
                        <PhotoLibraryIcon />
                      </IconButton>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </>
                )}
              </Grid>
              <Grid display={"flex"} justifyContent={"end"} item xs={4}>
                <LoadingButton
                  size="small"
                  loading={isLoading}
                  onClick={() => handlePostSubmit()}
                  variant="contained"
                >
                  Publicar
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
