import {io} from "../../_snowpack/pkg/socket.io-client.js";
import {freezeGame, unfreezeGame, dead, forceRand} from "./game.js";
import {setText} from "./output.js";
let socket;
let endGame = false;
let yourPoints;
const nickname = localStorage.getItem("Nickname");
const gameID = sessionStorage.getItem("lobby");
const pointsToWin = 3;
const preRoundTime = 6;
const postRoundTime = 5;
const preScoreboardTime = 1;
window.addEventListener("load", () => {
  if (sessionStorage.getItem("multiplayer") == "true")
    freezeGame();
});
export function connectToServer() {
  socket = io("https://guess-the-number-2.onrender.com/");
  socket.on("connect", () => {
    socket.emit("connectToGame", gameID, nickname);
  });
  socket.on("multiplayerWin", (nickname2) => {
    roundEnd();
    dead(nickname2.toUpperCase() + " WON THE ROUND");
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
}
export function multiplayerWin() {
  roundEnd();
  if (yourPoints < pointsToWin - 1)
    socket.emit("multiplayerWin", gameID, nickname, postRoundTime);
  else
    socket.emit("multiplayerWin", gameID, nickname, postRoundTime, true);
}
function loadScoreboard(scoreboard) {
  const div = document.createElement("div");
  div.setAttribute("id", "scoreboard");
  for (let key in scoreboard) {
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
function hideScoreboard() {
  document.getElementById("scoreboard").style.opacity = "0";
}
function showScoreboard() {
  document.getElementById("scoreboard").style.opacity = "";
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
  let time = preRoundTime;
  timer = setInterval(() => {
    time -= 1;
    document.getElementById("scoreboard-info").textContent = time + "...";
    if (time <= 0) {
      clearInterval(timer);
      roundStart();
    }
  }, 1e3);
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
  }, preScoreboardTime * 1e3);
}
function updateScoreboardInfo(text) {
  document.getElementById("scoreboard-info").textContent = text;
}
