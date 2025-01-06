import {getGuess, clearGuess} from "../input.js";
import * as output from "../output.js";
import {init, win, setAnimation} from "../game.js";
import {rand, setRand} from "../random.js";
import {setHint} from "./utility/hints.js";
import {isMultiplayer} from "../multiplayer/multiplayer-config.js";
import {setMinMax} from "./utility/setMinMax.js";
import {loadLanguage} from "../languages/language.js";
const lang = await loadLanguage();
const questDiv = document.getElementById("quest");
const input = document.getElementById("input");
let min;
let max;
let isMinGuess = false;
window.addEventListener("load", () => {
  setMinMax(Math.floor(Math.random() * 150), 333);
  console.log(min, max);
  setRand(min, max);
  if (isMultiplayer() == false)
    setHint(rand + " is in the interval <???, ???>");
});
function intervalGamemode() {
  let guess = getGuess();
  let intervalBound;
  if (isMinGuess == false)
    intervalBound = min;
  else
    intervalBound = max;
  if (guess > intervalBound) {
    output.set(lang.TOO_BIG);
  } else if (guess < intervalBound) {
    output.set(lang.TOO_SMALL);
  } else if (isMinGuess == false) {
    isMinGuess = true;
    setHint(rand + ` is in the interval <${min}, ???>`);
    questDiv.textContent = `Guess an interval. Guess the upper bound of the interval.`;
    setAnimation(input, "correctEffect", 0.75);
    output.set(lang.CORRECT);
  } else {
    setHint(rand + ` is in the interval <${min}, ${max}>`);
    input.textContent = `<${min},${max}>`;
    win();
    return;
  }
  clearGuess();
}
export function setMin(num) {
  min = num;
}
export function setMax(num) {
  max = num;
}
init(intervalGamemode);
