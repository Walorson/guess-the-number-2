import { getGuess, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win } from "../game.js";
import { rand } from "../random.js";
import { loadLanguage } from "../languages/language.js";
const lang: any = await loadLanguage();

function classicGamemode(): void
{
    let guess: number = getGuess();

    if(guess > rand)
    {
        output.set(lang.TOO_BIG);
    }
    else if(guess < rand)
    {
        output.set(lang.TOO_SMALL);
    }
    else win();

    if(guess != rand) clearGuess();
}

init(classicGamemode);