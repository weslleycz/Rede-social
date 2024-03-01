import { Box, Grid, Avatar, Typography, Stack, Button } from "@mui/material";

export const UserProfile = () => {
  return (
    <Box marginTop={2} p={2} bgcolor="#ffffff">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box display="flex" justifyContent="center">
            <Avatar
              sx={{
                width: 150,
                height: 150,
                fontSize:"50px"
              }}
              alt="User Avatar"
              src="/static/images/avatar/1.jpg"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box marginTop={2}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Francisco Weslley
            </Typography>
          </Box>
          <Box marginTop={2} >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                200
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Amigos
              </Typography>
            </Box>
            <Box flexGrow={1} textAlign="center">
              <Button variant="contained" color="primary">
                Adicionar amigo
              </Button>
            </Box>
          </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

