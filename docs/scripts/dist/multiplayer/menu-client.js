import { io } from "../../../_snowpack/pkg/socket.io-client.js";
import { gameSetup } from "../settings/gameSetup.js";
import { changeMenu } from "../menu.js";
import { SERVER_URL, SERVER_LIST_REFRESH_TIME, PING_REFRESH_TIME } from "./multiplayer-config.js";
import { ping } from "./ping.js";
let socket;
let nickname;
const connectInfo = document.getElementById("connecting-to-server");
const waitingRoom = document.getElementById("waiting-room-players");
const serversList = document.getElementById("servers-list");
const pingDiv = document.getElementById("ping");
const onlinePlayersDiv = document.getElementById("online-players");
const disconnectButton = document.getElementById("disconnect-button");
window.addEventListener("load", () => {
    sessionStorage.removeItem("lobby");
    sessionStorage.removeItem("multiplayer");
});
export function connectToServer() {
    socket = io(SERVER_URL);
    let timer = setTimeout(() => {
        connectInfo.textContent = "Connection failed. Try Again later...";
    }, 5000);
    socket.on("connect", () => {
        connectInfo.style.display = 'none';
        pingDiv.style.display = 'block';
        onlinePlayersDiv.style.display = 'block';
        clearTimeout(timer);
        nickname = localStorage.getItem("Nickname");
        gameSetup[0].setValue(nickname + "'s room");
        gameSetup[0].applySetting();
        socket.emit("join", nickname);
        setInterval(() => { ping(socket); }, PING_REFRESH_TIME * 1000);
        setInterval(onlinePlayers, PING_REFRESH_TIME * 1000);
        setInterval(getServersList, SERVER_LIST_REFRESH_TIME * 1000);
    });
    socket.on("getServersList", (list) => {
        serversList.innerHTML = ``;
        for (let i = 0; i < list.length; i++) {
            serversList.innerHTML += `<button owner="${list[i].gameID}" class="lobby-button">${list[i].name} <div class="playersCount">${list[i].members.length}/${list[i].maxPlayers}</div></button>`;
        }
        serversList.querySelectorAll("button").forEach((button) => {
            button.onclick = () => {
                connectTo(button.getAttribute('owner'));
            };
        });
    });
    socket.on("addPlayerToWaitingRoom", (newPlayer) => {
        const emptySlot = waitingRoom.querySelector(".empty-slot");
        emptySlot.textContent = newPlayer;
        emptySlot.removeAttribute("class");
    });
    socket.on("startGame", (gamemode) => {
        sessionStorage.setItem("multiplayer", "true");
        location.href = `gamemodes/${gamemode}.html`;
    });
    socket.on("GTFO", () => {
        location.reload();
    });
    socket.on("removePlayerFromWaitingRoom", (nickname) => {
        waitingRoom.querySelectorAll("button").forEach((button) => {
            if (button.textContent == nickname) {
                button.textContent = '.';
                button.setAttribute("class", "empty-slot");
                return;
            }
        });
    });
}
export function createLobby() {
    waitingRoom.innerHTML =
        `
        <button><span style="color:gold">${nickname}</span></button>
    `;
    const playersCount = Number(localStorage.getItem('Players Count'));
    for (let i = 1; i < playersCount; i++) {
        waitingRoom.innerHTML += `<button class="empty-slot">.</button>`;
    }
    document.getElementById("start-game-button").style.display = 'block';
    socket.emit("createLobby", localStorage.getItem("Room Name"), playersCount, localStorage.getItem("Points To Win"), localStorage.getItem("Gamemode").toLowerCase());
    sessionStorage.setItem("lobby", socket.id);
}
function getServersList() {
    socket.emit("getServersList");
}
function onlinePlayers() {
    socket.emit("getOnlinePlayers");
    socket.on("getOnlinePlayers", (onlinePlayers) => {
        onlinePlayersDiv.textContent = "Online: " + onlinePlayers;
    });
}
function connectTo(ownerID) {
    socket.emit("connectTo", ownerID);
    sessionStorage.setItem("lobby", ownerID);
    socket.on("connectTo", (lobby) => {
        changeMenu("waiting-room");
        for (let i = 0; i < lobby.maxPlayers; i++) {
            if (lobby.members[i] != undefined) {
                if (i == 0)
                    waitingRoom.innerHTML += `<button><span style="color:gold">${lobby.members[i]}</span></button>`;
                else
                    waitingRoom.innerHTML += `<button>${lobby.members[i]}</button>`;
            }
            else
                waitingRoom.innerHTML += `<button class="empty-slot">.</button>`;
        }
    });
}
export function startGame() {
    socket.emit("startGame", socket.id);
}
//# sourceMappingURL=menu-client.js.map