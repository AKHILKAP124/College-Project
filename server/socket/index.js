import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, 
    {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    }
);

// server.listen(3001, () => {
//   console.log("Socket server is running on port 3001");
// });

io.on("connection", (socket) => {
    
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export {app, server, io}
