import { getGuess, setGuessMaxLength } from "../input.js";
import { init, win, dead } from "../game.js";
import { rand, setRand } from "../random.js";
import { printOneChanceHint } from "./utility/hints.js";
setRand(0, 10);
setGuessMaxLength(2);
printOneChanceHint(rand);
function oneChanceGamemode() {
    let guess = getGuess();
    if (guess == rand)
        win();
    else
        dead();
}
init(oneChanceGamemode);
//# sourceMappingURL=oneChance.js.map