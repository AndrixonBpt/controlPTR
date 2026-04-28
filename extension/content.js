console.log("Canva Remote Control: Content script inyectado correctamente");

// Conectar al servidor local (localhost evita bloqueos de seguridad en Canva)
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log("Canva Remote Control: Conectado al servidor WebSocket en localhost:3000");
});

socket.on('execute_command', (command) => {
  console.log("Canva Remote Control: Comando recibido ->", command);
  
  if (command === 'next' || command === 'prev') {
    const key = command === 'next' ? 'ArrowRight' : 'ArrowLeft';
    const keyCode = command === 'next' ? 39 : 37;

    // Canva generalmente escucha los eventos de teclado en el body o en el elemento activo
    const target = document.activeElement || document.body;

    // Crear eventos de teclado simulando presionar y soltar la tecla
    const keydownEvent = new KeyboardEvent('keydown', {
      key: key,
      code: key,
      keyCode: keyCode,
      which: keyCode,
      bubbles: true,
      cancelable: true
    });
    
    const keyupEvent = new KeyboardEvent('keyup', {
      key: key,
      code: key,
      keyCode: keyCode,
      which: keyCode,
      bubbles: true,
      cancelable: true
    });

    // Despachar los eventos
    target.dispatchEvent(keydownEvent);
    target.dispatchEvent(keyupEvent);
    
    console.log(`Canva Remote Control: Evento de teclado '${key}' despachado en`, target);
  }
});

socket.on('disconnect', () => {
  console.log("Canva Remote Control: Desconectado del servidor WebSocket");
});
