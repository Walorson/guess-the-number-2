import { io } from "socket.io-client";
import { gameSetup } from "../settings/gameSetup.js";
import { changeMenu } from "../menu.js";
import { SERVER_URL, SERVER_LIST_REFRESH_TIME, PING_REFRESH_TIME } from "./multiplayer-config.js";
import { ping } from "./ping.js";

let socket: any;
let nickname: string;
let serverlist: any[];
const connectInfo: HTMLElement = document.getElementById("connecting-to-server");
const waitingRoom: HTMLElement = document.getElementById("waiting-room-players");
const serversList: HTMLElement = document.getElementById("servers-list");
const pingDiv: HTMLElement = document.getElementById("ping");
const onlinePlayersDiv: HTMLElement = document.getElementById("online-players");
const disconnectButton: HTMLElement = document.getElementById("disconnect-button");

window.addEventListener("load", () => {
    sessionStorage.removeItem("lobby");
    sessionStorage.removeItem("multiplayer");
});

function refreshServerList(): void {
    serversList.innerHTML = ``;
    for (let i = 0; i < serverlist.length; i++) {
        serversList.innerHTML += `<button owner="${serverlist[i].gameID}" class="lobby-button">${serverlist[i].name} <div class="playersCount">${serverlist[i].members.length}/${serverlist[i].maxPlayers}</div></button>`;
    }

    serversList.querySelectorAll("button").forEach((button: HTMLButtonElement) => {
        button.onclick = () => {
            connectTo(button.getAttribute('owner'));
        }
    });
}

export function connectToServer(): void {
    socket = io(SERVER_URL);
    let timer: NodeJS.Timeout = setTimeout(() => {
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
        setInterval(() => { ping(socket) }, PING_REFRESH_TIME * 1000);
        setInterval(onlinePlayers, PING_REFRESH_TIME * 1000);
        setInterval(getServersList, SERVER_LIST_REFRESH_TIME * 1000);
    });

    socket.on("getServersList", (list: any[]) => {
        let doRefresh = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i] != serverlist[i]) {
                doRefresh = true;
            }
        }

        if (doRefresh) {
            serverlist = list;
            refreshServerList();
        }
    });

    socket.on("addPlayerToWaitingRoom", (newPlayer: string) => {
        const emptySlot: HTMLButtonElement = waitingRoom.querySelector(".empty-slot");
        emptySlot.textContent = newPlayer;
        emptySlot.removeAttribute("class");
    });

    socket.on("startGame", (gamemode: string) => {
        sessionStorage.setItem("multiplayer", "true");
        location.href = `gamemodes/${gamemode}.html`;
    });

    socket.on("GTFO", () => {
        location.reload();
    });

    socket.on("removePlayerFromWaitingRoom", (nickname: string) => {
        waitingRoom.querySelectorAll("button").forEach((button: HTMLElement) => {
            if (button.textContent == nickname) {
                button.textContent = '.';
                button.setAttribute("class", "empty-slot");
                return;
            }
        });
    });
}

export function createLobby(): void {
    waitingRoom.innerHTML =
        `
        <button><span style="color:gold">${nickname}</span></button>
    `;

    const playersCount: number = Number(localStorage.getItem('Players Count'));

    for (let i = 1; i < playersCount; i++) {
        waitingRoom.innerHTML += `<button class="empty-slot">.</button>`;
    }

    document.getElementById("start-game-button").style.display = 'block';
    socket.emit("createLobby", localStorage.getItem("Room Name"), playersCount, localStorage.getItem("Points To Win"), localStorage.getItem("Gamemode"));
    sessionStorage.setItem("lobby", socket.id);
}

function getServersList(): void {
    socket.emit("getServersList");
}

function onlinePlayers(): void {
    socket.emit("getOnlinePlayers");
    socket.on("getOnlinePlayers", (onlinePlayers: number) => {
        onlinePlayersDiv.textContent = "Online: " + onlinePlayers;
    });
}

function connectTo(ownerID: string): void {
    socket.emit("connectTo", ownerID);
    sessionStorage.setItem("lobby", ownerID);
    socket.on("connectTo", (lobby: any) => {
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

export function startGame(): void {
    socket.emit("startGame", socket.id);
}
