
// WebSocket server for Yjs collaboration
// Run this with: node websocket-server.js

const WebSocket = require('ws');
const http = require('http');
const { setupWSConnection } = require('y-websocket/bin/utils');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  setupWSConnection(ws, req);
});

const port = process.env.PORT || 1234;
server.listen(port, () => {
  console.log(`WebSocket server running on port ${port}`);
  console.log(`Connect to: ws://localhost:${port}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down WebSocket server...');
  wss.close(() => {
    server.close(() => {
      process.exit(0);
    });
  });
});
