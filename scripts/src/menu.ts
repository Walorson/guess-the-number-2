import fs from 'fs';

let buttons = document.getElementById("main").querySelectorAll("button");
let menuChosen: string = "main";
let index: number;
let buttonsMax: number = buttons.length-1;
let last: HTMLElement;

window.addEventListener("keydown", (e: KeyboardEvent) => 
{
    changeButton(e);
});

window.addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        eval(buttons[index].getAttribute("data-click"));
    }
});

buttons.forEach((button: HTMLElement) => {
    button.addEventListener("click", () => {
        eval(button.getAttribute("data-click"));
    });
});

function changeButton(e: KeyboardEvent): void
{
    if(e.key != "ArrowUp" && e.key != "ArrowDown") return;

    if(index == undefined) 
    {
        index = 0;
    }
    else if(e.key == 'ArrowUp')
    {
        index--;
        if(index < 0) index = buttonsMax;
    }
    else if(e.key == 'ArrowDown')
    {
        index++;
        if(index > buttonsMax) index = 0;
    }

    if(last != undefined)
        last.classList.remove("hover");

    buttons[index].classList.add("hover");
    last = buttons[index];
}

function changeMenu(name: string) 
{
    if(last != undefined)
        last.classList.remove("hover");

    document.getElementById(menuChosen).style.display = 'none';
    document.getElementById(name).style.display = 'flex';
    menuChosen = name;

    resetButtonHoverPosition(name);
}

function resetButtonHoverPosition(name: string): void
{
    buttons = document.getElementById(name).querySelectorAll("button");
    buttonsMax = buttons.length-1;
    index = 0;
    buttons[index].classList.add("hover");
    last = buttons[index];
}