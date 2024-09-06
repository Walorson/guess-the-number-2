export const SERVER_URL: string = "https://guess-the-number-2.onrender.com";

//TIME IN SECONDS//
export const SERVER_LIST_REFRESH_TIME: number = 1;
export const PING_REFRESH_TIME: number = 1;

export const PRE_ROUND_TIME: number = 6;
export const POST_ROUND_TIME: number = 5;
export const SCOREBOARD_DELAY_TIME: number = 1;
export const TERMINATE_LOBBY_DELAY: number = 15;

export const ROOM_MIN_PLAYERS_COUNT: number = 2;
export const ROOM_MAX_PLAYERS_COUNT: number = 13;
export const POINTS_MAX_COUNT: number = 10;
export const POINTS_MIN_COUNT: number = 1;
export const ROOM_NAME_MAX_LENGTH: number = 20;
export const ROOM_NAME_MIN_LENGTH: number = 3;

export const NICKNAME_MAX_LENGTH: number = 13;
export const NICKNAME_MIN_LENGTH: number = 3;

export function isMultiplayer(): boolean
{
    if(sessionStorage.getItem("multiplayer") == "true") return true;
    else return false;
}