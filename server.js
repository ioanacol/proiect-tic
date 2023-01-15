#!/usr/bin/env node

require('dotenv').config(); //ia variabilele de mediu si le stocheaza la nivel de mediu
const app = require('./app'); //importa app
const http = require('http');
const logger = require('pino')(); // pino=librarie de mesaje

/**
 * Make sure to fallback to development environment.
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'; //verifica daca exista node env

/**
 * Create HTTP server.
 */
const server = http.createServer(app); // se creaza server http

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '9000';
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  // arunca exceptie daca serverul nu e pe listen
  if (error.syscall !== 'listen') {
    throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  // mesaj de succes
  const addr = server.address();
  logger.info(`Listening on ${addr.port}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
