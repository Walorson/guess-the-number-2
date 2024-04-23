const input: HTMLElement = document.getElementById("input");
let guess: string = "0";
let guessMaxLength: number = 3;

function writeGuess(e: KeyboardEvent): void
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

function getGuess(): number {
    return Number(guess);
}

export { writeGuess, getGuess }