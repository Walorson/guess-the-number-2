export const SERVER_URL = "https://guess-the-number-2.onrender.com/";
export const SERVER_LIST_REFRESH_TIME = 1.5;
export const PING_REFRESH_TIME = 1;
export const POINTS_TO_WIN = 3;
export const PRE_ROUND_TIME = 6;
export const POST_ROUND_TIME = 5;
export const SCOREBOARD_DELAY_TIME = 1;
export const TERMINATE_LOBBY_DELAY = 15;
export const ROOM_MIN_PLAYERS_COUNT = 2;
export const ROOM_MAX_PLAYERS_COUNT = 6;
export const ROOM_NAME_MAX_LENGTH = 20;
export const ROOM_NAME_MIN_LENGTH = 3;
export const NICKNAME_MAX_LENGTH = 13;
export const NICKNAME_MIN_LENGTH = 3;
export function isMultiplayer() {
  if (sessionStorage.getItem("multiplayer") == "true")
    return true;
  else
    return false;
}
