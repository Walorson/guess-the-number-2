import { io } from "socket.io-client";
let socket;
const nickname = localStorage.getItem("Nickname");
const gameID = sessionStorage.getItem("lobby");
export function connectToServer() {
    socket = io("http://127.0.0.1:3000");
    socket.on("connect", () => {
        socket.emit("connectToGame", gameID, nickname);
    });
    socket.on("multiplayerWin", (nickname) => {
        alert(nickname + " wygrał i był przed tobą! Jesteś do dupy!");
    });
    socket.on("startMatch", () => {
        alert("everyone is fucking ready");
    });
}
export function multiplayerWin() {
    socket.emit("multiplayerWin", gameID, nickname);
}
//# sourceMappingURL=game-client.js.map