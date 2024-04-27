let buttons = document.getElementById("main").querySelectorAll("button");
let menuChosen = "main";
let index;
let buttonsMax = buttons.length - 1;
let last;
let keyboardUse = false;
window.addEventListener("load", () => { assignClickEventForButtons(); });
window.addEventListener("keydown", (e) => {
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
    if (last != undefined)
        last.classList.remove("hover");
    buttons[index].classList.add("hover");
    last = buttons[index];
}
function changeMenu(name) {
    if (last != undefined)
        last.classList.remove("hover");
    document.getElementById(menuChosen).style.display = 'none';
    document.getElementById(name).style.display = 'flex';
    menuChosen = name;
    assignClickEventForButtons();
    resetButtonHoverPosition(name);
}
function resetButtonHoverPosition(name) {
    if (keyboardUse == false)
        return;
    buttonsMax = buttons.length - 1;
    index = 0;
    buttons[index].classList.add("hover");
    last = buttons[index];
}
function assignClickEventForButtons() {
    buttons = document.getElementById(menuChosen).querySelectorAll("button");
    buttons.forEach((button) => {
        button.onclick = () => {
            eval(button.getAttribute("data-click"));
        };
    });
}
export {};
//# sourceMappingURL=menu.js.map