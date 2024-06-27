import { Server } from "socket.io";

const io = new Server(3000, {
    cors: { origin: "*" }
});

const serversList = [];
const nicknames = {};

io.on("connection", socket => {

    socket.on("join", (nickname) => {
        nicknames[socket.id] = nickname;
    });

    socket.on("ping", () => {
        socket.emit("pong");
    })

    socket.on("createLobby", (nameLobby, maxPlayersCount) => {

        serversList.push({
            name: nameLobby, 
            ownerID: socket.id, 
            maxPlayers: maxPlayersCount, 
            members: [nicknames[socket.id]]
        });

        socket.join(socket.id);
    });

    socket.on("getServersList", () => {
        socket.emit("getServersList", serversList);
    });

    socket.on("connectTo", ownerID => {
        socket.join(ownerID);
        const lobby = serversList.find(obj => obj.ownerID == ownerID);
        lobby.members.push(nicknames[socket.id]);

        socket.emit("connectTo", lobby);
        socket.to(ownerID).emit("addPlayerToWaitingRoom", nicknames[socket.id]);
    });

    socket.on("startGame", ownerID => {
        io.to(ownerID).emit("startGame");
    });
});