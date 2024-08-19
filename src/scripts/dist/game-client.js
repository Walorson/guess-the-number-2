import { io } from "socket.io-client";
import { freezeGame, unfreezeGame, dead, forceRand } from "./game.js";
import { setText } from "./output.js";
import { SERVER_URL, POINTS_TO_WIN, PRE_ROUND_TIME, POST_ROUND_TIME, SCOREBOARD_DELAY_TIME, isMultiplayer } from "./multiplayer-config.js";
let socket;
let endGame = false;
let yourPoints;
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
    });
    socket.on("multiplayerWin", (nickname) => {
        roundEnd();
        dead(nickname.toUpperCase() + " WON THE ROUND");
    });
    socket.on("startMatch", (scoreboard) => {
        loadScoreboard(scoreboard);
        timerStart();
    });
    socket.on("getRandomNumber", (randomNumber) => {
        forceRand(randomNumber);
    });
    socket.on("startNewRound", () => {
        sessionStorage.setItem("multiplayer", "true");
        location.reload();
    });
    socket.on("updateScoreboard", (scoreboardLobby) => {
        updateScoreboard(scoreboardLobby);
    });
    socket.on("endGame", (winner) => {
        updateScoreboardInfo(winner + " WON THE GAME!");
        setText(winner + " WON THE GAME!");
    });
    socket.on("GTFO", () => {
        location.href = "/";
    });
    socket.on("playerLeftTheGame", (nickname) => {
        alert(nickname + " left the game.");
    });
}
export function multiplayerWin() {
    roundEnd();
    if (yourPoints < POINTS_TO_WIN - 1)
        socket.emit("multiplayerWin", gameID, nickname, POST_ROUND_TIME);
    else
        socket.emit("multiplayerWin", gameID, nickname, POST_ROUND_TIME, true);
}
function loadScoreboard(scoreboard) {
    const div = document.createElement("div");
    div.setAttribute("id", "scoreboard");
    for (let key in scoreboard) {
        div.innerHTML += `
            <div class="row" id="scoreboard-${key}">
                <div>${key}</div>
                <div class="points-row">
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
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
function timerStart() {
    let time = PRE_ROUND_TIME;
    timer = setInterval(() => {
        time -= 1;
        document.getElementById("scoreboard-info").textContent = time + "...";
        if (time <= 0) {
            clearInterval(timer);
            roundStart();
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
//# sourceMappingURL=game-client.js.map