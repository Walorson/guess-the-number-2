import { writeGuess } from "./input.js";
import { time } from "./time.js";

const input: HTMLElement = document.getElementById("input");
const output: HTMLElement = document.getElementById("output");
const circleLoad: HTMLElement = document.getElementById("circleLoad");
const lastGuess: HTMLElement = document.getElementById("lastGuess");
const guide: HTMLElement = document.getElementById("guide");
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
    guide.innerHTML = `
    <p><span class="outline">ENTER</span> Guess</p>
    <p><span class="outline">ESC</span> Return to menu</p>
    <p><span><span class="outline">HOLD R</span> Restart</p>
    <p><span class="outline">H</span> Hide guide</p>
    `;
}

function end(): void {
    isGameEnd = true;
    window.removeEventListener("keydown", writeGuess);
    output.style.opacity = '1';
    time.stopTimer();
    guide.style.bottom = "95px";
}

export function win(): void 
{
    end();
    input.classList.add("correct");
    output.textContent = "CORRECT CORRECT CORRECT CORRECT CORRECT CORRECT CORRECT CORRECT";
    output.classList.add("scrollText");
    lastGuess.style.display = 'none';
}

export function dead(): void 
{
    end();
    input.classList.add("dead");
    output.innerHTML = "YOU ARE DEAD &nbsp; YOU ARE DEAD &nbsp; YOU ARE DEAD &nbsp; YOU ARE DEAD &nbsp; YOU ARE DEAD &nbsp; YOU ARE DEAD &nbsp;";
    output.classList.add("scrollTextDead");
    lastGuess.textContent = `It was ${rand}`;
    lastGuess.style.marginTop = "40px";
}

let ReadyForReloadPage: boolean = false;
let reloadPage: NodeJS.Timeout;
let reloadBlock: boolean = true;

export function gameEvents(): void 
{
    window.addEventListener("load",() => {
        setTimeout(() => { reloadBlock = false }, 1000);
        setTimeout(() => { window.scrollTo(0, 0); }, 50);

        if(localStorage.getItem("isGuideVisible") == 'false') 
        {
            guide.style.display = 'none';
        }
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
        if(e.key === 'h' || e.key === 'H' )
        {
            if(localStorage.getItem("isGuideVisible") == "true")
            {
                guide.style.display = 'none';
                localStorage.setItem("isGuideVisible", "false");
            }
            else
            {
                guide.style.display = '';
                localStorage.setItem("isGuideVisible", "true");
            }
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

//@ts-ignore
export function setAnimation(object: HTMLElement, name: string, duration: number): void {
    object.classList.add(name);
    setTimeout(() => { object.classList.remove(name); }, duration * 1000);
}