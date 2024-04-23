const output = document.getElementById("output");
let timeout;
export function setOutput(text) {
    clearTimeout(timeout);
    output.classList.remove("outputApperance");
    output.textContent = text;
    setTimeout(() => { output.classList.add("outputApperance"); }, 10);
    timeout = setTimeout(() => {
        output.classList.remove("outputApperance");
    }, 1000);
}
//# sourceMappingURL=output.js.map