# Canva Remote Control - Extensión

Esta extensión te permite controlar las diapositivas de Canva usando eventos de teclado simulados a través de un servidor WebSocket local.

## Cómo instalarla en Google Chrome (Modo Local)

1. Abre Google Chrome y navega a la URL: `chrome://extensions/`
2. En la esquina superior derecha, activa el **Modo de desarrollador** (Developer mode).
3. Aparecerán tres botones nuevos en la parte superior izquierda. Haz clic en **Cargar descomprimida** (Load unpacked).
4. Selecciona esta carpeta (`extension`) que contiene el archivo `manifest.json`.
5. ¡Listo! La extensión debería aparecer en tu lista de extensiones instaladas.

## Funcionamiento

La extensión se inyectará automáticamente cada vez que visites una URL que coincida con `*://*.canva.com/*`. 
Al inyectarse, intentará conectarse a un servidor local corriendo en `http://localhost:3000`.

Asegúrate de que el servidor Node.js (Fase 1) esté en ejecución para que la extensión pueda conectarse y recibir los comandos.
