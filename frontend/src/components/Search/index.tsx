"use client";

import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField, useMediaQuery } from "@mui/material";

type Props = {
  text: string;
  setText: any;
};

export const Search = ({ text, setText }: Props) => {
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        InputProps={{
          endAdornment: (
            <>
              <IconButton type="submit">
                <SearchIcon color="primary" />
              </IconButton>
            </>
          ),
        }}
        sx={{
          width: matches ?  "63%" : "90%",
        }}
        size="small"
        label="Buscar..."
        id="fullWidth"
      />
    </>
  );
};
