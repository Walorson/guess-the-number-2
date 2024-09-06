import { writeGuess } from "./input.js";
import { time } from "./time.js";
import { connectToServer, multiplayerDead, multiplayerWin } from "./multiplayer/game-client.js";
import { isMultiplayer } from "./multiplayer/multiplayer-config.js";
import { changeBackground, changeColor, changeFont } from "./theme.js";
import { rand } from "./random.js";

window.addEventListener("load", () => {
    changeColor(localStorage.getItem("Color"));
    changeBackground(localStorage.getItem("Background"));
    changeFont(localStorage.getItem("Font"));
    
    if(isMultiplayer())
    {
        connectToServer();
    }
});

const input: HTMLElement = document.getElementById("input");
const output: HTMLElement = document.getElementById("output");
const circleLoad: HTMLElement = document.getElementById("circleLoad");
const lastGuess: HTMLElement = document.getElementById("lastGuess");
const guide: HTMLElement = document.getElementById("guide");
let isGameEnd: boolean = false;
export let timerDir: number = 1; //1 or -1

export function freezeGame(): void
{
    window.removeEventListener("keydown", writeGuess);
    isGameEnd = true;
}

export function unfreezeGame(): void
{
    window.addEventListener("keydown", writeGuess);
    isGameEnd = false;
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
    freezeGame(); 
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

    if(isMultiplayer() == true) multiplayerWin();
}

export function dead(text: string = "YOU ARE DEAD", countDead: boolean = true): void 
{
    end();
    input.classList.add("dead");
    output.innerHTML = `${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp; ${text} &nbsp;`;
    output.classList.add("scrollTextDead");
    lastGuess.textContent = `It was ${rand}`;
    lastGuess.style.marginTop = "122px";

    if(isMultiplayer() == true && countDead == true) multiplayerDead();
}

let ReadyForReloadPage: boolean = false;
let reloadPage: NodeJS.Timeout;
let reloadBlock: boolean = true;

export function gameEvents(): void 
{
    window.addEventListener("load",() => {
        setTimeout(() => { reloadBlock = false }, 500);
        setTimeout(() => { window.scrollTo(0, 0); }, 40);

        if(localStorage.getItem("isGuideVisible") == 'false') 
        {
            guide.style.display = 'none';
        }
    });

    window.addEventListener("keydown", (e: KeyboardEvent) => {
        if(window.scrollY > 0) window.scrollTo(0, 0);
        if(e.key == 'Escape')
        {
            location.href = '../index.html';     
        }
        if((e.key === 'r' || e.key === 'R') && (isMultiplayer() == false))
        {
            if(reloadBlock == true) return;

            reloadPage = setTimeout(function() { if(ReadyForReloadPage) location.reload() }, 500);
            
            ReadyForReloadPage = true;
            circleLoad.style.setProperty('--anim-play-state', 'running');
            circleLoad.style.setProperty('--anim', 'circleLoad 0.5s linear'); 
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
        if((e.key === 'r' || e.key === 'R') && (isMultiplayer() == false))
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

export function setAnimation(object: HTMLElement, name: string, duration: number): void {
    object.classList.add(name);
    setTimeout(() => { object.classList.remove(name); }, duration * 1000);
}