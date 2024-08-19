const output = document.getElementById("output");
let timeout;
export function set(text) {
  clearTimeout(timeout);
  output.classList.remove("outputApperance");
  output.textContent = text;
  setTimeout(() => {
    output.classList.add("outputApperance");
  }, 10);
  timeout = setTimeout(() => {
    output.classList.remove("outputApperance");
  }, 1e3);
}
export function setText(text) {
  text = text.toUpperCase();
  output.innerHTML = `${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp;`;
}
export const TOO_SMALL = "TOO SMALL!";
export const TOO_BIG = "TOO BIG!";
export const INCORRECT = "INCORRECT!";
export const CORRECT = "CORRECT!";
