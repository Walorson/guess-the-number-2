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
export function setText(text: string): void {
    text = text.toUpperCase();
    output.innerHTML = `${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp;`;
}