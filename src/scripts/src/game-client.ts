import { io } from "socket.io-client";
import { freezeGame, unfreezeGame } from "./game.js";

let socket: any;
const nickname: string = localStorage.getItem("Nickname");
const gameID: string = sessionStorage.getItem("lobby");
const scoreboard: any = [];

window.addEventListener("load", () => {
    freezeGame();
});

export function connectToServer(): void
{
    socket = io("http://127.0.0.1:3000");
    socket.on("connect", () => {
        socket.emit("connectToGame", gameID, nickname);
    });

    socket.on("multiplayerWin", (nickname: string) => {
        alert(nickname+" wygrał i był przed tobą! Jesteś do dupy!");
    });

    socket.on("startMatch", (members: string[]) => {
        loadScoreboard(members);
        timerStart();
    });
}

export function multiplayerWin(): void {
    socket.emit("multiplayerWin", gameID, nickname);
}

function loadScoreboard(members: string[]): void
{
    for(let i=0; i<members.length; i++)
    {
        scoreboard[members[i]] = 0;
    }
    
    const div: HTMLElement = document.createElement("div");
    div.setAttribute("id","scoreboard");
    
    for(let key in scoreboard)
    {
        div.innerHTML += `
            <div class="row">
                <div>${key}</div>
                <div class="point"></div>
                <div class="point"></div>
                <div class="point"></div>
            </div>
        `;
    }

    div.innerHTML += `<div class="row info" id="scoreboard-info">
             WAITING FOR OTHER PLAYERS
        </div>`;

    document.body.appendChild(div);
}

function hideScoreboard(): void {
    document.getElementById("scoreboard").style.display = 'none';
}

function showScoreboard(): void {
    document.getElementById("scoreboard").style.display = '';
}

let timer: NodeJS.Timeout;
let time: number = 8;
function timerStart(): void {
    timer = setInterval(() => 
    {
        time -= 1;
        document.getElementById("scoreboard-info").textContent = time+"...";

        if(time <= 0)
        {
            clearInterval(timer);
            roundStart();
        }
    }, 1000);
}

function roundStart(): void {
    unfreezeGame();
    hideScoreboard();
}