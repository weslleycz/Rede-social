import {
  Avatar,
  Badge,
  Box,
  Grid,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import { useState } from "react";
import { User } from "../../../types/user";
import { AddFriend } from "../AddFriend";
import { getCookie } from "cookies-next";

type Props = {
  id: string;
  idUser: string;
  user: User | undefined;
};

export const UserProfile = ({ id, idUser, user }: Props) => {
  const [imageBase64, setImageBase64] = useState("");
  const [imageName, setImageName] = useState("");

  const handleImageUpload = (e) => {
    console.log(124453);

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
  return (
    <Box
      paddingBottom={1}
      marginTop={1}
      sx={{
        background: "linear-gradient(to bottom, #7a32ff 50%, #ffffff 50%)",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box
            alignContent={"center"}
            textAlign="center"
            display="flex"
            justifyContent="center"
          >
            <Stack alignItems="center" spacing={2}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <>
                    {getCookie("id") === id ? (
                      <>
                        <label htmlFor="image-upload">
                          <PhotoCameraIcon
                            sx={{ cursor: "pointer", color: "gray" }}
                          />
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleImageUpload}
                        />
                      </>
                    ) : (
                      <FiberManualRecordIcon
                        sx={{
                          color:
                            user?.status === "Online" ? "#33ff00" : "#dddddd",
                          borderRadius: "50%",
                          margin: 0,
                        }}
                      />
                    )}
                  </>
                }
              >
                <Avatar
                  sx={{
                    width: 110,
                    height: 110,
                    fontSize: "50px",
                    borderRadius: "50%",
                    border: "4px solid #fff",
                  }}
                  alt={user?.name}
                  src={imageBase64}
                />
              </Badge>

              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {user?.name}
              </Typography>
              <Box>
                <Box
                  alignItems={"center"}
                  textAlign={"center"}
                  display={"flex"}
                >
                  <Typography variant="inherit" color="textSecondary">
                    {user?.friends.length} Amigos
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box
            display="flex"
            justifyContent="flex-end"
            marginTop={2}
            marginRight={4}
          >
            <AddFriend user={user} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
