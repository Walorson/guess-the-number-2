import { Server } from "socket.io" 
const io: Server = new Server(3000, {
    cors: { origin: "*" }
});

io.on('connection', socket => {
    socket.on("join", (nickname: string) => {
        console.log(nickname)
    });
});