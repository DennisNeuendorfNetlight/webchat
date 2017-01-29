import * as socketIo from 'socket.io';
import * as _ from 'lodash';

const sessions = [];
const users = {};

export const initializeWebSocket = (server) => {
    const socketServer = socketIo.listen(server);
    socketServer.on('connection', socket => {
        // socket answer, when connection is established
        //socket.emit('connect', { time: new Date(), text: 'Connected to Server!' });
        sessions.push(socket);
        socket.emit('session',{sessionId: socket.id});
        // socket broadcast
        socket.on('chat', (data) => {
            console.log('chat', data);
            let session = data.recipient && users[data.recipient] && sessions[users[data.recipient]];
            if(session){
                session.emit('chat', data);
            }
            else{
                console.log("No session found");
            }       
        });

        socket.on('register', (data) => {
            console.log('register', data);
            if(data && data.username){
                users[data.username] = data;
                socket.emit('clients', _.values(users));
            }
        });
    });
}