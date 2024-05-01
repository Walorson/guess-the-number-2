import { dead } from "./game.js";

export const time = {
    sDiv: document.getElementById("time-seconds"),
    msDiv: document.getElementById("time-miliseconds"),
    s: 0,
    ms: 0,
    dir: 1,
    sTimer: function() 
    {
        time.s += time.dir;
        if(time.s >= 0)
            time.sDiv.textContent = String(time.s);
        else
            time.sDiv.textContent = "0";
    },
    msTimer: function() 
    {
        time.ms += time.dir;

        if(time.ms > 99 && time.dir > 0) time.ms = 0;
        else if(time.ms < 0 && time.dir < 0) time.ms = 99;

        if(time.ms > 9)
            time.msDiv.textContent = ""+time.ms;
        else
            time.msDiv.textContent = "0"+time.ms;
    },
    sInterval: undefined,
    msInterval: undefined,
    setTimerDir: function(dir: number): void
    {
        time.dir = dir;
    },
    setTime: function(s: number, ms: number): void
    {
        time.s = s;
        time.ms = ms;
    },
    startTimer: function(dir: number = 1): void {
        time.sDiv.textContent = String(time.s);
        time.msDiv.textContent = String(time.ms);
        time.sInterval = setInterval(() => time.sTimer(), 1000);
        time.msInterval = setInterval(() => time.msTimer(), 10);
    },
    stopTimer: function(): void {
        clearInterval(time.sInterval);
        clearInterval(time.msInterval);
    },
    forceStopTimerIf(s: number = 0, sign: string = "<"): void {
        setInterval(() => {
            if((time.s < s && sign == "<") || (time.s > s && sign == ">")) 
            {
                dead();  
                time.sDiv.textContent = "0";
                time.msDiv.textContent = "00";
            }
        },10);
    }
}