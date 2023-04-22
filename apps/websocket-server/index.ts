console.log("Starting Websocket Server");
import { Server } from 'socket.io';

const io = new Server(4000, {
    cors: {
        origin: "http://localhost:3000"
    }
})

const canvasManager = CanvasManager.Instance;

io.on('connection', (socket) => {
    socket.conn.on('close', (reason) => {
        console.log(reason);
    })

    socket.on('joinCanvas', (data: string) => {
        const canvas = canvasManager.getCanvas(data);
        socket.emit('canvasData', canvas.canvasData);
    })

    socket.on('draw', (p) => {
        console.log(p)
        socket.broadcast.emit('draw', p);
    })
    console.log('connected')
})
