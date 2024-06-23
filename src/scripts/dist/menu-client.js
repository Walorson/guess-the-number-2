import { io } from "socket.io-client";
import { gameSetup } from "./customSetup.js";
let socket;
let nickname;
const connectInfo = document.getElementById("connecting-to-server");
const waitingRoom = document.getElementById("waiting-room-players");
const serversList = document.getElementById("servers-list");
const pingDiv = document.getElementById("ping");
export function connectToServer() {
    socket = io("http://127.0.0.1:3000");
    let timer = setTimeout(() => {
        connectInfo.textContent = "Connection failed.";
    }, 5000);
    socket.on("connect", () => {
        connectInfo.style.display = 'none';
        clearTimeout(timer);
        nickname = localStorage.getItem("Nickname");
        gameSetup[0].setValue(nickname + "'s room");
        gameSetup[0].applySetting();
        socket.emit("join", nickname);
        setInterval(ping, 1000);
        setInterval(getServersList, 1000);
    });
    socket.on("getServersList", (list) => {
        for (let i = 0; i < list.length; i++) {
            serversList.innerHTML += `<button>${list[i].name}</button>`;
        }
    });
}
export function createLobby() {
    waitingRoom.innerHTML =
        `
        <button><span style="color:gold">${nickname}</span></button>
    `;
    const playersCount = Number(localStorage.getItem('Players Count'));
    for (let i = 1; i < playersCount; i++) {
        waitingRoom.innerHTML += `<button>.</button>`;
    }
    socket.emit("createLobby", localStorage.getItem("Room Name"), nickname);
}
function getServersList() {
    socket.emit("getServersList");
    serversList.innerHTML = ``;
}
function ping() {
    let time = 0;
    let timer = setInterval(() => { time++; }, 1);
    socket.emit("ping");
    socket.on("pong", () => {
        clearInterval(timer);
        pingDiv.textContent = "Ping: " + time + "ms";
        time = 0;
    });
}
//# sourceMappingURL=menu-client.js.map