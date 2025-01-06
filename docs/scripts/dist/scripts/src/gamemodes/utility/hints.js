const features = {
    even: false,
    divisibleBy3: false,
    prime: true,
    graterThanHalf: false,
    inFibonacciSequence: false
};
const hint = document.getElementById("hint");
export function printHints(random, customMode = false) {
    if (localStorage.getItem("Hints") == "false" && localStorage.getItem("Custom Mode") == "true")
        return;
    let half;
    if (customMode == true && localStorage.getItem("max") != null) {
        half = Math.floor(Number(localStorage.getItem("max")) / 2);
    }
    else {
        half = 50;
    }
    if (random > half)
        features.graterThanHalf = true;
    if (random % 2 == 0)
        features.even = true;
    if (random % 3 == 0)
        features.divisibleBy3 = true;
    if (features.even == false && features.divisibleBy3 == false) {
        if (random == 1) {
            features.prime = false;
            return;
        }
        for (let i = 4; i <= Math.floor(Math.sqrt(random)); i++) {
            if (random % i == 0) {
                features.prime = false;
                break;
            }
        }
    }
    else if (random != 3 && random != 2) {
        features.prime = false;
    }
    features.inFibonacciSequence = isInFibonacciSequence(random);
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
        else
            hint.innerHTML += "NOT prime, &nbsp;";
    }
    if (customMode == true && localStorage.getItem("Fibonacci Sequence") == "true" || customMode == false) {
        if (features.inFibonacciSequence == true)
            hint.innerHTML += "in Fibonacci Sequence, &nbsp;";
        else
            hint.innerHTML += "NOT in Fibonacci Sequence, &nbsp;";
    }
    if (customMode == true && localStorage.getItem("Greater Than Half") == "true" || customMode == false) {
        if (features.graterThanHalf == true)
            hint.innerHTML += "greater than half, &nbsp;";
        else
            hint.innerHTML += "less than or equal to half, &nbsp;";
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
export function printOneChanceHint(rand) {
    hint.innerHTML = "You have only one chance to guess. I'll tell you the number is ";
    if (rand % 2 == 0)
        hint.innerHTML += "even";
    else
        hint.innerHTML += "odd";
}
export function setHint(text) {
    document.getElementById("hint").textContent = text;
}
//# sourceMappingURL=hints.js.map