const { Server } = require("socket.io");
const bingoLogic = require("./bingoLogic");

function inicializarSockets(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`[Nova Conexão] ID: ${socket.id}`);

    // Envia o estado atual ao conectar
    socket.emit("estado_atual", bingoLogic.obterEstadoAtual());

    // Processa a tentativa de cantar um número
    socket.on("cantar_numero", (numero) => {
      const resultado = bingoLogic.processarNumero(numero);

      if (resultado.erro) {
        return socket.emit("erro_validacao", resultado.erro);
      }

      console.log(`Sucesso: Número ${resultado.numero} validado e cantado!`);
      io.emit("numero_cantado", resultado.numero);
    });

    // Processa o reinício do jogo
    socket.on("reiniciar_bingo", () => {
      bingoLogic.reiniciarJogo();
      console.log("--- O bingo foi reiniciado ---");
      io.emit("bingo_reiniciado");
    });

    socket.on("disconnect", () => {
      console.log(`[Desconectado] ID: ${socket.id}`);
    });
  });

  return io;
}

module.exports = { inicializarSockets };
