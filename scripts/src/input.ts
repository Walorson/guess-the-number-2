import { startTimer } from './game.js'

const input: HTMLElement = document.getElementById("input");
const lastGuess: HTMLElement = document.getElementById("lastGuess");
const attemptsDiv: HTMLElement = document.getElementById("attempts");

let guess: string = "0";
let guessMaxLength: number = 3;
let attempts: number = 0;

export function writeGuess(e: KeyboardEvent): void
{
    if(isNaN(Number(e.key)) == false)
    {
        if(guess == '0' && e.key != '0')
            guess = "";

        if(guess[0] != '0' && guess.length < guessMaxLength)
            guess += e.key;

        input.textContent = guess;
    }
    else if(e.key == 'Backspace')
    {
        guess = guess.slice(0, guess.length-1);

        if(guess.length <= 0)
            guess = "0";

        input.textContent = guess;
    }
}
window.addEventListener("keydown", writeGuess);

export function getGuess(): number {
    if(attempts <= 0)
        startTimer();

    attempts++;
    attemptsDiv.textContent = "Attempts: "+attempts;
    return Number(guess);
}
export function clearGuess(): void {
    lastGuess.textContent = guess; 
    guess = "0"; 
    input.textContent = "0";
}

