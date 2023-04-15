console.log("Starting Websocket Server");
import { Server } from 'socket.io';

const io = new Server(4000, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on('connection', (socket) => {
    socket.conn.on('close', (reason) => {
        console.log(reason);
    })
    console.log('connected')
})
