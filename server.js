import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const url = process.env.NEXT_PUBLIC_API_URL;
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {

    socket.on("joinRoom", (room) => {
      console.log("joinRoom event received from:", socket.id, "for room:", room);
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
      socket.emit("roomJoined", room);
    });

    socket.on("chat:message", ({ room, message, username }) => {
      console.log(`Message in room [${room}] from ${username}: ${message}`);
      socket.to(room).emit("chat:message", { username, message });
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});