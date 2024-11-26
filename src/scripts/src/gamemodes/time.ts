import { getGuess, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win } from "../game.js";
import { time } from "../time.js";
import { rand } from "../random.js";
import { loadLanguage } from "../languages/language.js";
const lang: any = await loadLanguage();

time.setTimerDir(-1);
time.setTime(9,99);
time.forceStopTimerIf(0, "<");

function timeGamemode(): void
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

init(timeGamemode);