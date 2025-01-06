import { getGuess, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win } from "../game.js";
import { isMultiplayer } from "../multiplayer/multiplayer-config.js";
import { printHints } from "./utility/hints.js";
import { rand } from "../random.js";
function puzzleGamemode() {
    let guess = getGuess();
    if (guess == rand)
        win();
    else
        output.set(output.INCORRECT);
    if (guess != rand)
        clearGuess();
}
window.addEventListener("load", () => {
    if (!isMultiplayer())
        printHints(rand);
});
window.addEventListener("load", () => {
    if (localStorage.getItem("Custom Mode") != "true")
        init(puzzleGamemode);
});
//# sourceMappingURL=puzzle.js.map