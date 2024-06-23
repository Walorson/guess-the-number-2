import { Server } from "socket.io";

const io = new Server(3000, {
    cors: { origin: "*" }
});
console.log("se")
io.on("connection", socket => {

    socket.on("join", (nickname) => {
        console.log(nickname);
    });

    socket.on("ping", () => {
        socket.emit("pong");
    })

});