let buttons = document.getElementById("main").querySelectorAll("button");
let menuChosen: string = "main";
let index: number;
let buttonsMax: number = buttons.length-1;
let last: HTMLElement;
let keyboardUse: boolean = false;

window.addEventListener("load", () => { assignClickEventForButtons(); });

window.addEventListener("keydown", (e: KeyboardEvent) => 
{
    keyboardUse = true;
    changeButton(e);
});

window.addEventListener("keydown", (e: KeyboardEvent) => {
    if(e.key == "Enter") {
        eval(buttons[index].getAttribute("data-click"));
    }
});

window.addEventListener("mousemove", () => {
    if(keyboardUse == true)
    {
        keyboardUse = false;
        buttons[index].classList.remove('hover');
        index = undefined;
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

function changeMenu(name: string): void
{
    if(last != undefined)
        last.classList.remove("hover");

    document.getElementById(menuChosen).style.display = 'none';
    document.getElementById(name).style.display = 'flex';
    menuChosen = name;

    assignClickEventForButtons();
    resetButtonHoverPosition(name);
}

function resetButtonHoverPosition(name: string): void
{
    if(keyboardUse == false) return;
    
    index = 0;
    buttons[index].classList.add("hover");
    last = buttons[index];
}

function assignClickEventForButtons(): void 
{
    buttons = document.getElementById(menuChosen).querySelectorAll("button");
    buttonsMax = buttons.length-1;

    buttons.forEach((button: HTMLElement) => {
        button.onclick = () => {
            eval(button.getAttribute("data-click"));
        }
    });
}