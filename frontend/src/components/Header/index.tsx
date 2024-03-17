"use client";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Box, Stack, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "../Search";

export const Header = () => {
  const [text, setText] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [isLoading, setIsLoading] = useState(true);
  const matches = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    window.location.replace(`/explorar?search=${text}`);
  };

  useEffect(() => {
    if (search) {
      setText(search);
    }
  }, []);

  return (
    <>
      {isLoading ? null : (
        <>
          {matches ? (
            <>
              <form onSubmit={handleSubmit}>
                <Box marginBottom={1} p={1.5} bgcolor={"white"}>
                  <Stack direction="row" spacing={27}>
                    <Box>
                      <Link href={"/feed"}>
                        <SportsEsportsIcon
                          sx={{
                            fontSize: 35,
                            color: "#7a32ff",
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                    </Box>
                    <Search setText={setText} text={text} />
                  </Stack>
                </Box>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <Box marginBottom={1} p={1.5} bgcolor={"white"}>
                  <Stack direction="row" spacing={2}>
                    <Box>
                      <Link href={"/feed"}>
                        <SportsEsportsIcon
                          sx={{
                            fontSize: 35,
                            color: "#7a32ff",
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                    </Box>
                    <Search setText={setText} text={text} />
                  </Stack>
                </Box>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
};
