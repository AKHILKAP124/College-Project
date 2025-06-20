import { io } from "socket.io-client";

const socket = io("https://infra-backend-lx4a.onrender.com", {
  withCredentials: true,
});

export default socket;
