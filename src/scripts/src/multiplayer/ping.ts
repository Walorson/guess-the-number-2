export function ping(socket: any): void {
    let time: number = 0;
    let timer: NodeJS.Timeout = setInterval(() => { time++; }, 1);
    socket.emit("ping");
    socket.on("pong", () => {
        clearInterval(timer);
        document.getElementById("ping").textContent = "Ping: "+time+"ms";
        time = 0;
    });
}