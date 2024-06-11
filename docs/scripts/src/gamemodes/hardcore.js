import {getGuess, clearGuess} from "../input.js";
import * as output from "../output.js";
import {init, win, rand} from "../game.js";
function hardcoreGamemode() {
  let guess = getGuess();
  if (guess == rand)
    win();
  else
    output.set(output.INCORRECT);
  if (guess != rand)
    clearGuess();
}
init(hardcoreGamemode);
