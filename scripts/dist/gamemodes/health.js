import { getGuess, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win, dead, rand } from "../game.js";
const healthDiv = document.getElementById("health");
const hint = document.getElementById("hint");
let health = 80;
const damage = 10;
healthDiv.textContent = "Health: " + health;
hint.textContent = `You have only ${health} HP. Be careful with your guesses.`;
function healthGamemode() {
    let guess = getGuess();
    if (guess > rand) {
        output.set(output.TOO_BIG);
    }
    else if (guess < rand) {
        output.set(output.TOO_SMALL);
    }
    else
        win();
    if (guess != rand) {
        health -= damage;
        healthDiv.textContent = "Health: " + health;
        if (health <= 0) {
            dead();
            return;
        }
        clearGuess();
    }
}
init(healthGamemode);
//# sourceMappingURL=health.js.map