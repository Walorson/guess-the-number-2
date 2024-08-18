import { io } from "socket.io-client";
import { gameSetup } from "./customSetup.js";
import { changeMenu } from "./menu.js";

let socket: any;
let nickname: string;
const connectInfo: HTMLElement = document.getElementById("connecting-to-server");
const waitingRoom: HTMLElement = document.getElementById("waiting-room-players");
const serversList: HTMLElement = document.getElementById("servers-list");
const pingDiv: HTMLElement = document.getElementById("ping");

//CONFIG//
const SERVER_LIST_REFRESH_TIME: number = 1;
const PING_REFRESH_TIME: number = 1;
const SERVER_URL: string = "http://127.0.0.1:3000";

window.addEventListener("load", () => {
    sessionStorage.removeItem("lobby");
    sessionStorage.removeItem("multiplayer");
});

export function connectToServer(): void {
    socket = io(SERVER_URL);
    let timer: NodeJS.Timeout = setTimeout(() => {
        connectInfo.textContent = "Connection failed.";
    }, 5000);

    socket.on("connect", () => {
        connectInfo.style.display = 'none';
        clearTimeout(timer);

        nickname = localStorage.getItem("Nickname");
        gameSetup[0].setValue(nickname+"'s room");
        gameSetup[0].applySetting();

        socket.emit("join", nickname);
        setInterval(ping, PING_REFRESH_TIME * 1000);
        setInterval(getServersList, SERVER_LIST_REFRESH_TIME * 1000);
    });

    socket.on("getServersList", (list: any[]) => {
        for(let i=0; i<list.length; i++) {
            serversList.innerHTML += `<button owner="${list[i].gameID}">${list[i].name}</button>`;
        }

        serversList.querySelectorAll("button").forEach((button: HTMLButtonElement) => {
            button.onclick = () => {
                connectTo(button.getAttribute('owner'));
            }
        });
    });

    socket.on("addPlayerToWaitingRoom", (newPlayer: string) => {
        const emptySlot: HTMLButtonElement = waitingRoom.querySelector(".empty-slot");
        emptySlot.textContent = newPlayer;
        emptySlot.removeAttribute("class");
    });

    socket.on("startGame", () => {
        sessionStorage.setItem("multiplayer", "true");
        location.href = "gamemodes/classic.html";
    });

    socket.on("rejoin", (id: string) => {
        alert(id+" WYJEBALO!")
    });
}

export function createLobby(): void {
    waitingRoom.innerHTML =
    `
        <button><span style="color:gold">${nickname}</span></button>
    `;

    const playersCount: number = Number(localStorage.getItem('Players Count'));

    for(let i=1; i<playersCount; i++)
    {
        waitingRoom.innerHTML += `<button class="empty-slot">.</button>`;
    }

    document.getElementById("start-game-button").style.display = 'block';
    socket.emit("createLobby", localStorage.getItem("Room Name"), playersCount);
    sessionStorage.setItem("lobby", socket.id);
}

function getServersList(): void {
    socket.emit("getServersList");
    serversList.innerHTML = ``;
}

function ping(): void {
    let time: number = 0;
    let timer: NodeJS.Timeout = setInterval(() => { time++; }, 1);
    socket.emit("ping");
    socket.on("pong", () => {
        clearInterval(timer);
        pingDiv.textContent = "Ping: "+time+"ms";
        time = 0;
    });
}

function connectTo(ownerID: string): void {
    socket.emit("connectTo", ownerID);
    sessionStorage.setItem("lobby", ownerID);
    socket.on("connectTo", (lobby: any) => {
        changeMenu("waiting-room");
        for(let i=0; i<lobby.maxPlayers; i++) 
        {
            if(lobby.members[i] != undefined)
            {
                if(i == 0)
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