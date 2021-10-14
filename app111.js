const express = require('express');
var cors = require("cors");
var bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
var mqtt = require('mqtt');
const http = require('http');
var WebSocket = require('ws');
const queryString = require('query-string');

const wss = new WebSocket.Server({
    port: 8080,
  });
//const wss2 = new WebSocket.Server({ port: 8085, noServer: true });

const routes = require('./routes/index');
const UsersController = require('./controller/users');
const ConnectionsController = require('./controller/connections');
const StationsController = require('./controller/stations');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/', routes);

const server = http.createServer(app);

const getToken = () => {
    return UsersController.socketToken();
}

// wss.on('upgrade', async function upgrade(request, socket, head) {
//     // Do what you normally do in `verifyClient()` here and then use
//     // `WebSocketServer.prototype.handleUpgrade()`.
//     //let query = url.parse(request.url, true).query;
//     const token = queryString.parse(request.url)['/token'];
//     let authenticated = await ConnectionsController.socketToken(token);
//     console.log('checking authentication', authenticated);
//     if(authenticated) {
//         let args;
//         wss.handleUpgrade(request, socket, head, function done(ws) {
//             wss.emit('connection', ws, request);
//         });
//         // wss2.handleUpgrade(request, socket, head, function done(ws2) {
//         //     wss2.emit('connection', ws2, request);
//         // });
//     }else{
//         return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii');
//     }
    
//   });

wss.on('connection', (ws) => {
    console.log('connected to ws');
    ws.send('Welcome to the chat, enjoy :)');
});
// wss2.on('connection', (ws2) => {
//     console.log('connected to ws');
//     ws2.send('Welcome to the chat, enjoy :)');
// });

console.log('c: ', wss.clients);
setInterval(function(){
    wss.clients.forEach((client) => {
        //console.log('client ready');
        if (client.readyState === WebSocket.OPEN) {
            //wsData = [data];
            const vals = StationsController.generateValues();
            client.send(JSON.stringify(vals));
        }
    });
}, 30000);





server.listen('3001', () => {
    console.log('Server started on port 3001');
})