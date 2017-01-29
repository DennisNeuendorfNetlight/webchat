import * as socketIo from 'socket.io';
import * as _ from 'lodash';

let users = {};

function cleanUsers(socketServer){
    var newUsers = {};
    for (var key in users) {
        if (users.hasOwnProperty(key)) {
            let session = socketServer.sockets.connected[users[key].sessionId];
            if(session) {
                newUsers[key]=users[key];
            }
        }
    }
    console.log('newUsers', newUsers);
    users = newUsers;
};

export const initializeWebSocket = (server) => {
    const socketServer = socketIo.listen(server);
    socketServer.on('connection', socket => {
        //send back sessionId
        socket.emit('session',{sessionId: socket.id});

        //register username with sessionid in users and publish list to all sessions
        socket.on('register', (data) => {
            if(data && data.username){
                users[data.username] = data;
                cleanUsers(socketServer);

                socketServer.emit('clients', _.values(users));
            }
        });        

        //send chat-message to recipient
        socket.on('chat', (data) => {
            //resolve recipients-session
            let session = data.recipient && users[data.recipient] && socketServer.sockets.connected[users[data.recipient].sessionId];
            if(session){
                session.emit('chat', data);
            }
            else{
                if(data.recipient){
                    console.log("No session found for " + data.recipient);
                }
                else{
                    console.log("No recipient");
                }
            }       
        });
    });
}