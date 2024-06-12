import { io } from "socket.io-client";

const socket = io("127.0.0.1:3000");
let nickname: string = "Mateusz";

socket.on("connection", () => {
    socket.emit("join", nickname)
});