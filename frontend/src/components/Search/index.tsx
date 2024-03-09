"use client";

import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField } from "@mui/material";

type Props = {
  text: string;
  setText: any;
};

export const Search = ({ text, setText }: Props) => {
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
          width: "63%",
        }}
        size="small"
        label="Buscar..."
        id="fullWidth"
      />
    </>
  );
};
