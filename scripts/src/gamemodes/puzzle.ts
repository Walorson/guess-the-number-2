import { getGuess, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { win, gameEvents, rand } from "../game.js";

const hint: HTMLElement = document.getElementById("hint");

type Features = {
    even: boolean,
    divisibleBy3: boolean,
    prime: boolean,
    graterThan50: boolean,
    inFibonacciSequence: boolean
}

const features: Features = {
    even: false,
    divisibleBy3: false,
    prime: true,
    graterThan50: false,
    inFibonacciSequence: isInFibonacciSequence(rand)
};

window.addEventListener("load", () => {
    if(rand > 50) features.graterThan50 = true;
    if(rand % 2 == 0) features.even = true;
    if(rand % 3 == 0) features.divisibleBy3 = true;

    if(features.even == false && features.divisibleBy3 == false)
    {
        for(let i=4; i<rand; i++)
        {
            if(rand % i == 0) {
                features.prime = false;
                break;
            }
        }
    }
    else features.prime = false;

    hint.innerHTML = '<span class="faint">The number is: </span>';

    if(features.even == true) hint.innerHTML += "even, &nbsp;";
    else hint.innerHTML += "odd, &nbsp;"

    if(features.divisibleBy3 == true) hint.innerHTML += "divisible by 3, &nbsp;";
    else hint.innerHTML += "NOT divisible by 3, &nbsp;";

    if(features.prime == true) hint.innerHTML += "prime, &nbsp;";

    if(features.inFibonacciSequence == true) hint.innerHTML += "in Fibonacci Sequence, &nbsp;";

    if(features.graterThan50 == true) hint.innerHTML += "greater than 50.";
    else hint.innerHTML += "less than or equal to 50.";

});

window.addEventListener("keydown", (e: KeyboardEvent) => 
{
    if(e.key == 'Enter')
    {
        let guess = getGuess();

        if(guess == rand) win();
        else setOutput("INCORRECT");

        if(guess != rand) clearGuess();
    }
});

gameEvents();

function isInFibonacciSequence(num: number): boolean
{
    let n1: number = 1;
    let n2: number = 1;
    let temp: number;

    if(num < 1) return false;
    else if(num == n1) return true;

    for(let i=0; i < Infinity; i++)
    {   
        temp = n1 + n2;
        if(num == temp) return true;
        else if(temp > num) return false;

        if(i % 2 == 0)
            n1 = temp;
        else
            n2 = temp;
    }
}