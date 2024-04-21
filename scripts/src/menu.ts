import fs from 'fs';

const buttons = document.querySelectorAll("button");
let index: number;
let buttonsMax: number = buttons.length-1;
let last: HTMLElement;

window.addEventListener("keydown", (e: KeyboardEvent) => 
{
    changeButton(e);
});

window.addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        console.log(buttons[index].textContent);
    }
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