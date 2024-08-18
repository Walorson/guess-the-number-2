import { io } from "socket.io-client";
import { freezeGame, unfreezeGame, dead, forceRand } from "./game.js";

let socket: any;
const nickname: string = localStorage.getItem("Nickname");
const gameID: string = sessionStorage.getItem("lobby");

window.addEventListener("load", () => {
    if(sessionStorage.getItem("multiplayer") == "true")
        freezeGame();
});

export function connectToServer(): void
{
    socket = io("http://127.0.0.1:3000");
    socket.on("connect", () => {
        socket.emit("connectToGame", gameID, nickname);
    });

    socket.on("multiplayerWin", (nickname: string) => {
        roundEnd();
        dead(nickname.toUpperCase() + " WON THE ROUND");
    });

    socket.on("startMatch", (scoreboard: number[]) => {
        loadScoreboard(scoreboard);
        timerStart();
    });

    socket.on("getRandomNumber", (randomNumber: number) => 
    {
        forceRand(randomNumber);
    });

    socket.on("startNewRound", () => {
        sessionStorage.setItem("multiplayer", "true");
        location.reload();
    });

    socket.on("updateScoreboard", (scoreboardLobby: number[]) => {
        updateScoreboard(scoreboardLobby)
    });
}

export function multiplayerWin(): void {
    roundEnd();
    socket.emit("multiplayerWin", gameID, nickname, postRoundTime);
}

function loadScoreboard(scoreboard: number[]): void
{   
    const div: HTMLElement = document.createElement("div");
    div.setAttribute("id","scoreboard");
    
    for(let key in scoreboard)
    {
        div.innerHTML += `
            <div class="row" id="scoreboard-${key}">
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

    updateScoreboard(scoreboard);
}

function hideScoreboard(): void {
    document.getElementById("scoreboard").style.opacity = '0';
}

function showScoreboard(): void {
    document.getElementById("scoreboard").style.opacity = '';
    document.getElementById("scoreboard-info").textContent = "NEXT ROUND WILL START SOON";
}

function updateScoreboard(scoreboard: number[]): void 
{
    console.log(scoreboard)
    for(let key in scoreboard)
    {
        const points = document.getElementById("scoreboard-"+key).querySelectorAll(".point");

        for(let i=0; i<scoreboard[key]; i++)
        {
            points[i].classList.add("win");

            if(i >= 2) {
                alert(nickname + " won the game");
            }
        }
    }
}

let timer: NodeJS.Timeout;
const preRoundTime: number = 8;
const postRoundTime: number = 5;
function timerStart(): void 
{
    let time: number = preRoundTime;
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

function roundEnd(): void {
    socket.emit("updateScoreboard", gameID);
    freezeGame();
    setTimeout(() => {
        showScoreboard();
    }, 1500);
}