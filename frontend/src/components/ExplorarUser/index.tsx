import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid, Link, Paper } from "@mui/material";
import { User } from "../../../types/user";
import { UserAvatar } from "../UserAvatar";
import { getCookie } from "cookies-next";
import CloseIcon from "@mui/icons-material/Close";

export const ExplorarUser = (user: User) => {
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
        <Grid container spacing={3}>
          <Grid item xs={0.7} md={0.7}>
            <Box>
              <Link href={`/perfil/${user.id}`}>
                <UserAvatar {...user} />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={9} md={11}>
            <Box justifyContent={"space-between"} display={"flex"}>
              <Link href={`/perfil/${user.id}`}>{user.name}</Link>
              {user.friends.indexOf(getCookie("id")) === -1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<AddIcon />}
                >
                  Adicionar amigo
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  startIcon={<CloseIcon />}
                >
                  Cancelar amizade
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
