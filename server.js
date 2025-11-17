// server.js - Painel em tempo real com Socket.IO
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// quando quiser, podemos usar um Set para controlar sockets conectados
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // cliente pede para entrar numa room
  socket.on('joinRoom', (room) => {
    // sair de outras rooms (exceto da "room pessoal" que é socket.id)
    for (let r of socket.rooms) {
      if (r !== socket.id) socket.leave(r);
    }
    if (room) {
      socket.join(room);
      console.log(`Socket ${socket.id} entrou na room ${room}`);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('Cliente desconectado:', socket.id, 'motivo:', reason);
  });
});

// função que calcula estatísticas de rooms e usuários
function computeStats() {
  const socketsMap = io.sockets.sockets; // Map id -> Socket
  const rooms = io.sockets.adapter.rooms; // Map roomName -> Set(socketIds)

  const roomCounts = {};
  for (let [roomName, sids] of rooms) {
    // ignorar rooms pessoais (cada socket possui uma room com o próprio id)
    if (socketsMap.has(roomName)) continue;
    roomCounts[roomName] = sids.size;
  }

  const totalUsers = socketsMap.size;

  // encontrar room mais popular
  let popularRoom = null;
  let maxCount = 0;
  for (let [r, c] of Object.entries(roomCounts)) {
    if (c > maxCount) {
      maxCount = c;
      popularRoom = r;
    }
  }

  // montar ranking (ordenado desc)
  const ranking = Object.entries(roomCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([room, count]) => ({ room, count }));

  return {
    totalUsers,
    popularRoom,
    maxCount,
    ranking
  };
}

// emitir estatísticas a cada 1 segundo
setInterval(() => {
  const stats = computeStats();
  io.emit('dashboardStats', stats);
}, 1000);

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
