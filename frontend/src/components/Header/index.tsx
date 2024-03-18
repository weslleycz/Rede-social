/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Avatar, Badge, Box, Stack, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "../Search";
import { socket } from "@/services/socket";
import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import { api } from "@/services/api";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

export const Header = () => {
  const [text, setText] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [isLoading, setIsLoading] = useState(true);
  const matches = useMediaQuery("(min-width:900px)");

  const { data, isError, refetch } = useQuery("getNotifications", async () => {
    const res = await api.get(`/notifications/${getCookie("id")}`);
    return res.data as any[];
  });

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const socketInstancia = socket;
    socketInstancia.emit(`notifications`, {
      clientId: getCookie("id") as string,
    });
    return () => {
      socketInstancia.off("notifications", () => {});
    };
  }, []);

  useEffect(() => {
    const socketInstancia = socket;

    socketInstancia.on(`notification.${getCookie("id")}`, (data) => {
      refetch();
    });

    return () => {
      socketInstancia.off(`notification.${getCookie("id")}`);
    };
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
                    <Box paddingRight={3} width={85}>
                      <Stack
                        alignItems={"center"}
                        display={"flex"}
                        direction="row"
                        spacing={2}
                      >
                         <Link href={`/notifications/${getCookie("id")}`}>
                         <Badge badgeContent={data?.length} color="primary">
                          <NotificationsIcon color="action" />
                        </Badge>
                         </Link>
                        <Avatar
                          src={
                            process.env.API_Url +
                            "/user/avatar/" +
                            getCookie("id")
                          }
                        />
                      </Stack>
                    </Box>
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
                    <Box p={1}>
                    <Link href={`/notifications/${getCookie("id")}`}>
                    <Badge badgeContent={data?.length} color="primary">
                        <NotificationsIcon color="action" />
                      </Badge>
                    </Link>
                    </Box>
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
