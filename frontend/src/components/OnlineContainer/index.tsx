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

    // Emitir evento onlineCheck ao montar o componente
    socketInstancia.emit(`onlineCheck`, {
      clientId: getCookie("token") as string,
    });

    // Lidar com o evento onlineCheck
    const handleOnlineCheck = (data: any) => {
      // Faça algo com os dados, se necessário
    };

    // Assinar o evento onlineCheck
    socketInstancia.on("onlineCheck", handleOnlineCheck);

    // Limpar a assinatura ao desmontar o componente
    return () => {
      socketInstancia.off("onlineCheck", handleOnlineCheck);
    };
  }, []); // A dependência vazia indica que este efeito só é executado uma vez na montagem do componente

  return <>{children}</>;
};
