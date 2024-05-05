import { buttons, index } from "./menu.js"

const customMenu: HTMLElement = document.getElementById("custom");
export let editMode: boolean = false;

class CustomSetting {
    name: string;
    value: string;
    button: HTMLElement;

    constructor(name: string, defaultValue: string) {
        this.name = name;
        if(localStorage.getItem(name) != null)
            this.value = localStorage.getItem(name);
        else
            this.value = defaultValue;

        customMenu.innerHTML += `<button class="editable" id="customSetting-${this.name}">${this.name}: <span>${this.value}</span></button>`;
    }

    getButton() {
        this.button = document.getElementById("customSetting-"+this.name);
    }

    displayValue() {
        this.getButton();
        this.button.querySelector("span").textContent = this.value;
    }
}

export function customGamemode(): void {
    const settings: CustomSetting[] = [
        new CustomSetting("min", "0"),
        new CustomSetting("max", "100")
    ];

    let editingButton: CustomSetting;
    let firstChar: boolean = false;

    window.addEventListener("keydown", (e: KeyboardEvent) => {
        if(buttons[index].classList.contains("editable") == false) return;

        if(e.key == 'Enter')
        {
            if(buttons[index].classList.contains("edit") == false) 
            {
                editMode = true;
                buttons[index].classList.add("edit");

                editingButton = settings[index];
            }
            else
            {
                editMode = false;
                buttons[index].classList.remove("edit");
                localStorage.setItem(editingButton.name, editingButton.value);

                editingButton = undefined;
                firstChar = false;
            }
        }

        if(editingButton != undefined)
        {
            if(!isNaN(Number(e.key)))
            {
                if(firstChar == false) {
                    editingButton.value = '';
                    firstChar = true;
                }

                editingButton.value += e.key;
                editingButton.displayValue();
            }

            if(e.key == 'Backspace')
            {
                editingButton.value = editingButton.value.slice(0, editingButton.value.length-1);
                editingButton.displayValue();
            }
        }
    });

    customMenu.innerHTML += `<button class="back-button" data-click="location.href = 'gamemodes/custom.html'">Play</button>
    <button data-click="changeMenu('main')">Back</button>`;
}