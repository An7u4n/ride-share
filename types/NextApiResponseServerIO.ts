// apps/web/types/next.d.ts

import { Server as HTTPServer } from "http";
import { NextApiResponse } from "next";
import { Socket as IOSocket, Server as IOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      io: IOServer;
    };
  };
};