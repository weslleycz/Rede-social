import { Box } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

export const Header = () => {
  return (
    <>
      <Box marginBottom={1} p={1} bgcolor={"white"}>
        <SportsEsportsIcon sx={{ fontSize: 35, color:"#1aff90" }} />
      </Box>
    </>
  );
};
