import { customGamemode, editMode } from "./customSetup.js";
export let buttons = document.getElementById("main").querySelectorAll("button");
let menuChosen = "main";
export let index;
let buttonsMax = buttons.length - 1;
let last;
let keyboardUse = false;
window.addEventListener("load", () => { assignClickEventForButtons(); customGamemode(); });
window.addEventListener("keydown", (e) => {
    if (editMode == true)
        return;
    keyboardUse = true;
    changeButton(e);
});
window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        eval(buttons[index].getAttribute("data-click"));
    }
});
window.addEventListener("mousemove", () => {
    if (keyboardUse == true) {
        keyboardUse = false;
        buttons[index].classList.remove('hover');
        index = undefined;
    }
});
function changeButton(e) {
    if (e.key != "ArrowUp" && e.key != "ArrowDown")
        return;
    if (index == undefined) {
        index = 0;
    }
    else if (e.key == 'ArrowUp') {
        index--;
        if (index < 0)
            index = buttonsMax;
    }
    else if (e.key == 'ArrowDown') {
        index++;
        if (index > buttonsMax)
            index = 0;
    }
    /*buttonsEditable.forEach((btn: HTMLButtonElement) =>
    {
        if(btn.classList.contains("edit"))
            btn.classList.remove("edit");
    });*/
    if (last != undefined)
        last.classList.remove("hover");
    buttons[index].classList.add("hover");
    last = buttons[index];
}
function changeMenu(name) {
    setTimeout(() => {
        if (last != undefined)
            last.classList.remove("hover");
        document.getElementById(menuChosen).style.display = 'none';
        document.getElementById(name).style.display = 'flex';
        menuChosen = name;
        assignClickEventForButtons();
        resetButtonHoverPosition(name);
    });
}
function resetButtonHoverPosition(name) {
    if (keyboardUse == false)
        return;
    index = 0;
    buttons[index].classList.add("hover");
    last = buttons[index];
}
function assignClickEventForButtons() {
    buttons = document.getElementById(menuChosen).querySelectorAll("button");
    buttonsMax = buttons.length - 1;
    buttons.forEach((button) => {
        button.onclick = () => {
            eval(button.getAttribute("data-click"));
        };
    });
}
//# sourceMappingURL=menu.js.map