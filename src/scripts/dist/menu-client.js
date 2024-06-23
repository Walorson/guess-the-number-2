import { io } from "socket.io-client";
let socket;
let nickname;
const connectInfo = document.getElementById("connecting-to-server");
export function connectToServer() {
    socket = io("http://127.0.0.1:3000");
    let timer = setTimeout(() => {
        connectInfo.textContent = "Connection failed.";
    }, 5000);
    socket.on("connect", () => {
        connectInfo.style.display = 'none';
        clearTimeout(timer);
        nickname = localStorage.getItem("Nickname");
        socket.emit("join", nickname);
    });
}
//# sourceMappingURL=menu-client.js.map