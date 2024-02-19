"use client";
import styles from "./style.module.scss";

import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  useEffect(() => {}, []);
  return (
    <>
      <Box className={styles.light}>{children}</Box>
    </>
  );
};
