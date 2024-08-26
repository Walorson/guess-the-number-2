import { getGuess, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win, dead } from "../game.js";
import { rand } from "../random.js";

const healthDiv: HTMLElement = document.getElementById("health");
const hint: HTMLElement = document.getElementById("hint");
let health: number = 80;
const damage: number = 10;

healthDiv.textContent = "Health: "+health;
hint.textContent = `You have only ${health} HP. Be careful with your guesses.`;

function healthGamemode(): void
{
    let guess: number = getGuess();

    if(guess > rand)
    {
        output.set(output.TOO_BIG);
    }
    else if(guess < rand)
    {
        output.set(output.TOO_SMALL);
    }
    else win();

    if(guess != rand) 
    {
        health -= damage;
        healthDiv.textContent = "Health: "+health;

        if(health <= 0) {
            dead();
            return;
        }

        clearGuess();
    }
}

init(healthGamemode);