import { Server } from "socket.io";

const io = new Server(3000, {
    cors: { origin: "*" }
});

const serversList = [];

io.on("connection", socket => {

    socket.on("join", (nickname) => {
        console.log(nickname);
    });

    socket.on("ping", () => {
        socket.emit("pong");
    })

    socket.on("createLobby", (nameLobby, ownerLobby) => {
        serversList.push({name: nameLobby, owner: ownerLobby});
    });

    socket.on("getServersList", () => {
        socket.emit("getServersList", serversList);
    });

});