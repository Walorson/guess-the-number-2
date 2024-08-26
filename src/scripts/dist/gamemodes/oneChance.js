import { getGuess, setGuessMaxLength } from "../input.js";
import { init, win, dead } from "../game.js";
import { rand, setRand } from "../random.js";
const hint = document.getElementById("hint");
setRand(0, 10);
setGuessMaxLength(2);
hint.innerHTML = "You have only one chance to guess. I'll tell you the number is ";
if (rand % 2 == 0)
    hint.innerHTML += "even";
else
    hint.innerHTML += "odd";
function oneChanceGamemode() {
    let guess = getGuess();
    if (guess == rand)
        win();
    else
        dead();
}
init(oneChanceGamemode);
//# sourceMappingURL=oneChance.js.map