import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Avatar, Badge, Box, Grid, Stack, Typography } from "@mui/material";

import { getCookie } from "cookies-next";
import { useState } from "react";
import { User } from "../../../types/user";
import { AddFriend } from "../AddFriend";
import { api } from "@/services/api";

type Props = {
  id: string;
  idUser: string;
  user: User | undefined;
};

export const UserProfile = ({ id, idUser, user }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async() => {
       await handlePostSubmit(reader.result)
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = async (img:string) => {
    try {
      setIsLoading(true);
      await api.put(`/user/upload/${id}`, {
        img,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
                            sx={{ cursor: "pointer", color: "#7876ff" }}
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
                    border: "4px solid #ffffff",
                  }}
                  alt={user?.name}
                  src={
                    isLoading
                      ? "https://i.pinimg.com/originals/7e/fc/2c/7efc2cb33ee4eb9d7625ca1eca702506.gif"
                      : process.env.API_Url + "/user/avatar/" + id
                  }
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
