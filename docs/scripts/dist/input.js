import { time } from './time.js';
const input = document.getElementById("input");
const lastGuessDiv = document.getElementById("lastGuess");
const attemptsDiv = document.getElementById("attempts");
export let guess = "0";
let lastGuess = guess;
let guessMaxLength = 3;
export let attempts = 0;
export function setGuessMaxLength(value) {
    guessMaxLength = value;
}
export function writeGuess(e) {
    if (isNaN(Number(e.key)) == false) {
        if (guess == '0' && e.key != '0')
            guess = "";
        if (guess[0] != '0' && guess.length < guessMaxLength)
            guess += e.key;
        input.textContent = guess;
    }
    else if (e.key == 'Backspace') {
        guess = guess.slice(0, guess.length - 1);
        if (guess.length <= 0)
            guess = "0";
        input.textContent = guess;
    }
    else if (e.key == 'ArrowUp') {
        input.textContent = lastGuess;
        guess = lastGuess;
    }
}
window.addEventListener("keydown", writeGuess);
export function getGuess() {
    if (attempts <= 0)
        time.startTimer();
    attempts++;
    attemptsDiv.textContent = "Attempts: " + attempts;
    lastGuess = guess;
    return Number(guess);
}
export function clearGuess() {
    lastGuessDiv.textContent = lastGuess;
    guess = "0";
    input.textContent = "0";
}
//# sourceMappingURL=input.js.map