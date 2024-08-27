export function changeColor(color: string): void
{
    switch(color)
    {
        case "red": {
            colorPalette("217, 29, 29", "182, 23, 23", "137, 16, 16", "175, 21, 21", "137,16,16, 0.75")
        } break;
        case "blue": {
            colorPalette("15, 161, 194","24, 177, 219","4, 121, 164","21, 118, 175","11, 65, 104, 0.75")
        } break;
        case "green": {
            colorPalette("14, 176, 22", "7, 185, 22", "6, 142, 16", "26, 163, 63", "32, 102, 10, 0.5");
        } break;
        case "yellow": {
            colorPalette("217, 208, 29", "201, 188, 47", "179, 160, 37", "132, 126, 14", "143, 137, 17, 0.5")
        } break;
        case "purple": {
            colorPalette("95, 42, 171", "122, 28, 216", "87, 20, 163", "115, 25, 190", "79, 38, 194, 0.5")
        } break;
    }
}

function colorPalette(colorMain: string, colorTitle: string, colorBorder: string, colorShadow: string, colorShadow2: string): void
{
    document.documentElement.style.setProperty("--color-main", "rgb("+colorMain+")");
    document.documentElement.style.setProperty("--color-title", "rgb("+colorTitle+")");
    document.documentElement.style.setProperty("--color-border", "rgb("+colorBorder+")");
    document.documentElement.style.setProperty("--color-shadow", "rgb("+colorShadow+")");
    document.documentElement.style.setProperty("--color-shadow2", "rgba("+colorShadow2+")");
}

export function changeBackground(name: string): void
{
    if(name != "none")
        document.body.style.background = `url("../img/backgrounds/${name}.webp")`;
    else
        document.body.style.background = `black`;
}

export function changeFont(name: string): void
{
    if(name == "default") 
        name = "";

    document.documentElement.style.setProperty("--font-main", name);
    document.documentElement.style.setProperty("--font-title", name);
    document.documentElement.style.setProperty("--font-input", name);
}