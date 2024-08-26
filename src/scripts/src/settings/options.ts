import { CustomSettingMultiple } from "../customSetup.js";
import { changeColor, changeBackground } from "../theme.js";

export let options: CustomSettingMultiple[];

window.addEventListener("load", () => {
    options = [
        new CustomSettingMultiple("Color", "red", "options", ["red", "blue", "green", "yellow", "purple"], changeColor),
        new CustomSettingMultiple("Background", "default", "options", ["default", "memphis", "carpet", "marble", "none"], changeBackground)
    ]
});