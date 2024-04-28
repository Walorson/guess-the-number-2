import { getGuess, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { win, gameEvents, rand } from "../game.js";
const hint = document.getElementById("hint");
const features = {
    even: false,
    divisibleBy3: false,
    prime: true,
    graterThan50: false
};
window.addEventListener("load", () => {
    if (rand > 50)
        features.graterThan50 = true;
    if (rand % 2 == 0)
        features.even = true;
    if (rand % 3 == 0)
        features.divisibleBy3 = true;
    if (features.even == false && features.divisibleBy3 == false) {
        for (let i = 4; i < rand; i++) {
            if (rand % i == 0) {
                features.prime = false;
                break;
            }
        }
    }
    else
        features.prime = false;
    hint.textContent = "The number is: ";
    if (features.even == true)
        hint.textContent += "even, ";
    else
        hint.textContent += "odd, ";
    if (features.divisibleBy3 == true)
        hint.textContent += "divisible by 3, ";
    if (features.prime == true)
        hint.textContent += "prime, ";
    if (features.graterThan50 == true)
        hint.textContent += "greater than 50.";
    else
        hint.textContent += "less than 50.";
});
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
//# sourceMappingURL=puzzle.js.map