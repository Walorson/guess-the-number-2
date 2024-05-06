import { getGuess, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { init, win, rand } from "../game.js";
const hint = document.getElementById("hint");
const features = {
    even: false,
    divisibleBy3: false,
    prime: true,
    graterThanHalf: false,
    inFibonacciSequence: isInFibonacciSequence(rand)
};
function puzzleGamemode() {
    let guess = getGuess();
    if (guess == rand)
        win();
    else
        setOutput("INCORRECT");
    if (guess != rand)
        clearGuess();
}
window.addEventListener("load", () => printHints());
export function printHints(customMode = false) {
    if (customMode == true && localStorage.getItem("Hints") == "false" || localStorage.getItem("Hints") == "false")
        return;
    let half;
    if (customMode == true && localStorage.getItem("max") != null) {
        half = Math.floor(Number(localStorage.getItem("max")) / 2);
    }
    else {
        half = 50;
    }
    if (rand > half)
        features.graterThanHalf = true;
    if (rand % 2 == 0)
        features.even = true;
    if (rand % 3 == 0)
        features.divisibleBy3 = true;
    if (features.even == false && features.divisibleBy3 == false) {
        for (let i = 4; i < rand; i++) {
            if (rand % i == 0) {
                features.prime = false;
                break;
            }
        }
    }
    else
        features.prime = false;
    hint.innerHTML = '<span class="faint">The number is: </span>';
    if (customMode == true && localStorage.getItem("Parity") == "true" || customMode == false) {
        if (features.even == true)
            hint.innerHTML += "even, &nbsp;";
        else
            hint.innerHTML += "odd, &nbsp;";
    }
    if (customMode == true && localStorage.getItem("Divisible By 3") == "true" || customMode == false) {
        if (features.divisibleBy3 == true)
            hint.innerHTML += "divisible by 3, &nbsp;";
        else
            hint.innerHTML += "NOT divisible by 3, &nbsp;";
    }
    if (customMode == true && localStorage.getItem("Prime") == "true" || customMode == false) {
        if (features.prime == true)
            hint.innerHTML += "prime, &nbsp;";
    }
    if (customMode == true && localStorage.getItem("Fibonacci Sequence") == "true" || customMode == false) {
        if (features.inFibonacciSequence == true)
            hint.innerHTML += "in Fibonacci Sequence, &nbsp;";
    }
    if (customMode == true && localStorage.getItem("Greater Than Half") == "true" || customMode == false) {
        if (features.graterThanHalf == true)
            hint.innerHTML += "greater than half,";
        else
            hint.innerHTML += "less than or equal to half,";
    }
    hint.innerHTML = hint.innerHTML.slice(0, hint.innerHTML.length - 8) + ".";
}
function isInFibonacciSequence(num) {
    let n1 = 1;
    let n2 = 1;
    let temp;
    if (num < 1)
        return false;
    else if (num == n1)
        return true;
    for (let i = 0; i < Infinity; i++) {
        temp = n1 + n2;
        if (num == temp)
            return true;
        else if (temp > num)
            return false;
        if (i % 2 == 0)
            n1 = temp;
        else
            n2 = temp;
    }
}
window.addEventListener("load", () => {
    if (localStorage.getItem("Custom Mode") != "true")
        init(puzzleGamemode);
});
//# sourceMappingURL=puzzle.js.map