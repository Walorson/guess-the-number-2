import { time } from './time.js';
const input = document.getElementById("input");
const lastGuess = document.getElementById("lastGuess");
const attemptsDiv = document.getElementById("attempts");
let guess = "0";
let guessMaxLength = 3;
let attempts = 0;
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
}
window.addEventListener("keydown", writeGuess);
export function getGuess() {
    if (attempts <= 0)
        time.startTimer();
    attempts++;
    attemptsDiv.textContent = "Attempts: " + attempts;
    return Number(guess);
}
export function clearGuess() {
    lastGuess.textContent = guess;
    guess = "0";
    input.textContent = "0";
}
//# sourceMappingURL=input.js.map