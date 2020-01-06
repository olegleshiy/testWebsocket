const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3012 });

server.on('connection', ws => {
    ws.on('message', message => {
        if(message === 'exit') {
            ws.close();
        } else {
            server.clients.forEach(client => {
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