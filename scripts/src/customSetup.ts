import { buttons, index } from "./menu.js"

const customMenu: HTMLElement = document.getElementById("custom");
export let editMode: boolean = false;

class CustomSetting {
    name: string;
    value: string;
    where: string;
    button: HTMLElement;

    constructor(name: string, defaultValue: string, where: string = "custom", dataValidation: () => void = undefined) {
        this.name = name;
        this.where = where;
        this.dataValidation = dataValidation;

        if(localStorage.getItem(name) != null)
        {
            this.value = localStorage.getItem(name);
        }
        else
        {
            this.value = defaultValue;
        }

        this.createButton(where);
        localStorage.setItem(this.name, this.value);
    }

    createButton(where: string): void {
        document.getElementById(where).innerHTML += `<button class="editable" id="customSetting-${this.name}">${this.name}: <span>${this.value}</span></button>`;
    }

    getButton(): void {
        this.button = document.getElementById("customSetting-"+this.name);
    }

    displayValue(): void {
        this.getButton();
        this.button.querySelector("span").textContent = this.value;
    }

    setValue(value: string): void {
        this.value = value;
        this.displayValue();
    }

    dataValidation(): void {}

    applySetting(): void {
        if(this.dataValidation != undefined)
            this.dataValidation();

        localStorage.setItem(this.name, this.value);
    }
}
class CustomSettingBoolean extends CustomSetting {
    constructor(name: string, defaultValue: string, where: string) {
        super(name, defaultValue, where);
    }

    createButton(): void {
        
        document.getElementById(this.where).innerHTML += `<button class="editable-boolean" id="customSetting-${this.name}">${this.name}: <span><span style="color:${this.color()}">${this.value}</span></span></button>`;
    }

    swapValue(): void {
        if(this.value == "false") {
            this.value = "true";
        }
        else {
            this.value = "false";
        }

        this.displayValue();
        this.applySetting();
    }

    displayValue(): void {
        this.getButton();
        this.button.querySelector("span").innerHTML = `<span style="color:${this.color()}">${this.value}</span>`;
    }

    color(): string {
        if(this.value == "true") return "green";
        else return "red";
    }
}

export function customGamemode(): void {
    const settings: CustomSetting[] = 
    [
        new CustomSetting("min", "0", "custom", () => 
        {
            if(Number(settings[0].value) > Number(settings[1].value)) 
                settings[1].setValue(settings[0].value); 
        }),
        new CustomSetting("max", "100", "custom", () => 
        { 
            if(Number(settings[0].value) > Number(settings[1].value)) 
                settings[1].setValue(settings[0].value); 
        })
    ];

    const settingsHint: CustomSettingBoolean[] =
    [
        new CustomSettingBoolean("Hints", "false", "custom-hints"),
        new CustomSettingBoolean("Parity", "false", "custom-hints"),
        new CustomSettingBoolean("Divisible By 3", "false", "custom-hints"),
        new CustomSettingBoolean("Prime", "false", "custom-hints"),
        new CustomSettingBoolean("Fibonacci Sequence", "false", "custom-hints"),
    ];

    let editingButton: CustomSetting;
    let firstChar: boolean = false;

    window.addEventListener("keydown", (e: KeyboardEvent) => {
        if(index == undefined) return;
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
                editingButton.applySetting();

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

    window.addEventListener("keydown", (e: KeyboardEvent) => {
        if(index == undefined) return;
        if(buttons[index].classList.contains("editable-boolean") == false) return;

        if(e.key == 'Enter') {
            settingsHint[index].swapValue();
        }
    });

    customMenu.innerHTML += `
    <button class="button" data-click="changeMenu('custom-hints')">Hints...</button>
    <button class="back-button" data-click="location.href = 'gamemodes/custom.html'">Play</button>
    <button data-click="changeMenu('gamemodes')">Back</button>`;

    document.getElementById("custom-hints").innerHTML += `<button class="back-button" data-click="changeMenu('custom')">Back</button>`;
}