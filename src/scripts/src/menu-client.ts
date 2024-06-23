import { io } from "socket.io-client";

let socket: any;
let nickname: string;
const connectInfo: HTMLElement = document.getElementById("connecting-to-server");

export function connectToServer(): void {
    socket = io("http://127.0.0.1:3000");
    let timer: NodeJS.Timeout = setTimeout(() => {
        connectInfo.textContent = "Connection failed.";
    }, 5000);

    socket.on("connect", () => {
        connectInfo.style.display = 'none';
        clearTimeout(timer);

        nickname = localStorage.getItem("Nickname");

        socket.emit("join", nickname)
    });
}