import { getGuess, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win, setAnimation } from "../game.js";
import { rand, setRand } from "../random.js";
import { setHint } from "./utility/hints.js";
import { isMultiplayer } from "../multiplayer/multiplayer-config.js";
import { setMinMax } from "./utility/setMinMax.js";

const questDiv: HTMLElement = document.getElementById("quest");
const input: HTMLElement = document.getElementById("input");
let min: number;
let max: number;
let isMinGuess: boolean = false;

window.addEventListener("load", () => {
    setMinMax(Math.floor(Math.random()*150), 333);
    console.log(min, max)
    setRand(min, max);

    if(isMultiplayer() == false)
        setHint(rand+" is in the interval <???, ???>");
});

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
        setHint(rand+` is in the interval <${min}, ???>`);
        questDiv.textContent = `Guess an interval. Guess the upper bound of the interval.`;

        setAnimation(input, "correctEffect", 0.75);

        output.set(output.CORRECT);
    }
    else {
        setHint(rand+` is in the interval <${min}, ${max}>`);
        input.textContent = `<${min},${max}>`;
        win();

        return;
    }

    clearGuess();
}

export function setMin(num: number)
{
    min = num;
}
export function setMax(num: number)
{
    max = num;
}

init(intervalGamemode);