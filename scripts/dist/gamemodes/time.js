import { getGuess, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { init, win, rand } from "../game.js";
import { time } from "../time.js";
time.setTimerDir(-1);
time.setTime(9, 99);
time.forceStopTimerIf(0, "<");
function timeGamemode() {
    let guess = getGuess();
    if (guess > rand) {
        setOutput("TOO BIG!");
    }
    else if (guess < rand) {
        setOutput("TO SMALL!");
    }
    else
        win();
    if (guess != rand)
        clearGuess();
}
init(timeGamemode);
//# sourceMappingURL=time.js.map