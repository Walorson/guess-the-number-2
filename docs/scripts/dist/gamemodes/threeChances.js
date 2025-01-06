import { getGuess, setGuessMaxLength, attempts, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win, dead } from "../game.js";
import { rand, setRand } from "../random.js";
import { loadLanguage } from "../languages/language.js";
const lang = await loadLanguage();
setRand(0, 20);
setGuessMaxLength(2);
function threeChancesGamemode() {
    let guess = getGuess();
    if (guess > rand) {
        output.set(lang.TOO_BIG);
    }
    else if (guess < rand) {
        output.set(lang.TOO_SMALL);
    }
    else {
        win();
        return;
    }
    if (attempts >= 3) {
        dead();
        return;
    }
    if (guess != rand)
        clearGuess();
}
init(threeChancesGamemode);
//# sourceMappingURL=threeChances.js.map