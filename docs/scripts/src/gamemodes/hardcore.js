import {getGuess, clearGuess} from "../input.js";
import * as output from "../output.js";
import {init, win} from "../game.js";
import {rand} from "../random.js";
import {loadLanguage} from "../languages/language.js";
const lang = await loadLanguage();
function hardcoreGamemode() {
  let guess = getGuess();
  if (guess == rand)
    win();
  else
    output.set(lang.INCORRECT);
  if (guess != rand)
    clearGuess();
}
init(hardcoreGamemode);
