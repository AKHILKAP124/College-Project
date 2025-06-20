import { io } from "socket.io-client";

const socket = io("https://infra-backend-one.vercel.app", {
  withCredentials: true,
});

export default socket;
