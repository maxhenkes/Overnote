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
    socket.on('draw', (p) => {
        console.log(p)
        socket.broadcast.emit('draw', p);
    })
    console.log('connected')
})
