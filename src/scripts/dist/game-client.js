import { io } from "socket.io-client";
import { freezeGame, unfreezeGame, dead, forceRand } from "./game.js";
import { setText } from "./output.js";
import { SERVER_URL, PRE_ROUND_TIME, POST_ROUND_TIME, SCOREBOARD_DELAY_TIME, PING_REFRESH_TIME, isMultiplayer, TERMINATE_LOBBY_DELAY } from "./multiplayer-config.js";
import { printHints } from "./gamemodes/utility/hints.js";
let socket;
let yourPoints;
let pointsToWin;
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
        setInterval(ping, PING_REFRESH_TIME * 1000);
    });
    socket.on("multiplayerWin", (nickname) => {
        roundEnd();
        dead(nickname.toUpperCase() + " WON THE ROUND");
    });
    socket.on("startMatch", (scoreboard, pointsToWinCount) => {
        pointsToWin = pointsToWinCount;
        loadScoreboard(scoreboard);
        timerStart(PRE_ROUND_TIME, roundStart);
    });
    socket.on("setServerVariables", (randomNumber, gamemode) => {
        forceRand(randomNumber);
        if (gamemode == 'puzzle')
            printHints(randomNumber);
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
}
function updateScoreboardInfo(text) {
    document.getElementById("scoreboard-info").textContent = text;
}
function ping() {
    let time = 0;
    let timer = setInterval(() => { time++; }, 1);
    socket.emit("ping");
    socket.on("pong", () => {
        clearInterval(timer);
        document.getElementById("ping").textContent = "Ping: " + time + "ms";
        time = 0;
    });
}
function noop() { }
//# sourceMappingURL=game-client.js.map