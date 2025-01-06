import { getGuess, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win } from "../game.js";
import { time } from "../time.js";
import { rand } from "../random.js";
time.setTimerDir(-1);
time.setTime(9, 99);
time.forceStopTimerIf(0, "<");
function timeGamemode() {
    let guess = getGuess();
    if (guess > rand) {
        output.set(output.TOO_BIG);
    }
    else if (guess < rand) {
        output.set(output.TOO_SMALL);
    }
    else
        win();
    if (guess != rand)
        clearGuess();
}
init(timeGamemode);
//# sourceMappingURL=time.js.map