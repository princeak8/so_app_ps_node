var WebSocket = require('ws');
const queryString = require('query-string');

const ConnectionsController = require('./controller/connections');

const wss = new WebSocket.Server({ noServer: true });