const pingDiv = document.getElementById("ping");
export function ping(socket) {
    let time = 0;
    let timer = setInterval(() => { time++; }, 1);
    socket.emit("ping");
    socket.on("pong", () => {
        clearInterval(timer);
        pingDiv.textContent = "Ping: " + time + "ms";
        time = 0;
    });
}
//# sourceMappingURL=ping.js.map