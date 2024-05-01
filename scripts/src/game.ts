import { writeGuess } from "./input.js";
import { time } from "./time.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const circleLoad = document.getElementById("circleLoad");
const lastGuess = document.getElementById("lastGuess");
let isGameEnd: boolean = false;
export let timerDir: number = 1; //1 or -1

export let rand = Math.floor(Math.random()*101); // THE CORE OF THE GAME

export function setRand(min: number, max: number): void
{
    rand = Math.floor(Math.random() * (max + 1 - min)) + min;
}

export function init(game: Function): void
{
    window.addEventListener("keydown", (e: KeyboardEvent) => 
    {
        if(e.key == 'Enter' && isGameEnd == false)
        {
            game();
        }
    });

    gameEvents();
}

export function win(): void {
    isGameEnd = true;
    window.removeEventListener("keydown", writeGuess);
    input.classList.add("correct");
    output.style.opacity = '1';
    output.textContent = "CORRECT CORRECT CORRECT CORRECT CORRECT CORRECT CORRECT CORRECT";
    output.classList.add("scrollText");
    lastGuess.style.display = 'none';
    time.stopTimer();
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
            location.href = '../index.html';     
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

export function dead(): void {
    isGameEnd = true;
    window.removeEventListener("keydown", writeGuess);
    input.classList.add("dead");
    output.style.opacity = '1';
    output.innerHTML = "YOU ARE DEAD &nbsp; YOU ARE DEAD &nbsp; YOU ARE DEAD &nbsp; YOU ARE DEAD &nbsp; YOU ARE DEAD &nbsp; YOU ARE DEAD &nbsp;";
    output.classList.add("scrollTextDead");
    lastGuess.textContent = `It was ${rand}`;
    lastGuess.style.marginTop = "40px";
    time.stopTimer();
}