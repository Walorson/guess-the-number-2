export function getRandomInterval() {
  const min = Math.floor(Math.random() * 150);
  const max = Math.floor(Math.random() * 300) + min;
  return [min, max];
}
export function revealInterval(min, max) {
  document.getElementById("quest").textContent = `Guess a number from ${min} to ${max}`;
}
