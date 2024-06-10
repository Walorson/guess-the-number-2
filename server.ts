import { Server } from "socket.io"
const io: Server = new Server(3000, {
    cors: { origin: "*" }
})