import { writeGuess, getGuess, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { win, gameEvents } from "../game.js";

const rand = Math.floor(Math.random()*101);

window.addEventListener("keydown", writeGuess);
window.addEventListener("keydown", (e: KeyboardEvent) => 
{
    if(e.key == 'Enter')
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
});

gameEvents();