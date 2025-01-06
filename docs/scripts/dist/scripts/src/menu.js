import { customGamemode, editMode } from "./customSetup.js";
import { connectToServer, createLobby, startGame } from "./multiplayer/menu-client.js";
import { changeBackground, changeColor, changeFont } from "./theme.js";
localStorage.setItem("Custom Mode", "false");
export let buttons = document.getElementById("main").querySelectorAll("button");
export let menuChosen = "main";
export let index;
let doubleMenu = false;
let buttonsMax = buttons.length - 1;
let last;
let keyboardUse = false;
window.addEventListener("load", () => {
    assignClickEventForButtons();
    customGamemode();
    changeColor(localStorage.getItem("Color"));
    changeBackground(localStorage.getItem("Background"));
    changeFont(localStorage.getItem("Font"));
});
window.addEventListener("keydown", (e) => {
    if (editMode == true)
        return;
    changeButton(e);
});
window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        eval(buttons[index].getAttribute("data-click"));
        if (buttons[index].hasAttribute("connecttoserver")) {
            connectToServer();
        }
        if (buttons[index].hasAttribute("createlobby")) {
            createLobby();
        }
        if (buttons[index].hasAttribute("startgame")) {
            startGame();
        }
    }
});
window.addEventListener("mousemove", () => {
    if (keyboardUse == true && editMode == false) {
        keyboardUse = false;
        buttons[index].classList.remove('hover');
        index = undefined;
    }
});
function changeButton(e) {
    if (e.key != "ArrowUp" && e.key != "ArrowDown" && e.key != "ArrowRight" && e.key != "ArrowLeft")
        return;
    keyboardUse = true;
    if (index == undefined) {
        index = 0;
    }
    else if (e.key == 'ArrowUp') {
        if (doubleMenu == false)
            index--;
        else
            index -= 2;
        if (index < 0)
            index = buttonsMax;
    }
    else if (e.key == 'ArrowDown') {
        if (doubleMenu == false || (doubleMenu == true && index == buttonsMax - 1))
            index++;
        else
            index += 2;
        if (index > buttonsMax)
            index = 0;
    }
    else if (e.key == 'ArrowRight' && doubleMenu) {
        index++;
        if (index > buttonsMax)
            index = 0;
    }
    else if (e.key == 'ArrowLeft' && doubleMenu) {
        index--;
        if (index < 0)
            index = buttonsMax;
    }
    if (last != undefined)
        last.classList.remove("hover");
    buttons[index].classList.add("hover");
    last = buttons[index];
}
export function changeMenu(name) {
    setTimeout(() => {
        if (last != undefined)
            last.classList.remove("hover");
        document.getElementById(menuChosen).style.display = 'none';
        document.getElementById(name).style.display = 'flex';
        menuChosen = name;
        if (document.getElementById(name).querySelector(".double-menu")) {
            doubleMenu = true;
        }
        else {
            doubleMenu = false;
        }
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
            if (button.hasAttribute("connecttoserver")) {
                connectToServer();
            }
            if (button.hasAttribute("createlobby")) {
                createLobby();
            }
            if (button.hasAttribute("startgame")) {
                startGame();
            }
        };
    });
}
//# sourceMappingURL=menu.js.map