import React from "react";
import { Avatar, Typography, Box, Divider, Badge } from "@mui/material";

type Props = {
  avatar: string;
  title: string;
  subtitle?: string;
  isOnline?: boolean;
};

export const Friend = ({ avatar, title, subtitle, isOnline }: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 1.5,
          bgcolor: "#f9f2ff",
          boxShadow: "0 0 2px rgba(0, 0, 0, 0.1)",
          marginBottom: 0.5,
          position: "relative",
        }}
      >
        <Box marginRight={2}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: isOnline ? "#4caf50" : "#bdbdbd",
                    border: "2px solid #fff",
                  }}
                />
              </>
            }
          >
            <Avatar
              src={process.env.API_Url + "/user/avatar/" + avatar}
              sx={{ border: "2px solid #ba98fa" }}
            />
          </Badge>
        </Box>

        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: 16 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#999" }}>
            {subtitle ? subtitle : "No subtitle provided"}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
