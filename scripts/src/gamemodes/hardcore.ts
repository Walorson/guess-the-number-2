import { getGuess, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { init, win, rand } from "../game.js";

function hardcoreGamemode(): void
{
    let guess = getGuess();

    if(guess == rand) win();
    else setOutput("INCORRECT");

    if(guess != rand) clearGuess();
}

init(hardcoreGamemode);