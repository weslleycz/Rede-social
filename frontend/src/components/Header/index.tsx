import { Box } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <Box marginBottom={1} p={1} bgcolor={"white"}>
        <Link href={"/feed"}>
          <SportsEsportsIcon
            sx={{ fontSize: 35, color: "#1aff90", cursor: "pointer" }}
          />
        </Link>
      </Box>
    </>
  );
};
