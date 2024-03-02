import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";

import { User } from "../../../types/user";

type Props = {
  id: string;
  idUser: string;
  user: User | undefined;
};

export const UserProfile = ({ id, idUser, user }: Props) => {
  return (
    <Box
      paddingBottom={1}
      marginTop={1}
      sx={{
        background: "linear-gradient(to bottom, #4efda9 50%, #ffffff 50%)",
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
              <Avatar
                sx={{
                  width: 110,
                  height: 110,
                  fontSize: "50px",
                  borderRadius: "50%",
                  border: "4px solid #fff"
                }}
                alt={user?.name}
                src="/static/images/avatar/1.jpg"
              />
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
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            {idUser === id ? null : (
              <Box
                justifyContent="flex-end"
                display="flex"
                flexGrow={1}
                textAlign="center"
                height="60%"
                p={3}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<AddIcon />}
                >
                  Adicionar amigo
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
