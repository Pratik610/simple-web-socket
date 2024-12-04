import express from "express";
import { WebSocketServer,WebSocket } from "ws";

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(socket) {
  socket.on("error", console.error);

  socket.on("message", function message(data,isBinary) {
    wss.clients.forEach(function each(clinet) {
      if (clinet.readyState === WebSocket.OPEN) {
        clinet.send(data,{binary:isBinary});
      }
    });
  });

  socket.send("Hello World From Server");
});
 