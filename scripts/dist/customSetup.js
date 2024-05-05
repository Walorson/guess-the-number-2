import { buttons, index } from "./menu.js";
const customMenu = document.getElementById("custom");
export let editMode = false;
class CustomSetting {
    constructor(name, defaultValue) {
        this.name = name;
        if (localStorage.getItem(name) != null)
            this.value = localStorage.getItem(name);
        else
            this.value = defaultValue;
        customMenu.innerHTML += `<button class="editable" id="customSetting-${this.name}">${this.name}: <span>${this.value}</span></button>`;
    }
    getButton() {
        this.button = document.getElementById("customSetting-" + this.name);
    }
    displayValue() {
        this.getButton();
        this.button.querySelector("span").textContent = this.value;
    }
}
export function customGamemode() {
    const settings = [
        new CustomSetting("min", "0"),
        new CustomSetting("max", "100")
    ];
    let editingButton;
    let firstChar = false;
    window.addEventListener("keydown", (e) => {
        if (buttons[index].classList.contains("editable") == false)
            return;
        if (e.key == 'Enter') {
            if (buttons[index].classList.contains("edit") == false) {
                editMode = true;
                buttons[index].classList.add("edit");
                editingButton = settings[index];
            }
            else {
                editMode = false;
                buttons[index].classList.remove("edit");
                localStorage.setItem(editingButton.name, editingButton.value);
                editingButton = undefined;
                firstChar = false;
            }
        }
        if (editingButton != undefined) {
            if (!isNaN(Number(e.key))) {
                if (firstChar == false) {
                    editingButton.value = '';
                    firstChar = true;
                }
                editingButton.value += e.key;
                editingButton.displayValue();
            }
            if (e.key == 'Backspace') {
                editingButton.value = editingButton.value.slice(0, editingButton.value.length - 1);
                editingButton.displayValue();
            }
        }
    });
    customMenu.innerHTML += `<button class="back-button" data-click="location.href = 'gamemodes/custom.html'">Play</button>
    <button data-click="changeMenu('main')">Back</button>`;
}
/*function assignEventToButton(): void
{
    const buttonsEditable: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".editable");

    buttonsEditable.forEach((button: HTMLButtonElement) =>
    {
        let firstChar: boolean = false;

        window.addEventListener("keydown",(e: KeyboardEvent) =>
        {
            const value: HTMLElement = button.querySelector("span");

            if(e.key == 'Enter')
            {
                if(button.classList.contains("edit")) //CONFIRM, LEAVE EDIT MODE
                {
                    button.classList.remove("edit");
                    firstChar = false;

                    if(value.textContent < buttonsEditable[0].querySelector("span").textContent) {
                        value.textContent = buttonsEditable[0].querySelector("span").textContent;
                    }

                    localStorage.setItem(button.getAttribute("data-info"), value.textContent);
                }
                else if(button.classList.contains("hover")) //ENTER EDIT MODE
                {
                    button.classList.add("edit");
                }
            }

            
        });
    });
}

export function customGamemode(): void
{
    
}

window.addEventListener("load",() =>
{
    buttonsEditable.forEach((button: HTMLButtonElement) =>
    {
        const span: HTMLElement = button.querySelector("span");
        switch(button.getAttribute('data-info'))
        {
            case 'min': span.textContent = localStorage.getItem("min"); break;
            case 'max': span.textContent = localStorage.getItem("max"); break;
        }
    });
});
*/
function setDefaultIfNotExist(name, value) {
    if (localStorage.getItem(name) == null) {
        localStorage.setItem(name, value);
    }
}
//# sourceMappingURL=customSetup.js.map