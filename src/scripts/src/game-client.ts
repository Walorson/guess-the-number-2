import { io } from "socket.io-client";
import { freezeGame, unfreezeGame, dead, forceRand } from "./game.js";
import { setText } from "./output.js";
import { SERVER_URL, PRE_ROUND_TIME, POST_ROUND_TIME, SCOREBOARD_DELAY_TIME, PING_REFRESH_TIME, isMultiplayer, TERMINATE_LOBBY_DELAY } from "./multiplayer-config.js";

let socket: any;
let yourPoints: number;
let pointsToWin: number;
const nickname: string = localStorage.getItem("Nickname");
const gameID: string = sessionStorage.getItem("lobby");

window.addEventListener("load", () => 
{
    if(isMultiplayer()) 
        freezeGame();
});

export function connectToServer(): void
{
    socket = io(SERVER_URL);
    socket.on("connect", () => {
        socket.emit("connectToGame", gameID, nickname);

        const div = document.createElement("div");
        div.setAttribute("id","ping");
        div.style.display = 'block';
        div.innerHTML = "Ping: 0ms";
        document.body.appendChild(div);

        setInterval(ping, PING_REFRESH_TIME * 1000);
    });

    socket.on("multiplayerWin", (nickname: string) => {
        roundEnd();
        dead(nickname.toUpperCase() + " WON THE ROUND");
    });

    socket.on("startMatch", (scoreboard: number[], pointsToWinCount: number) => {
        pointsToWin = pointsToWinCount;
        loadScoreboard(scoreboard);
        timerStart(PRE_ROUND_TIME, roundStart);
    });

    socket.on("getRandomNumber", (randomNumber: number) => 
    {
        forceRand(randomNumber);
    });

    socket.on("startNewRound", () => {
        location.reload();
    });

    socket.on("updateScoreboard", (scoreboardLobby: number[]) => {
        updateScoreboard(scoreboardLobby)
    });

    socket.on("endGame", (winner: string) => {
        updateScoreboardInfo(winner + " WON THE GAME!");
        setText(winner + " WON THE GAME!");

        if(nickname.toUpperCase() == winner.toUpperCase())
        {
            setTimeout(() => {
                socket.emit("terminateLobby", gameID);
            }, TERMINATE_LOBBY_DELAY * 1000)
        }
         
        timerStart(TERMINATE_LOBBY_DELAY, noop, "Return to lobby in ");
    });

    socket.on("GTFO", () => {
        location.href = "../../";
    });

    socket.on("playerLeftTheGame", (nickname: string) => {
        alert(nickname + " left the game.");
    });
}

export function multiplayerWin(): void 
{
    roundEnd();

    if(yourPoints < pointsToWin - 1)
        socket.emit("multiplayerWin", gameID, nickname, POST_ROUND_TIME);
    else
        socket.emit("multiplayerWin", gameID, nickname, POST_ROUND_TIME, true);
}

function loadScoreboard(scoreboard: number[]): void
{   
    const div: HTMLElement = document.createElement("div");
    div.setAttribute("id","scoreboard");
    const pointsToWin: number = Number(localStorage.getItem('Points To Win'));
    let points = "";

    for(let i=0; i<pointsToWin; i++)
    {
        points += '<div class="point"></div>';
    }

    for(let key in scoreboard)
    {
        div.innerHTML += `
            <div class="row" id="scoreboard-${key}">
                <div>${key}</div>
                <div class="points-row">
                    ${points}
                <div>
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

    yourPoints = scoreboard[nickname];
}

let timer: NodeJS.Timeout;
function timerStart(initialTime: number, executeFunction: Function, text: string = ""): void 
{
    let time: number = initialTime;
    timer = setInterval(() => 
    {
        time -= 1;
        document.getElementById("scoreboard-info").textContent = text+time+"...";

        if(time <= 0)
        {
            clearInterval(timer);
            executeFunction();
        }
    }, 1000);
}

function roundStart(): void {
    unfreezeGame();
    hideScoreboard();
}

function roundEnd(): void {
    updateScoreboardInfo("NEXT ROUND WILL START SOON");
    socket.emit("updateScoreboard", gameID);
    freezeGame();
    setTimeout(() => {
        showScoreboard();
    }, SCOREBOARD_DELAY_TIME * 1000);
}

function updateScoreboardInfo(text: string) 
{
    document.getElementById("scoreboard-info").textContent = text;
}

function ping(): void {
    let time: number = 0;
    let timer: NodeJS.Timeout = setInterval(() => { time++; }, 1);
    socket.emit("ping");
    socket.on("pong", () => {
        clearInterval(timer);
        document.getElementById("ping").textContent = "Ping: "+time+"ms";
        time = 0;
    });
}

function noop(): void {}