import { writeGuess } from "./input.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const circleLoad = document.getElementById("circleLoad");
const lastGuess = document.getElementById("lastGuess");
const timeDiv: HTMLElement = document.getElementById("time");
export let timeInterval: NodeJS.Timeout;
let time: number = 0;

export function win(): void {
    window.removeEventListener("keydown", writeGuess);
    input.classList.add("correct");
    output.style.opacity = '1';
    output.textContent = "CORRECT CORRECT CORRECT CORRECT CORRECT  CORRECT CORRECT CORRECT";
    output.classList.add("scrollText");
    lastGuess.style.display = 'none';
    stopTimer();
}

let ReadyForReloadPage: boolean = false;
let reloadPage: NodeJS.Timeout;
let reloadBlock: boolean = true;

export function gameEvents(): void 
{
    window.addEventListener("load",() => {
        setTimeout(() => { reloadBlock = false }, 1000);
    });

    window.addEventListener("keydown", (e: KeyboardEvent) => {
        if(e.key == 'Escape')
        {
            location.href = '/';     
        }
        if(e.key === 'r' || e.key === 'R')
        {
            if(reloadBlock == true) return;

            reloadPage = setTimeout(function() { if(ReadyForReloadPage) location.reload() }, 1000);
            
            ReadyForReloadPage = true;
            circleLoad.style.setProperty('--anim-play-state', 'running');
            circleLoad.style.setProperty('--anim', 'circleLoad 1s linear'); 
            circleLoad.style.opacity = '1';
        }
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
        if(e.key === 'r' || e.key === 'R')
        {
            e.preventDefault();
            clearTimeout(reloadPage);
            ReadyForReloadPage = false;
            circleLoad.classList.remove("circleLoad");
            circleLoad.style.setProperty('--anim-play-state', 'paused');
            circleLoad.style.setProperty('--anim', 'none');
            circleLoad.style.opacity = '0'; 
        }
    })
}

function timer(): void    
{
    time++;
    timeDiv.textContent = "Time: "+time;
}
export function startTimer(): void {
    timeInterval = setInterval(timer, 1000);
}
export function stopTimer(): void {
    clearInterval(timeInterval);
}