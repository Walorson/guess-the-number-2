import { getGuess, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win, rand, setRand } from "../game.js";

const min: number = Math.floor(Math.random()*150);
const max: number = Math.floor(Math.random()*300) + min;

setRand(min, max);

function blindGamemode(): void
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
    else {
        win();
        document.getElementById("quest").textContent = `Guess a number from ${min} to ${max}`;
    }

    if(guess != rand) clearGuess();
}

init(blindGamemode);