import {writeGuess} from "./input.js";
import {time} from "./time.js";
import {connectToServer, multiplayerWin} from "./multiplayer/game-client.js";
import {isMultiplayer} from "./multiplayer/multiplayer-config.js";
import {changeBackground, changeColor} from "./theme.js";
import {rand} from "./random.js";
window.addEventListener("load", () => {
  changeColor(localStorage.getItem("Color"));
  changeBackground(localStorage.getItem("Background"));
  if (isMultiplayer()) {
    connectToServer();
  }
});
const input = document.getElementById("input");
const output = document.getElementById("output");
const circleLoad = document.getElementById("circleLoad");
const lastGuess = document.getElementById("lastGuess");
const guide = document.getElementById("guide");
let isGameEnd = false;
export let timerDir = 1;
export function freezeGame() {
  window.removeEventListener("keydown", writeGuess);
  isGameEnd = true;
}
export function unfreezeGame() {
  window.addEventListener("keydown", writeGuess);
  isGameEnd = false;
}
export function init(game) {
  window.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && isGameEnd == false) {
      game();
    }
  });
  gameEvents();
  guide.innerHTML = `
    <p><span class="outline">ENTER</span> Guess</p>
    <p><span class="outline">ESC</span> Return to menu</p>
    <p><span><span class="outline">HOLD R</span> Restart</p>
    <p><span class="outline">H</span> Hide guide</p>
    `;
}
function end() {
  freezeGame();
  output.style.opacity = "1";
  time.stopTimer();
  guide.style.bottom = "95px";
}
export function win() {
  end();
  input.classList.add("correct");
  output.textContent = "CORRECT CORRECT CORRECT CORRECT CORRECT CORRECT CORRECT CORRECT";
  output.classList.add("scrollText");
  lastGuess.style.display = "none";
  if (sessionStorage.getItem("multiplayer") == "true")
    multiplayerWin();
}
export function dead(text = "YOU ARE DEAD") {
  end();
  input.classList.add("dead");
  output.innerHTML = `${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp;`;
  output.classList.add("scrollTextDead");
  lastGuess.textContent = `It was ${rand}`;
  lastGuess.style.marginTop = "122px";
}
let ReadyForReloadPage = false;
let reloadPage;
let reloadBlock = true;
export function gameEvents() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      reloadBlock = false;
    }, 1e3);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 40);
    if (localStorage.getItem("isGuideVisible") == "false") {
      guide.style.display = "none";
    }
  });
  window.addEventListener("keydown", (e) => {
    if (window.scrollY > 0)
      window.scrollTo(0, 0);
    if (e.key == "Escape") {
      location.href = "../index.html";
    }
    if ((e.key === "r" || e.key === "R") && isMultiplayer() == false) {
      if (reloadBlock == true)
        return;
      reloadPage = setTimeout(function() {
        if (ReadyForReloadPage)
          location.reload();
      }, 1e3);
      ReadyForReloadPage = true;
      circleLoad.style.setProperty("--anim-play-state", "running");
      circleLoad.style.setProperty("--anim", "circleLoad 1s linear");
      circleLoad.style.opacity = "1";
    }
    if (e.key === "h" || e.key === "H") {
      if (localStorage.getItem("isGuideVisible") == "true") {
        guide.style.display = "none";
        localStorage.setItem("isGuideVisible", "false");
      } else {
        guide.style.display = "";
        localStorage.setItem("isGuideVisible", "true");
      }
    }
  });
  window.addEventListener("keyup", (e) => {
    if ((e.key === "r" || e.key === "R") && isMultiplayer() == false) {
      e.preventDefault();
      clearTimeout(reloadPage);
      ReadyForReloadPage = false;
      circleLoad.classList.remove("circleLoad");
      circleLoad.style.setProperty("--anim-play-state", "paused");
      circleLoad.style.setProperty("--anim", "none");
      circleLoad.style.opacity = "0";
    }
  });
}
export function setAnimation(object, name, duration) {
  object.classList.add(name);
  setTimeout(() => {
    object.classList.remove(name);
  }, duration * 1e3);
}
