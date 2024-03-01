import { getCookie } from "cookies-next";
import io from "socket.io-client";

const socket = io(process.env.API_Url as string, {
  withCredentials: false,
  transports: ["websocket"],
  auth: {
    token: getCookie("token"),
  },
});

export { socket };
