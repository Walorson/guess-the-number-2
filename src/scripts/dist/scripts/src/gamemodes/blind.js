import { getGuess, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win } from "../game.js";
import { rand, setRand } from "../random.js";
import { getRandomInterval, revealInterval } from "./utility/interval.js";
import { isMultiplayer } from "../multiplayer/multiplayer-config.js";
import * as lang from "../../../languages/english.js";
function blindGamemode() {
    let guess = getGuess();
    if (guess > rand) {
        output.set(lang.TOO_BIG);
    }
    else if (guess < rand) {
        output.set(lang.TOO_SMALL);
    }
    else {
        win();
        if (isMultiplayer() == false)
            revealInterval(interval[0], interval[1]);
    }
    if (guess != rand)
        clearGuess();
}
const interval = getRandomInterval();
setRand(interval[0], interval[1]);
init(blindGamemode);
//# sourceMappingURL=blind.js.map