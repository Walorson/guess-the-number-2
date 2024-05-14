const output: HTMLElement = document.getElementById("output");
let timeout: NodeJS.Timeout;

export function set(text: string): void {
    clearTimeout(timeout);
    output.classList.remove("outputApperance");

    output.textContent = text;
    setTimeout(() => { output.classList.add("outputApperance"); }, 10);
    timeout = setTimeout(() => {
        output.classList.remove("outputApperance");
    }, 1000);
}

export const TOO_SMALL: string = "TOO SMALL!";
export const TOO_BIG: string = "TOO BIG!";
export const INCORRECT: string = "INCORRECT!";
export const CORRECT: string = "CORRECT!";