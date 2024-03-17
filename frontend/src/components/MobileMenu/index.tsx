import { Box, IconButton } from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";
import PersonIcon from "@mui/icons-material/Person";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";

export const MobileMenu = () => {
  const pathname = usePathname();
  const handleExit = () => {
    deleteCookie("id");
    deleteCookie("token");
    deleteCookie("clintSession");
    window.location.href = "/";
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        padding: "3%",
        zIndex: 100,
        borderTop: "4px solid #11010114",
        bgcolor: "#ffffff",
        display: "flex",
        justifyContent: "space-around",
        borderRadius: "10px 10px 0 0",
      }}
    >
      <Link href={"/feed"}>
        <IconButton
          sx={{
            fontSize: "28px",
            color: pathname === "/feed" ? "#7a32ff" : "",
          }}
        >
          <FeedIcon />
        </IconButton>
      </Link>
      <Link href={`/perfil/${getCookie("id")}`}>
        <IconButton
          sx={{
            fontSize: "28px",
            color: pathname === `/perfil/${getCookie("id")}` ? "#7a32ff" : "",
          }}
        >
          <PersonIcon />
        </IconButton>
      </Link>
      <IconButton
        sx={{
          fontSize: "28px",
          color: pathname === "/mensagens" ? "#7a32ff" : "",
        }}
      >
        <InsertCommentIcon />
      </IconButton>
      <IconButton onClick={() => handleExit()} sx={{ fontSize: "28px" }}>
        <ExitToAppIcon />
      </IconButton>
    </Box>
  );
};
