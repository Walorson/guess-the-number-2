import { io } from "../../../_snowpack/pkg/socket.io-client.js";
import { freezeGame, unfreezeGame, dead } from "../game.js";
import { setText } from "../output.js";
import { SERVER_URL, PRE_ROUND_TIME, POST_ROUND_TIME, SCOREBOARD_DELAY_TIME, PING_REFRESH_TIME, isMultiplayer, TERMINATE_LOBBY_DELAY } from "./multiplayer-config.js";
import { printHints, printOneChanceHint } from "../gamemodes/utility/hints.js";
import { ping } from "./ping.js";
import { revealInterval } from "../gamemodes/utility/interval.js";
import { forceRand } from "../random.js";
let socket;
let yourPoints;
let pointsToWin;
let min = 0;
let max = 100;
let gamemode = 'classic';
const nickname = localStorage.getItem("Nickname");
const gameID = sessionStorage.getItem("lobby");
window.addEventListener("load", () => {
    if (isMultiplayer())
        freezeGame();
});
export function connectToServer() {
    socket = io(SERVER_URL);
    socket.on("connect", () => {
        socket.emit("connectToGame", gameID, nickname);
        const div = document.createElement("div");
        div.setAttribute("id", "ping");
        div.style.display = 'block';
        div.innerHTML = "Ping: 0ms";
        document.body.appendChild(div);
        setInterval(() => { ping(socket); }, PING_REFRESH_TIME * 1000);
    });
    socket.on("multiplayerWin", (nickname) => {
        roundEnd();
        dead(nickname.toUpperCase() + " WON THE ROUND", false);
    });
    socket.on("roundDraw", () => {
        roundEnd();
        updateScoreboardInfo("ROUND DRAW");
        setText("ROUND DRAW");
    });
    socket.on("startMatch", (scoreboard, pointsToWinCount) => {
        pointsToWin = pointsToWinCount;
        loadScoreboard(scoreboard);
        timerStart(PRE_ROUND_TIME, roundStart);
    });
    socket.on("setServerVariables", (randomNumber, gamemodeServer, minI, maxI) => {
        forceRand(randomNumber);
        gamemode = gamemodeServer;
        if (gamemode == 'puzzle')
            printHints(randomNumber);
        else if (gamemode == 'blind') {
            min = minI;
            max = maxI;
        }
        else if (gamemode == 'oneChance') {
            printOneChanceHint(randomNumber);
        }
        /*else if(gamemode == 'interval') {
            setHint(randomNumber+" is in the interval <???, ???>");
        }*/
    });
    socket.on("startNewRound", () => {
        location.reload();
    });
    socket.on("updateScoreboard", (scoreboardLobby) => {
        updateScoreboard(scoreboardLobby);
    });
    socket.on("endGame", (winner) => {
        updateScoreboardInfo(winner + " WON THE GAME!");
        setText(winner + " WON THE GAME!");
        if (nickname.toUpperCase() == winner.toUpperCase()) {
            setTimeout(() => {
                socket.emit("terminateLobby", gameID);
            }, TERMINATE_LOBBY_DELAY * 1000);
        }
        timerStart(TERMINATE_LOBBY_DELAY, noop, "Return to lobby in ");
    });
    socket.on("GTFO", () => {
        location.href = "../";
    });
    socket.on("playerLeftTheGame", (nickname) => {
        alert(nickname + " left the game.");
    });
}
export function multiplayerWin() {
    roundEnd();
    if (yourPoints < pointsToWin - 1)
        socket.emit("multiplayerWin", gameID, nickname, POST_ROUND_TIME);
    else
        socket.emit("multiplayerWin", gameID, nickname, POST_ROUND_TIME, true);
}
export function multiplayerDead() {
    socket.emit("multiplayerDead", gameID, POST_ROUND_TIME);
}
function loadScoreboard(scoreboard) {
    const div = document.createElement("div");
    div.setAttribute("id", "scoreboard");
    let points = "";
    for (let i = 0; i < pointsToWin; i++) {
        points += '<div class="point"></div>';
    }
    for (let key in scoreboard) {
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
function hideScoreboard() {
    document.getElementById("scoreboard").style.opacity = '0';
}
function showScoreboard() {
    document.getElementById("scoreboard").style.opacity = '';
}
function updateScoreboard(scoreboard) {
    for (let key in scoreboard) {
        const points = document.getElementById("scoreboard-" + key).querySelectorAll(".point");
        for (let i = 0; i < scoreboard[key]; i++) {
            points[i].classList.add("win");
        }
    }
    yourPoints = scoreboard[nickname];
}
let timer;
function timerStart(initialTime, executeFunction, text = "") {
    let time = initialTime;
    timer = setInterval(() => {
        time -= 1;
        document.getElementById("scoreboard-info").textContent = text + time + "...";
        if (time <= 0) {
            clearInterval(timer);
            executeFunction();
        }
    }, 1000);
}
function roundStart() {
    unfreezeGame();
    hideScoreboard();
}
function roundEnd() {
    updateScoreboardInfo("NEXT ROUND WILL START SOON");
    socket.emit("updateScoreboard", gameID);
    freezeGame();
    setTimeout(() => {
        showScoreboard();
    }, SCOREBOARD_DELAY_TIME * 1000);
    if (gamemode == 'blind')
        revealInterval(min, max);
}
function updateScoreboardInfo(text) {
    document.getElementById("scoreboard-info").textContent = text;
}
function noop() { }
//# sourceMappingURL=game-client.js.map