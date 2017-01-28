import * as socketIo from 'socket.io';

export const initializeWebSocket = (server) => {
    const socketServer = socketIo.listen(server);
    socketServer.on('connection', socket => {
        // socket answer, when connection is established
        socket.emit('connect', { time: new Date(), text: 'Connected to Server!' });
        // socket broadcast
        socket.on('chat', (data) => {
            console.log('chat', data);
            socketServer.emit('chat', data);
        });
    });
}