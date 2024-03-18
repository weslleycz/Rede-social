"use client";
import { ThemeProvider } from "@mui/material";
import styles from "./style.module.scss";

import { theme } from "@/theme";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider, } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box className={styles.light}>
          {children}
        </Box>
      </ThemeProvider>
      <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};
