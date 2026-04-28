const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Habilitar CORS para las rutas de Express
app.use(cors());

const os = require('os');

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Servir archivos estáticos del cliente móvil
app.use(express.static(path.join(__dirname, '../mobile-client')));

// Endpoint para que la extensión obtenga la IP
app.get('/api/ip', (req, res) => {
  res.json({ ip: getLocalIpAddress(), port: 3000 });
});

// Configurar Socket.io con CORS para permitir conexiones desde cualquier origen
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);

  // Escuchar el evento 'send_command' del móvil
  socket.on('send_command', (command) => {
    console.log(`Comando recibido de ${socket.id}:`, command);
    
    // Retransmitir a todos los clientes conectados (incluida la extensión)
    io.emit('execute_command', command);
  });

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});



const PORT = 3000;
server.listen(PORT, () => {
  const ip = getLocalIpAddress();
  console.log(`\n======================================================`);
  console.log(`✅ Servidor en ejecución!`);
  console.log(`💻 Local: http://localhost:${PORT}`);
  console.log(`📱 En tu móvil (Copia este enlace para WhatsApp):`);
  console.log(`👉 http://${ip}:${PORT}`);
  console.log(`======================================================\n`);
});
