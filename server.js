const express = require("express");
const http = require("http");
const { inicializarSockets } = require("./src/socket");

const app = express();
const server = http.createServer(app);

// Acopla a lógica de WebSockets ao servidor HTTP
inicializarSockets(server);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🎲 Servidor rodando na porta ${PORT}`);
});
