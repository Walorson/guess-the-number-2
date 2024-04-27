import { getGuess, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { win, gameEvents } from "../game.js";
const rand = Math.floor(Math.random() * 101);
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