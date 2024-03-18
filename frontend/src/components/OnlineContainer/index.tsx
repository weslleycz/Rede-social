"use client";

import { socket } from "@/services/socket";
import { getCookie } from "cookies-next";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export const OnlineContainer = ({ children }: Props) => {
  useEffect(() => {
    const socketInstancia = socket;

    socketInstancia.emit(`onlineCheck`, {
      clientId: getCookie("token") as string,
    });

    const handleOnlineCheck = (data: any) => {
    };

    socketInstancia.on("onlineCheck", handleOnlineCheck);

    return () => {
      socketInstancia.off("onlineCheck", handleOnlineCheck);
    };
  }, []);

  return <>{children}</>;
};
