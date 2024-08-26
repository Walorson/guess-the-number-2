export function getRandomInterval(): number[]
{
    const min: number = Math.floor(Math.random()*150);
    const max: number = Math.floor(Math.random()*300) + min;

    return [min, max];
}

export function revealInterval(min: number, max: number): void
{
    document.getElementById("quest").textContent = `Guess a number from ${min} to ${max}`;
}