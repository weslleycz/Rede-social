"use client";
import { ThemeProvider } from "@mui/material";
import styles from "./style.module.scss";

import { theme } from "@/theme";
import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box className={styles.light}>
          {children}
        </Box>
      </ThemeProvider>

    </>
  );
};
