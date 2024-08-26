import { getGuess, clearGuess } from "../input.js";
import * as output from "../output.js";
import { init, win } from "../game.js";
import { rand, setRand } from "../random.js"
import { getRandomInterval, revealInterval } from "./utility/interval.js";
import { isMultiplayer } from "../multiplayer/multiplayer-config.js";

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

        if(isMultiplayer() == false)
            revealInterval(interval[0], interval[1]);
    }

    if(guess != rand) clearGuess();
}

const interval: number[] = getRandomInterval();

setRand(interval[0], interval[1]);
init(blindGamemode);