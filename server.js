import { Server } from "socket.io";

const io = new Server(3000, {
    cors: { origin: "*" }
});

const serversList = [];
const nicknames = {};

io.on("connection", socket => {

    socket.on("disconnect", () => {
        console.log(socket.id+" disconnected.");
        io.emit("rejoin", socket.id);
    });

    socket.on("join", (nickname) => {
        nicknames[socket.id] = nickname;
    });

    socket.on("ping", () => {
        socket.emit("pong");
    })

    socket.on("createLobby", (nameLobby, maxPlayersCount) => {

        serversList.push({
            name: nameLobby, 
            gameID: socket.id, 
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
        const lobby = serversList.find(obj => obj.gameID == ownerID);
        lobby.members.push(nicknames[socket.id]);

        socket.emit("connectTo", lobby);
        socket.to(ownerID).emit("addPlayerToWaitingRoom", nicknames[socket.id]);
    });

    socket.on("startGame", ownerID => {
        io.to(ownerID).emit("startGame");
        io.socketsLeave(ownerID);
        const lobby = serversList.find(obj => obj.gameID == ownerID);
        lobby.members = [];
    });

    //GAME

    socket.on("connectToGame", (gameID, nickname) => {
        socket.join(gameID);
        nicknames[socket.id] = nickname;

        const lobby = serversList.find(obj => obj.gameID == gameID);
        lobby.members.push(nicknames[socket.id]);

        if(lobby.members.length == lobby.maxPlayers) {
            io.to(gameID).emit("startMatch", lobby.members);
            console.log(lobby.members)
        }
    });

    socket.on("multiplayerWin", (gameID, nickname) => {
        socket.to(gameID).emit("multiplayerWin", nickname)
    });
});