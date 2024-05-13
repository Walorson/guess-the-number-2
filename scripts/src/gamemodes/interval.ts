import { getGuess, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win, rand, setRand, setAnimation } from "../game.js";

const questDiv: HTMLElement = document.getElementById("quest");
const hintDiv: HTMLElement = document.getElementById("hint");
const input: HTMLElement = document.getElementById("input");
const min: number = Math.floor(Math.random()*150);
const max: number = Math.floor(Math.random()*300) + min;

let isMinGuess: boolean = false;

setRand(min, max);
console.log(min, max)
hintDiv.textContent = rand+" is in the interval <???, ???>";

function intervalGamemode(): void
{
    let guess: number = getGuess();

    let intervalBound: number;
    if(isMinGuess == false)
        intervalBound = min;
    else
        intervalBound = max;

    if(guess > intervalBound)
    {
        output.set(output.TOO_BIG);
    }
    else if(guess < intervalBound)
    {
        output.set(output.TOO_SMALL);
    }
    else if(isMinGuess == false) {
        isMinGuess = true;
        hintDiv.textContent = rand+` is in the interval <${min}, ???>`;
        questDiv.textContent = `Guess an interval. Guess the upper bound of the interval.`;

        setAnimation(input, "correctEffect", 0.75);

        output.set(output.CORRECT);
    }
    else {
        hintDiv.textContent = rand+` is in the interval <${min}, ${max}>`;
        input.textContent = `<${min},${max}>`;
        win();

        return;
    }

    if(guess != rand) clearGuess();
}

init(intervalGamemode);