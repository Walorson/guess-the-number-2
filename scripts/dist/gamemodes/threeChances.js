import { getGuess, setGuessMaxLength, attempts, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { init, win, dead, rand, setRand } from "../game.js";
setRand(0, 20);
setGuessMaxLength(2);
function threeChancesGamemode() {
    let guess = getGuess();
    if (guess > rand) {
        setOutput("TOO BIG!");
    }
    else if (guess < rand) {
        setOutput("TO SMALL!");
    }
    else
        win();
    if (attempts >= 3) {
        dead();
        return;
    }
    if (guess != rand)
        clearGuess();
}
init(threeChancesGamemode);
//# sourceMappingURL=threeChances.js.map