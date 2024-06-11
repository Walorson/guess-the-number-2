import {io} from "../../_snowpack/pkg/socket.io-client.js";
const socket = io("127.0.0.1:3000");
let nickname = "Mateusz";
socket.on("connection", () => {
  socket.emit("join", nickname);
});
