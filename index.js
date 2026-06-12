const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let numerosSorteados = [];

io.on("connection", (socket) => {
  console.log(`[Nova Conexão] ID: ${socket.id}`);
  socket.emit("estado_atual", numerosSorteados);
  socket.on("cantar_numero", (numero) => {
    if (!numerosSorteados.includes(numero)) {
      numerosSorteados.push(numero);
      console.log(
        `Número cantado: ${numero} | Total chamados: ${numerosSorteados.length}`,
      );
      io.emit("numero_cantado", numero);
    }
  });

  socket.on("reiniciar_bingo", () => {
    numerosSorteados = [];
    console.log("--- O bingo foi reiniciado ---");
    io.emit("bingo_reiniciado");
  });

  socket.on("disconnect", () => {
    console.log(`[Desconectado] ID: ${socket.id}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor do Bingo rodando lisinho na porta ${PORT}\n`);
});
