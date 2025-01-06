const output = document.getElementById("output");
let timeout;
export function set(text) {
    clearTimeout(timeout);
    output.classList.remove("outputApperance");
    output.textContent = text;
    setTimeout(() => { output.classList.add("outputApperance"); }, 10);
    timeout = setTimeout(() => {
        output.classList.remove("outputApperance");
    }, 1000);
}
export function setText(text) {
    text = text.toUpperCase();
    output.innerHTML = `${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp;`;
}
//# sourceMappingURL=output.js.map