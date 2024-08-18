import { io } from "socket.io-client";
import { freezeGame, unfreezeGame, dead, forceRand } from "./game.js";
import { setText } from "./output.js";

let socket: any;
let endGame: boolean = false;
let yourPoints: number;
const nickname: string = localStorage.getItem("Nickname");
const gameID: string = sessionStorage.getItem("lobby");

//CONFIG//
const pointsToWin: number = 3;
const preRoundTime: number = 3;
const postRoundTime: number = 5;
const preScoreboardTime: number = 1;
//////////

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

    socket.on("endGame", (winner: string) => {
        updateScoreboardInfo(winner + " WON THE GAME!");
        setText(winner + " WON THE GAME!");
    });
}

export function multiplayerWin(): void 
{
    roundEnd();

    if(yourPoints < pointsToWin - 1)
        socket.emit("multiplayerWin", gameID, nickname, postRoundTime);
    else
        socket.emit("multiplayerWin", gameID, nickname, postRoundTime, true);
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

function hideScoreboard(): void 
{
    document.getElementById("scoreboard").style.opacity = '0';
}

function showScoreboard(): void 
{
    document.getElementById("scoreboard").style.opacity = '';
    updateScoreboardInfo("NEXT ROUND WILL START SOON");
}

function updateScoreboard(scoreboard: number[]): void 
{
    for(let key in scoreboard)
    {
        const points = document.getElementById("scoreboard-"+key).querySelectorAll(".point");

        for(let i=0; i<scoreboard[key]; i++)
        {
            points[i].classList.add("win");
        }
    }

    console.log(scoreboard);
    yourPoints = scoreboard[nickname];
    console.log(yourPoints)
}

let timer: NodeJS.Timeout;
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
    }, preScoreboardTime * 1000);
}

function updateScoreboardInfo(text: string) 
{
    document.getElementById("scoreboard-info").textContent = text;
}