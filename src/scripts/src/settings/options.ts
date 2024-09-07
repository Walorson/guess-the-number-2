import { CustomSettingMultiple } from "../customSetup.js";
import { changeColor, changeBackground, changeFont } from "../theme.js";

export let options: CustomSettingMultiple[];

window.addEventListener("load", () => {
    options = [
        new CustomSettingMultiple("Color", "red", "options", ["red", "blue", "green", "yellow", "purple", "mint", "brown"], changeColor),
        new CustomSettingMultiple("Background", "default", "options", ["default", "memphis", "carpet", "marble", "wood", "minecraft", "none"], changeBackground),
        new CustomSettingMultiple("Font", "default", "options", ["default", "comic sans", "jetbrains mono", "old london", "minecraft", "super mario", "horror", "capture it"], changeFont)
    ]
});