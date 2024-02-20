"use client";
import { ThemeProvider } from "@mui/material";
import styles from "./style.module.scss";

import { Box } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { theme, themeDark } from "@/theme";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const updateTheme = (event: any) => {
      setIsDarkMode(event.matches);
    };

    darkModeMediaQuery.addListener(updateTheme);

    updateTheme(darkModeMediaQuery);

    return () => {
      darkModeMediaQuery.removeListener(updateTheme);
    };
  }, []);
  return (
    <>
      <ThemeProvider theme={isDarkMode ? themeDark : theme}>
        <Box className={isDarkMode ? styles.dark : styles.light}>
          {children}
        </Box>
      </ThemeProvider>
    </>
  );
};
