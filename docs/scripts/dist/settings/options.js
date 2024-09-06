import { CustomSettingMultiple } from "../customSetup.js";
import { changeColor, changeBackground, changeFont } from "../theme.js";
export let options;
window.addEventListener("load", () => {
    options = [
        new CustomSettingMultiple("Color", "red", "options", ["red", "blue", "green", "yellow", "purple"], changeColor),
        new CustomSettingMultiple("Background", "default", "options", ["default", "memphis", "carpet", "marble", "wood", "none"], changeBackground),
        new CustomSettingMultiple("Font", "default", "options", ["default", "comic sans", "jetbrains mono", "old london", "horror", "minecraft"], changeFont)
    ];
});
//# sourceMappingURL=options.js.map