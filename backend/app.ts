import "reflect-metadata";
process.env.NODE_ENV = process.env.NODE_ENV || 'localhost'
import * as express from 'express';
import * as http from 'http';
import * as log from 'bog';
import { config } from './config';
let app = express();
import { initializeWebSocket } from './websocket';
let port = config.port || process.env.PORT || 3000;
let server = http.createServer(app).listen(port)

log.level('debug');
initializeWebSocket(server);
log.info('Express server listening on PORT:',port,'in',app.get('env'),'mode');


// Expose app
exports = module.exports = app;