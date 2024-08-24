import { buttons, index, menuChosen } from "./menu.js";
import { changeColor } from "./theme.js";
import * as mp from "./multiplayer-config.js";
const customMenu = document.getElementById("custom");
const setNicknameMenu = document.getElementById("set-nickname");
const optionsMenu = document.getElementById("options");
export let editMode = false;
export class CustomSetting {
    constructor(name, defaultValue, where = "custom", dataValidation = undefined, offMode = false) {
        this.name = name;
        this.where = where;
        this.offMode = offMode;
        this.onlyNumbers = true;
        this.dataValidation = dataValidation;
        if (localStorage.getItem(name) != null) {
            this.value = localStorage.getItem(name);
        }
        else {
            this.value = defaultValue;
        }
        this.createButton(where);
        localStorage.setItem(this.name, this.value);
    }
    createButton(where) {
        if (this.value == "0" && this.offMode == true)
            this.value = "OFF";
        document.getElementById(where).innerHTML += `<button class="editable" id="customSetting-${this.name}">${this.name}: <span><span style="color:${this.color()}">${this.value}</span></span></button>`;
    }
    getButton() {
        this.button = document.getElementById("customSetting-" + this.name);
    }
    displayValue() {
        this.getButton();
        this.button.querySelector("span").innerHTML = `<span style="color:${this.color()}">${this.value}</span>`;
    }
    setValue(value) {
        this.value = value;
        this.displayValue();
    }
    dataValidation() { }
    applySetting() {
        if (this.dataValidation != undefined)
            this.dataValidation();
        if ((this.value == "0" || this.value == "") && this.offMode == true)
            this.setValue("OFF");
        localStorage.setItem(this.name, this.value);
    }
    color() {
        if (this.value == "OFF" && this.offMode == true)
            return "red";
        else
            return "green";
    }
}
class CustomSettingBoolean extends CustomSetting {
    constructor(name, defaultValue, where) {
        super(name, defaultValue, where);
    }
    createButton() {
        document.getElementById(this.where).innerHTML += `<button class="editable-boolean" id="customSetting-${this.name}">${this.name}: <span><span style="color:${this.color()}">${this.value}</span></span></button>`;
    }
    swapValue() {
        if (this.value == "false") {
            this.value = "true";
        }
        else {
            this.value = "false";
        }
        this.displayValue();
        this.applySetting();
    }
    displayValue() {
        this.getButton();
        this.button.querySelector("span").innerHTML = `<span style="color:${this.color()}">${this.value}</span>`;
    }
    color() {
        if (this.value == "true")
            return "green";
        else
            return "red";
    }
}
class CustomSettingMultiple extends CustomSetting {
    constructor(name, defaultValue, where, values) {
        super(name, defaultValue, where);
        this.values = values;
        this.indexValue = this.values.indexOf(localStorage.getItem(name));
    }
    createButton() {
        document.getElementById(this.where).innerHTML += `<button class="editable-boolean" id="customSetting-${this.name}">${this.name}: <span><span style="color:${this.color()}">${this.value}</span></span></button>`;
    }
    nextValue(event = () => { }) {
        this.indexValue++;
        if (this.indexValue >= this.values.length)
            this.indexValue = 0;
        this.value = this.values[this.indexValue];
        this.displayValue();
        this.applySetting();
        event(this.value);
    }
}
const options = [
    new CustomSettingMultiple("Main Color", "red", "options", ["red", "blue", "green", "yellow", "purple"])
];
export const gameSetup = [
    new CustomSetting("Room Name", localStorage.getItem("Nickname") + "'s room", "host", () => {
        if (gameSetup[0].value.length > mp.ROOM_NAME_MAX_LENGTH) {
            gameSetup[0].setValue(gameSetup[0].value.slice(0, 16));
        }
        else if (gameSetup[0].value.length < mp.ROOM_NAME_MIN_LENGTH) {
            gameSetup[0].setValue("Roo");
        }
    }),
    new CustomSetting("Players Count", "2", "host", () => {
        if (Number(gameSetup[1].value) < mp.ROOM_MIN_PLAYERS_COUNT) {
            gameSetup[1].setValue(mp.ROOM_MIN_PLAYERS_COUNT + "");
        }
        else if (Number(gameSetup[1].value) > mp.ROOM_MAX_PLAYERS_COUNT) {
            gameSetup[1].setValue(mp.ROOM_MAX_PLAYERS_COUNT + "");
        }
    }),
    new CustomSetting("Points To Win", "3", "host", () => {
        if (Number(gameSetup[2].value) < mp.POINTS_MIN_COUNT) {
            gameSetup[2].setValue(mp.POINTS_MIN_COUNT + "");
        }
        else if (Number(gameSetup[2].value) > mp.POINTS_MAX_COUNT) {
            gameSetup[2].setValue(mp.POINTS_MAX_COUNT + "");
        }
    }),
    new CustomSettingMultiple("Gamemode", "Classic", "host", ["Classic", "Hardcore", "Puzzle", "Blind", "Interval"])
];
export function customGamemode() {
    const setNickname = new CustomSetting("Nickname", "noob", "set-nickname", () => {
        if (setNickname.value.length > mp.NICKNAME_MAX_LENGTH) {
            setNickname.setValue(setNickname.value.slice(0, mp.NICKNAME_MAX_LENGTH));
        }
        else if (setNickname.value.length < mp.NICKNAME_MIN_LENGTH) {
            setNickname.setValue("Bob");
        }
    });
    setNickname.onlyNumbers = false;
    gameSetup[0].onlyNumbers = false;
    const settings = [
        new CustomSetting("min", "0", "custom", () => {
            if (Number(settings[0].value) > Number(settings[1].value))
                settings[1].setValue(settings[0].value);
        }),
        new CustomSetting("max", "100", "custom", () => {
            if (Number(settings[0].value) > Number(settings[1].value))
                settings[1].setValue(settings[0].value);
        }),
        new CustomSettingBoolean("more/less", "true", "custom"),
        new CustomSetting("time", "0", "custom", () => {
            if (Number(settings[3].value) < 0) {
                settings[3].setValue("0");
            }
        }, true),
        new CustomSetting("max attempts", "0", "custom", () => {
            if (Number(settings[4].value) < 0) {
                settings[4].setValue("0");
            }
        }, true)
    ];
    const settingsHint = [
        new CustomSettingBoolean("Hints", "false", "custom-hints"),
        new CustomSettingBoolean("Parity", "false", "custom-hints"),
        new CustomSettingBoolean("Divisible By 3", "false", "custom-hints"),
        new CustomSettingBoolean("Prime", "false", "custom-hints"),
        new CustomSettingBoolean("Fibonacci Sequence", "false", "custom-hints"),
    ];
    let editingButton;
    let firstChar = false;
    window.addEventListener("keydown", (e) => {
        if (index == undefined)
            return;
        if (buttons[index].classList.contains("editable") == false)
            return;
        if (e.key == 'Enter') {
            if (buttons[index].classList.contains("edit") == false) {
                editMode = true;
                buttons[index].classList.add("edit");
                if (menuChosen == 'custom')
                    editingButton = settings[index];
                else if (menuChosen == 'set-nickname')
                    editingButton = setNickname;
                else if (menuChosen == 'host')
                    editingButton = gameSetup[index];
            }
            else {
                editMode = false;
                buttons[index].classList.remove("edit");
                editingButton.applySetting();
                editingButton = undefined;
                firstChar = false;
            }
        }
        if (editingButton != undefined) {
            if (!isNaN(Number(e.key)) && editingButton.onlyNumbers == true || isAlphanumeric(e.key) && editingButton.onlyNumbers == false) {
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
    window.addEventListener("keydown", (e) => {
        if (index == undefined)
            return;
        if (buttons[index].classList.contains("editable-boolean") == false)
            return;
        if (e.key == 'Enter') {
            if (menuChosen == 'custom') {
                //@ts-ignore
                settings[index].swapValue();
            }
            else if (menuChosen == 'custom-hints') {
                settingsHint[index].swapValue();
            }
            else if (menuChosen == 'host') {
                //@ts-ignore
                gameSetup[index].nextValue();
            }
            else if (menuChosen == 'options') {
                //@ts-ignore
                options[index].nextValue(changeColor);
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
    optionsMenu.innerHTML += ` <button class="back-button" data-click="changeMenu('main')">Apply and Back</button>`;
    document.getElementById("custom-hints").innerHTML += `<button class="back-button" data-click="changeMenu('custom')">Back</button>`;
    document.getElementById("host").innerHTML += `
    <button class="back-button" data-click="changeMenu('waiting-room')" createlobby>Host</button>
    <button data-click="changeMenu('multiplayer')">Back</button>`;
}
function isAlphanumeric(char) {
    console.log(/^[a-zA-Z0-9]$/.test(char));
    if (/^[a-zA-Z0-9]$/.test(char))
        return true;
}
//# sourceMappingURL=customSetup.js.map