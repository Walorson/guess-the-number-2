import { gameEvents } from "./game.js";
import { buttons, index, menuChosen } from "./menu.js"

const customMenu: HTMLElement = document.getElementById("custom");
const setNicknameMenu: HTMLElement = document.getElementById("set-nickname");
export let editMode: boolean = false;

export class CustomSetting {
    name: string;
    value: string;
    where: string;
    offMode: boolean;
    button: HTMLElement;
    onlyNumbers: boolean;

    constructor(name: string, defaultValue: string, where: string = "custom", dataValidation: () => void = undefined, offMode: boolean = false) {
        this.name = name;
        this.where = where;
        this.offMode = offMode;
        this.onlyNumbers = true;
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
        if(this.value == "0" && this.offMode == true) 
            this.value = "OFF";

        document.getElementById(where).innerHTML += `<button class="editable" id="customSetting-${this.name}">${this.name}: <span><span style="color:${this.color()}">${this.value}</span></span></button>`;
    }

    getButton(): void {
        this.button = document.getElementById("customSetting-"+this.name);
    }

    displayValue(): void {
        this.getButton();

        this.button.querySelector("span").innerHTML = `<span style="color:${this.color()}">${this.value}</span>`;
    }

    setValue(value: string): void {
        this.value = value;
        this.displayValue();
    }

    dataValidation(): void {}

    applySetting(): void {
        if(this.dataValidation != undefined)
            this.dataValidation();

        if((this.value == "0" || this.value == "") && this.offMode == true) 
            this.setValue("OFF");

        localStorage.setItem(this.name, this.value);
    }

    color(): string {
        if(this.value == "OFF" && this.offMode == true)
            return "red";
        else
            return "green";
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

export const gameSetup: CustomSetting[] =
[
    new CustomSetting("Room Name", localStorage.getItem("Nickname")+"'s room", "host"),
    new CustomSetting("Players Count", "2", "host", () => {
        if(Number(gameSetup[0].value) < 2)
            gameSetup[1].setValue("2");
        else if(Number(gameSetup[0].value) > 4)
            gameSetup[1].setValue("4");
    })
];

export function customGamemode(): void {
    const setNickname = new CustomSetting("Nickname", "noob", "set-nickname");
    setNickname.onlyNumbers = false;

    gameSetup[0].onlyNumbers = false;

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
        }),
        new CustomSettingBoolean("more/less","true","custom"),
        new CustomSetting("time","0","custom", () => 
        {
            if(Number(settings[3].value) < 0) {
                settings[3].setValue("0");
            }
        }, true),
        new CustomSetting("max attempts","0","custom", () => 
        {
            if(Number(settings[4].value) < 0) {
                settings[4].setValue("0");
            }
        }, true)
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

                if(menuChosen == 'custom')
                    editingButton = settings[index];
                else if(menuChosen == 'set-nickname')
                    editingButton = setNickname;
                else if(menuChosen == 'host')
                    editingButton = gameSetup[index];
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
            if(!isNaN(Number(e.key)) && editingButton.onlyNumbers == true || isAlphanumeric(e.key) && editingButton.onlyNumbers == false)
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
            if(menuChosen == 'custom') {
                //@ts-ignore
                settings[index].swapValue();
            }
            else if(menuChosen == 'custom-hints') {
                settingsHint[index].swapValue();
            }
        }
    });

    customMenu.innerHTML += `
    <button class="button" data-click="changeMenu('custom-hints')">Hints...</button>
    <button class="back-button" data-click="location.href = 'gamemodes/custom.html'">Play</button>
    <button data-click="changeMenu('gamemodes')">Back</button>`;

    setNicknameMenu.innerHTML += `
    <button class="back-button" data-click="changeMenu('multiplayer')" connectToServer>Apply</button>
    <button data-click="changeMenu('main')">Back</button>
    `;

    document.getElementById("custom-hints").innerHTML += `<button class="back-button" data-click="changeMenu('custom')">Back</button>`;
    document.getElementById("host").innerHTML += `
    <button class="back-button" data-click="changeMenu('waiting-room')" createlobby>Host</button>
    <button data-click="changeMenu('multiplayer')">Back</button>`;
}

function isAlphanumeric(char: string): boolean {
    console.log(/^[a-zA-Z0-9]$/.test(char))
    if(/^[a-zA-Z0-9]$/.test(char)) return true;
}