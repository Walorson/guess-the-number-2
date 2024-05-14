import { getGuess, clearGuess, setGuessMaxLength, attempts } from "../input.js";
import * as output from "../output.js";
import { init, win, rand, setRand, dead } from "../game.js";
import { printHints } from "./puzzle.js";
import { time } from "../time.js";

localStorage.setItem("Custom Mode", "true");

const min: number = Number(localStorage.getItem("min"));
const max: number = Number(localStorage.getItem("max"));

const seconds = Number(localStorage.getItem("time"));
const maxAttempts = Number(localStorage.getItem("max attempts"));

const quest: HTMLElement = document.getElementById("quest");
quest.textContent = `Guess a number from ${min} to ${max}`;

setRand(min, max);
setGuessMaxLength(String(max).length);

if(!isNaN(seconds)) {
    time.setTimerDir(-1);
    time.setTime(seconds - 1,99);
    time.forceStopTimerIf(0, "<");
    time.displaySeconds();
}

window.addEventListener("load", () => { printHints(true); });

function customGamemode(): void
{
    let guess: number = getGuess();

    if(guess == rand) {
        win();
        return;
    }
    else clearGuess();

    if(localStorage.getItem("more/less") == "true")
    {
        if(guess > rand)
        {
            output.set(output.TOO_BIG);
        }
        if(guess < rand)
        {
            output.set(output.TOO_SMALL);
        }
    }
    else
    {
        output.set(output.INCORRECT);
    }

    if(attempts >= maxAttempts && !isNaN(maxAttempts)) {
        dead();
        return;
    }
}

init(customGamemode);