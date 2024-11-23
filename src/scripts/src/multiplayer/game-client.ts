import { io } from "socket.io-client";
import { freezeGame, unfreezeGame, dead } from "../game.js";
import { setText } from "../output.js";
import { SERVER_URL, PRE_ROUND_TIME, POST_ROUND_TIME, SCOREBOARD_DELAY_TIME, PING_REFRESH_TIME, isMultiplayer, TERMINATE_LOBBY_DELAY } from "./multiplayer-config.js";
import { printHints, printOneChanceHint, setHint } from "../gamemodes/utility/hints.js";
import { ping } from "./ping.js";
import { revealInterval } from "../gamemodes/utility/interval.js";
import { forceRand } from "../random.js";

let socket: any;
let yourPoints: number;
let pointsToWin: number;
let min: number = 0;
let max: number = 100;
let gamemode: string = 'classic';
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

        setInterval(() => { ping(socket) }, PING_REFRESH_TIME * 1000);
    });

    socket.on("multiplayerWin", (nickname: string) => {
        roundEnd();
        dead(nickname.toUpperCase() + " WON THE ROUND", false);
    });

    socket.on("roundDraw", () => {
        roundEnd();
        updateScoreboardInfo("ROUND DRAW");
        setText("ROUND DRAW");
    })

    socket.on("startMatch", (scoreboard: number[], pointsToWinCount: number, disconnectedUsers: string[]) => {
        pointsToWin = pointsToWinCount;
        console.log(disconnectedUsers);
        loadScoreboard(scoreboard, disconnectedUsers);
        timerStart(PRE_ROUND_TIME, roundStart);
    });

    socket.on("setServerVariables", (randomNumber: number, gamemodeServer: string, minI: number, maxI: number) => 
    {
        forceRand(randomNumber);
        gamemode = gamemodeServer;

        if(gamemode == 'puzzle')
            printHints(randomNumber);
        else if(gamemode == 'blind') {
            min = minI;
            max = maxI;
        }
        else if(gamemode == 'oneChance') {
            printOneChanceHint(randomNumber);
        }
        /*else if(gamemode == 'interval') {
            setHint(randomNumber+" is in the interval <???, ???>");  
        }*/

    });

    socket.on("startNewRound", () => {
        location.reload();
    });

    socket.on("updateScoreboard", (scoreboardLobby: number[]) => {
        updateScoreboard(scoreboardLobby);
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
        location.href = "../";
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

export function multiplayerDead(): void
{
    socket.emit("multiplayerDead", gameID, POST_ROUND_TIME);
}

function loadScoreboard(scoreboard: number[], disconnectedUsers: string[]): void
{   
    const div: HTMLElement = document.createElement("div");
    div.setAttribute("id","scoreboard");
    let points = "";

    for(let i=0; i<pointsToWin; i++)
    {
        points += '<div class="point"></div>';
    }

    for(let nickname in scoreboard)
    {
        let disconnectedEffect: string = "";            

        if(disconnectedUsers.includes(nickname))
            disconnectedEffect = "disconnected";

        div.innerHTML += `
            <div class="row ${disconnectedEffect}" id="scoreboard-${nickname}">
                <div>${nickname}</div>
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

    if(gamemode == 'blind')
        revealInterval(min, max);
}

function updateScoreboardInfo(text: string) 
{
    document.getElementById("scoreboard-info").textContent = text;
}

function noop(): void {}