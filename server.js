import { Server } from "socket.io";
import { getRandomInterval } from "./src/scripts/dist/gamemodes/utility/interval.js";
import { returnRand } from "./src/scripts/dist/random.js";
 
const io = new Server(3000, {
    cors: { origin: "*" }
});

let serversList = [];
const nicknames = {};
let online = 0;

io.on("connection", socket => {
    online++;

    socket.on("disconnect", () => {
        console.log(socket.id+" disconnected.");

        let lobby = serversList.find(obj => obj.gameID == socket.id);
        if(lobby != undefined && lobby.inGame == false)
            terminateLobby(socket.id);

        lobby = serversList.find(obj => obj.members.includes(nicknames[socket.id]));
        
        if(lobby != undefined && lobby.inGame == false)
        {
            let playerIndex = lobby.members.indexOf(nicknames[socket.id]);
            delete lobby.members[playerIndex];
            delete lobby.points[nicknames[socket.id]];
            lobby.members = lobby.members.filter(obj => obj != undefined);

            io.to(lobby.gameID).emit("removePlayerFromWaitingRoom", nicknames[socket.id]);
        }

        online--;
        if(online < 0) online = 0;
    });

    socket.on("join", (nickname) => {
        nicknames[socket.id] = nickname;
    });

    socket.on("ping", () => {
        socket.emit("pong");
    })

    socket.on("createLobby", (nameLobby, maxPlayersCount, pointsToWinCount, gamemodeName) => {

        serversList.push({
            name: nameLobby, 
            gameID: socket.id, 
            maxPlayers: maxPlayersCount, 
            members: [nicknames[socket.id]],
            points: {},
            inGame: false,
            isRoundEnd: false,
            pointsToWin: pointsToWinCount,
            gamemode: gamemodeName,
            deadCount: 0
        });

        serversList[serversList.length-1].points[nicknames[socket.id]] = 0;

        socket.join(socket.id);
    });

    socket.on("getServersList", () => {
        socket.emit("getServersList", serversList.filter(obj => obj.inGame == false));
    });

    socket.on("getOnlinePlayers", () => {
        socket.emit("getOnlinePlayers", online);
    });

    socket.on("connectTo", ownerID => {   
        const lobby = serversList.find(obj => obj.gameID == ownerID);

        if(lobby.members.length >= lobby.maxPlayers) return;

        lobby.members.push(nicknames[socket.id]);
        lobby.points[nicknames[socket.id]] = 0;
        socket.join(ownerID);

        socket.emit("connectTo", lobby);
        socket.to(ownerID).emit("addPlayerToWaitingRoom", nicknames[socket.id]);
    });

    socket.on("startGame", ownerID => {
        const lobby = serversList.find(obj => obj.gameID == ownerID);
        lobby.members = [];
        lobby.inGame = true;

        io.to(ownerID).emit("startGame", lobby.gamemode);
        io.socketsLeave(ownerID);
    });

    //////GAME/////

    socket.on("connectToGame", (gameID, nickname) => {
        const lobby = serversList.find(obj => obj.gameID == gameID);
        if(lobby == undefined) {
            socket.emit("GTFO");
            return;
        }

        if(lobby.members.length >= lobby.maxPlayers) {
            socket.emit("GTFO");
            socket.broadcast.emit("playerLeftTheGame", nickname);
            return;
        }

        socket.join(gameID);
        nicknames[socket.id] = nickname;
        lobby.members.push(nicknames[socket.id]);

        if(lobby.members.length == lobby.maxPlayers) {
            io.to(gameID).emit("startMatch", lobby.points, lobby.pointsToWin);
            lobby.deadCount = 0;
            
            let rand;

            if(lobby.gamemode == 'blind' || lobby.gamemode == 'interval')
            {
                const interval = getRandomInterval();
                rand = returnRand(interval[0], interval[1]);
                io.to(gameID).emit("setServerVariables", rand, lobby.gamemode, interval[0], interval[1]);
            }
            else if(lobby.gamemode == 'oneChance')
            {
                rand = returnRand(0, 10);
                io.to(gameID).emit("setServerVariables", rand, lobby.gamemode);
            }
            else if(lobby.gamemode == 'threeChances')
                {
                    rand = returnRand(0, 20);
                    io.to(gameID).emit("setServerVariables", rand, lobby.gamemode);
                }
            else 
            {
                rand = returnRand(0, 100);
                io.to(gameID).emit("setServerVariables", rand, lobby.gamemode);
            }
            
        }
    });

    socket.on("multiplayerWin", (gameID, nickname, postRoundTime, isGameEnd) => {

        const lobby = serversList.find(obj => obj.gameID == gameID);
        
        if(lobby.isRoundEnd == true)
            return;
        else
            lobby.isRoundEnd = true;

        lobby.points[nickname] += 1;
        socket.to(gameID).emit("multiplayerWin", nickname, lobby.points);

        if(isGameEnd != true)
        {
            setTimeout(() => {

                lobby.isRoundEnd = false;
                io.to(gameID).emit("startNewRound");
                io.socketsLeave(gameID);
                lobby.members = [];
    
            }, postRoundTime * 1000);
        }
        else
        {
            io.to(gameID).emit("endGame", nickname.toUpperCase());
        }
    });

    socket.on("multiplayerDead", (gameID, postRoundTime) => {
        const lobby = serversList.find(obj => obj.gameID == gameID);
        lobby.deadCount++;

        if(lobby.deadCount >= lobby.members.length) {
            io.to(gameID).emit("roundDraw");

            setTimeout(() => {

                lobby.isRoundEnd = false;
                io.to(gameID).emit("startNewRound");
                io.socketsLeave(gameID);
                lobby.members = [];
    
            }, postRoundTime * 1000);
        }
    })

    function terminateLobby(gameID) 
    {
        const lobby = serversList.find(obj => obj.gameID == gameID);
        if(lobby == undefined) return;

        delete serversList[serversList.indexOf(lobby)];
        serversList = serversList.filter(obj => obj != undefined);
        io.to(gameID).emit("GTFO");
    }

    socket.on("terminateLobby", gameID => 
    {
        terminateLobby(gameID);
    });

    socket.on("updateScoreboard", gameID => {
        const lobby = serversList.find(obj => obj.gameID == gameID);
        io.to(gameID).emit("updateScoreboard", lobby.points);
    });
});