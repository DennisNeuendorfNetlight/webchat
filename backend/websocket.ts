import * as socketIo from 'socket.io';

export const initializeWebSocket = (server) => {
    const socketServer = socketIo.listen(server);
    socketServer.on('connection', socket => {
        // der Client ist verbunden
        socket.emit('chat', { zeit: new Date(), text: 'Du bist nun mit dem Server verbunden!' });
        // wenn ein Benutzer einen Text senden
        socket.on('chat', function (data) {
            // so wird dieser Text an alle anderen Benutzer gesendet
            socketServer.emit('chat', { time: new Date(), name: data.name || 'Anonym', text: data.text });
        });
    });
}