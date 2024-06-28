import { io } from "socket.io-client";

let socket: any;
const nickname: string = localStorage.getItem("Nickname");
const gameID: string = sessionStorage.getItem("lobby");

export function connectToServer(): void
{
    socket = io("http://127.0.0.1:3000");
    socket.on("connect", () => {
        socket.emit("connectToGame", gameID, nickname);
    });

    socket.on("multiplayerWin", (nickname: string) => {
        alert(nickname+" wygrał i był przed tobą! Jesteś do dupy!");
    });

    socket.on("startMatch", () => {
        alert("everyone is fucking ready");
    });
}

export function multiplayerWin(): void {
    socket.emit("multiplayerWin", gameID, nickname);
}