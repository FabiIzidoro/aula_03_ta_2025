const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));

// Carregar escudos
const escudos = JSON.parse(fs.readFileSync('./escudos.json', 'utf-8'));

let jogadores = {}; 
let escudoAtual = null;

// Enviar escudo aleatório a cada N segundos
function enviarNovoEscudo() {
    escudoAtual = escudos[Math.floor(Math.random() * escudos.length)];
    io.emit("novoEscudo", escudoAtual);
}

setInterval(enviarNovoEscudo, 10000); // a cada 10s
enviarNovoEscudo();

// Normalizar string
function normalizar(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

// Conexão de jogador
io.on("connection", (socket) => {
    console.log("Novo jogador conectado:", socket.id);

    jogadores[socket.id] = { pontos: 0 };

    io.emit("ranking", jogadores);

    socket.on("resposta", (respostaDoJogador) => {
        if (!escudoAtual) return;

        const resposta = normalizar(respostaDoJogador);

        const nomeCorreto = normalizar(escudoAtual.nome);
        const alternativas = escudoAtual.alternativas.map(a => normalizar(a));

        const acertou =
            resposta === nomeCorreto ||
            alternativas.includes(resposta);

        if (acertou) {
            jogadores[socket.id].pontos++;
            io.emit("ranking", jogadores);
        }
    });

    socket.on("disconnect", () => {
        delete jogadores[socket.id];
        io.emit("ranking", jogadores);
        console.log("Jogador desconectado:", socket.id);
    });
});

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
