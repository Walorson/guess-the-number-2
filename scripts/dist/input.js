const input = document.getElementById("input");
let guess = "0";
let guessMaxLength = 3;
function writeGuess(e) {
    if (isNaN(Number(e.key)) == false) {
        if (guess == '0' && e.key != '0')
            guess = "";
        if (e.key != '0' && guess.length < guessMaxLength)
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
function getGuess(e) {
    if (e.key == 'Enter')
        return Number(guess);
}
export { writeGuess, getGuess };
//# sourceMappingURL=input.js.map