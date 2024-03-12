import { Box, Grid, Link, Paper } from "@mui/material";
import { User } from "../../../types/user";
import { AddFriend } from "../AddFriend";
import { UserAvatar } from "../UserAvatar";

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
              <AddFriend user={user} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
