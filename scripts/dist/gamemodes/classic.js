import { writeGuess, getGuess } from "../input.js";
import { setOutput } from "../output.js";
const rand = Math.floor(Math.random() * 101);
window.addEventListener("keydown", writeGuess);
window.addEventListener("keydown", (e) => {
    if (e.key == 'Enter') {
        let guess = getGuess();
        if (guess > rand) {
            setOutput("TOO BIG!");
        }
        else if (guess < rand) {
            setOutput("TO SMALL!");
        }
        else
            setOutput("CORRECT!");
    }
});
//# sourceMappingURL=classic.js.map