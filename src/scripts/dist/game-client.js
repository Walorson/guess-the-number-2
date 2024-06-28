import { io } from "socket.io-client";
let socket;
const nickname = localStorage.getItem("Nickname");
const gameID = localStorage.getItem("lobby");
export function connectToServer() {
    socket = io("http://127.0.0.1:3000");
    socket.on("connect", () => {
        socket.emit("connectToGame", gameID);
    });
    socket.on("multiplayerWin", (nickname) => {
        alert(nickname + " wygrał i był przed tobą! Jesteś do dupy!");
    });
}
export function multiplayerWin() {
    socket.emit("multiplayerWin", gameID, nickname);
}
//# sourceMappingURL=game-client.js.map