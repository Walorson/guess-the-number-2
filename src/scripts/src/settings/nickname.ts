import { CustomSetting } from "../customSetup.js";
import { NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH } from "../multiplayer/multiplayer-config.js";

export let setNickname: CustomSetting;

window.addEventListener("load", () => {
    setNickname = new CustomSetting("Nickname", "noob", "set-nickname", () => {
        if(setNickname.value.length > NICKNAME_MAX_LENGTH)
        {
            setNickname.setValue(setNickname.value.slice(0, NICKNAME_MAX_LENGTH));
        }
        else if(setNickname.value.length < NICKNAME_MIN_LENGTH)
        {
            setNickname.setValue("Bob");
        }
    });
    
    setNickname.onlyNumbers = false;
});