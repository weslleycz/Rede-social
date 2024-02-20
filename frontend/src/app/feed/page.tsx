import { Grid, Paper } from "@mui/material";

const Feed = () => {
  return (
    <>
      <Grid container>
        <Grid height={"100vh"} xs>
          <Paper sx={{ height: "100vh" }} elevation={0}>
            1
          </Paper>
        </Grid>
        <Grid height={"100vh"} xs={8}>
          <Paper sx={{ height: "100vh" }} elevation={3}>
            1
          </Paper>
        </Grid>
        <Grid height={"100vh"} xs>
          <Paper sx={{ height: "100vh" }} elevation={0}>
            1
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Feed;
