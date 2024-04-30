import { getGuess, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { init, win, dead, rand } from "../game.js";
const healthDiv = document.getElementById("health");
let health = 100;
const damage = 10;
function healthGamemode() {
    let guess = getGuess();
    if (guess > rand) {
        setOutput("TOO BIG!");
    }
    else if (guess < rand) {
        setOutput("TO SMALL!");
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