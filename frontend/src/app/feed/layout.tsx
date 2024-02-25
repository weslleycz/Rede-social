import type { Metadata } from "next";
import { Header } from "../../components/Header";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Feed",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Box style={{ background: "#EBEBEB", padding: 2 }}>
        <Header />
        {children}
      </Box>
    </>
  );
}
