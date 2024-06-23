import { io } from "socket.io-client";
const socket = io("127.0.0.1:3000");
let nickname = "Mateusz";
socket.on("connect", () => {
    socket.emit("join", nickname);
});
//# sourceMappingURL=menu-client.js.map