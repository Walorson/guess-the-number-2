import {getGuess, clearGuess} from "../input.js";
import * as output from "../output.js";
import {init, win, rand} from "../game.js";
function classicGamemode() {
  let guess = getGuess();
  if (guess > rand) {
    output.set(output.TOO_BIG);
  } else if (guess < rand) {
    output.set(output.TOO_SMALL);
  } else
    win();
  if (guess != rand)
    clearGuess();
}
init(classicGamemode);
