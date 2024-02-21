import { UploadImg } from "@/components/UploadImg"; // Corrigindo o nome do componente
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";

export const PostingBox = () => {
  const [postContent, setPostContent] = useState("");

  const [imageBase64, setImageBase64] = useState("");
  const [imageName, setImageName] = useState("");

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

  const handlePostSubmit = () => {
    console.log(postContent);
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
            rows={2.5}
            fullWidth
            variant="outlined"
            placeholder="Digite aqui..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            InputProps={{
              endAdornment: (
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
              ),
              sx: {
                background: "#ffffff",
                "& .MuiOutlinedInput-root": {
                  border: "none",
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
                ) : null}
              </Grid>
              <Grid display={"flex"} justifyContent={"end"} item xs={4}>
                <Button onClick={() => handlePostSubmit()} variant="contained">
                  Publicar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
