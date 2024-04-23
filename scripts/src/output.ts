const output: HTMLElement = document.getElementById("output");
let timeout: any;

export function setOutput(text: string): void {
    clearTimeout(timeout);
    output.classList.remove("outputApperance");

    output.textContent = text;
    setTimeout(() => { output.classList.add("outputApperance"); }, 10);
    timeout = setTimeout(() => {
        output.classList.remove("outputApperance");
    }, 1000);
}