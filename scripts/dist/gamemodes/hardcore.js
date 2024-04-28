import { getGuess, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { win, gameEvents, rand } from "../game.js";
window.addEventListener("keydown", (e) => {
    if (e.key == 'Enter') {
        let guess = getGuess();
        if (guess == rand)
            win();
        else
            setOutput("INCORRECT");
        if (guess != rand)
            clearGuess();
    }
});
gameEvents();
//# sourceMappingURL=hardcore.js.map