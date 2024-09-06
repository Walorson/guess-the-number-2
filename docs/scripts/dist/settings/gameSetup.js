import { CustomSetting, CustomSettingMultiple } from "../customSetup.js";
import { POINTS_MAX_COUNT, POINTS_MIN_COUNT, ROOM_MAX_PLAYERS_COUNT, ROOM_MIN_PLAYERS_COUNT, ROOM_NAME_MAX_LENGTH, ROOM_NAME_MIN_LENGTH } from "../multiplayer/multiplayer-config.js";
export let gameSetup;
window.addEventListener("load", () => {
    gameSetup = [
        new CustomSetting("Room Name", localStorage.getItem("Nickname") + "'s room", "host", () => {
            if (gameSetup[0].value.length > ROOM_NAME_MAX_LENGTH) {
                gameSetup[0].setValue(gameSetup[0].value.slice(0, 16));
            }
            else if (gameSetup[0].value.length < ROOM_NAME_MIN_LENGTH) {
                gameSetup[0].setValue("Roo");
            }
        }),
        new CustomSetting("Players Count", "2", "host", () => {
            if (Number(gameSetup[1].value) < ROOM_MIN_PLAYERS_COUNT) {
                gameSetup[1].setValue(ROOM_MIN_PLAYERS_COUNT + "");
            }
            else if (Number(gameSetup[1].value) > ROOM_MAX_PLAYERS_COUNT) {
                gameSetup[1].setValue(ROOM_MAX_PLAYERS_COUNT + "");
            }
        }),
        new CustomSetting("Points To Win", "3", "host", () => {
            if (Number(gameSetup[2].value) < POINTS_MIN_COUNT) {
                gameSetup[2].setValue(POINTS_MIN_COUNT + "");
            }
            else if (Number(gameSetup[2].value) > POINTS_MAX_COUNT) {
                gameSetup[2].setValue(POINTS_MAX_COUNT + "");
            }
        }),
        new CustomSettingMultiple("Gamemode", "Classic", "host", ["classic", "hardcore", "puzzle", "blind", "oneChance", "threeChances"])
    ];
    gameSetup[0].onlyNumbers = false;
});
//# sourceMappingURL=gameSetup.js.map