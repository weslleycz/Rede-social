import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton } from "@mui/material";

type Props = {
  url: string;
  name: string;
  closeImg: () => void;
};

export const UploadImg = ({ name, url,closeImg }: Props) => {
  return (
    <>
      <Box
        style={{
          alignItems: "center",
          textAlign: "center",
          width: "40%",
          justifyContent: "space-between",
          background: "#41f79f",
          color: "#ffffff",
        }}
        display={"flex"}
      >
        <img width={30} height={30} src={url} />
        <Box>{name}</Box>
        <Box>
          <IconButton onClick={()=>closeImg()}>
            <CancelIcon sx={{ fontSize: "15px", color: "white" }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
