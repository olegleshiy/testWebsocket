const express = require('express');
const https = require('http');
const WebSocket = require('ws');
const app = express();
const server = https.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    ws.on('message', message => {

        if(message === 'exit') {
            ws.close();
        } else {

            wss.clients.forEach(client => {

                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        }

    });

    ws.send('Welcome');
    ws.on('close', (reasonCode, description) => {
        console.log('Disconnected ' + ws.remoteAddress);
        console.dir({ reasonCode, description });
    });
});

server.listen(process.env.PORT || 8081, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
