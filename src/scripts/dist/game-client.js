import { io } from "socket.io-client";
import { freezeGame, unfreezeGame } from "./game.js";
let socket;
const nickname = localStorage.getItem("Nickname");
const gameID = sessionStorage.getItem("lobby");
const scoreboard = [];
window.addEventListener("load", () => {
    freezeGame();
});
export function connectToServer() {
    socket = io("http://127.0.0.1:3000");
    socket.on("connect", () => {
        socket.emit("connectToGame", gameID, nickname);
    });
    socket.on("multiplayerWin", (nickname) => {
        alert(nickname + " wygrał i był przed tobą! Jesteś do dupy!");
    });
    socket.on("startMatch", (members) => {
        loadScoreboard(members);
        timerStart();
    });
}
export function multiplayerWin() {
    socket.emit("multiplayerWin", gameID, nickname);
}
function loadScoreboard(members) {
    for (let i = 0; i < members.length; i++) {
        scoreboard[members[i]] = 0;
    }
    const div = document.createElement("div");
    div.setAttribute("id", "scoreboard");
    for (let key in scoreboard) {
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
function hideScoreboard() {
    document.getElementById("scoreboard").style.display = 'none';
}
function showScoreboard() {
    document.getElementById("scoreboard").style.display = '';
}
let timer;
let time = 8;
function timerStart() {
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
//# sourceMappingURL=game-client.js.map