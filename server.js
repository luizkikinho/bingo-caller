const express = require("express");
const http = require("http");
const { inicializarSockets } = require("./src/socket");

const app = express();
const server = http.createServer(app);

// Acopla a lógica de WebSockets ao servidor HTTP
inicializarSockets(server);

const PORT = 3000;
server.listen(3000, "0.0.0.0", () => {
  console.log("🎲 Servidor rodando na porta 3000");
});
