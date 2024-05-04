export const buttonsEditable = document.querySelectorAll(".editable");
export function customGamemode() {
    buttonsEditable.forEach((button) => {
        let firstChar = false;
        window.addEventListener("keydown", (e) => {
            const span = button.querySelector("span");
            if (e.key == 'Enter') {
                if (button.classList.contains("edit")) //CONFIRM, LEAVE EDIT MODE
                 {
                    button.classList.remove("edit");
                    firstChar = false;
                    localStorage.setItem(button.getAttribute("data-info"), span.textContent);
                }
                else if (button.classList.contains("hover")) //ENTER EDIT MODE
                 {
                    button.classList.add("edit");
                }
            }
            if (button.classList.contains("edit")) {
                if (!isNaN(Number(e.key))) {
                    if (firstChar == false) {
                        span.textContent = '';
                        firstChar = true;
                    }
                    span.textContent += e.key;
                }
                if (e.key == 'Backspace') {
                    span.textContent = span.textContent.slice(0, span.textContent.length - 1);
                }
            }
        });
    });
}
window.addEventListener("load", () => {
    setDefaultIfNotExist("min", "0");
    setDefaultIfNotExist("max", "100");
    buttonsEditable.forEach((button) => {
        const span = button.querySelector("span");
        switch (button.getAttribute('data-info')) {
            case 'min':
                span.textContent = localStorage.getItem("min");
                break;
            case 'max':
                span.textContent = localStorage.getItem("max");
                break;
        }
    });
});
function setDefaultIfNotExist(name, value) {
    if (localStorage.getItem(name) == null) {
        localStorage.setItem(name, value);
    }
}
//# sourceMappingURL=customSetup.js.map