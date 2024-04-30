import { getGuess, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { init, win, rand } from "../game.js";

function classicGamemode(): void
{
    let guess = getGuess();

    if(guess > rand)
    {
        setOutput("TOO BIG!");
    }
    else if(guess < rand)
    {
        setOutput("TO SMALL!");
    }
    else win();

    if(guess != rand) clearGuess();
}

init(classicGamemode);