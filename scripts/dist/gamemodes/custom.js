import { getGuess, clearGuess, setGuessMaxLength } from "../input.js";
import { setOutput } from "../output.js";
import { init, win, rand, setRand } from "../game.js";
const min = localStorage.getItem("min");
const max = localStorage.getItem("max");
const quest = document.getElementById("quest");
quest.textContent = `Guess a number from ${min} to ${max}`;
setRand(Number(min), Number(max));
setGuessMaxLength(max.length);
function customGamemode() {
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
init(customGamemode);
//# sourceMappingURL=custom.js.map