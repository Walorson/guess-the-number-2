import { io } from "socket.io-client";
import { CustomSetting } from "./customSetup.js";
const socket = io("127.0.0.1:3000");
let nickname = "Mateusz";
new CustomSetting("Nickname", "noob", "set-nickname");
socket.on("connection", () => {
    socket.emit("join", nickname);
});
//# sourceMappingURL=menu-client.js.map