export let rand: number = Math.floor(Math.random()*101); // THE CORE OF THE GAME

export function setRand(min: number, max: number): void
{
    rand = Math.floor(Math.random() * (max + 1 - min)) + min;
}

export function returnRand(min: number, max: number): number
{
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

export function forceRand(number: number) 
{
    rand = number;
}