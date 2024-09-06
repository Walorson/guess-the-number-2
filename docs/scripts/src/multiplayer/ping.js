export function ping(socket) {
  let time = 0;
  let timer = setInterval(() => {
    time++;
  }, 1);
  socket.emit("ping");
  socket.on("pong", () => {
    clearInterval(timer);
    document.getElementById("ping").textContent = "Ping: " + time + "ms";
    time = 0;
  });
}
