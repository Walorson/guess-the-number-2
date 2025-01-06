export function changeColor(color) {
    switch (color) {
        case "red":
            {
                colorPalette("", "", "", "", "");
            }
            break;
        case "blue":
            {
                colorPalette("15, 161, 194", "24, 177, 219", "4, 121, 164", "21, 118, 175", "11, 65, 104, 0.75", "23, 152, 166");
            }
            break;
        case "green":
            {
                colorPalette("14, 176, 22", "7, 185, 22", "6, 142, 16", "26, 163, 63", "32, 102, 10, 0.5", "0, 255, 0");
            }
            break;
        case "yellow":
            {
                colorPalette("217, 208, 29", "201, 188, 47", "179, 160, 37", "132, 126, 14", "143, 137, 17, 0.5", "255, 255, 0");
            }
            break;
        case "purple":
            {
                colorPalette("95, 42, 171", "122, 28, 216", "87, 20, 163", "115, 25, 190", "79, 38, 194, 0.5", "113, 28, 162");
            }
            break;
        case "mint":
            {
                colorPalette("28, 199, 133", "19, 204, 140", "15, 173, 120", "14, 138, 97", "20, 169, 117, 0.5", "19, 204, 140");
            }
            break;
        case "brown":
            {
                colorPalette("143, 98, 56", "150, 101, 62", "112, 72, 44", "112, 77, 36", "123, 85, 47, 0.5", "144, 99, 65");
            }
            break;
    }
}
function colorPalette(colorMain, colorTitle, colorBorder, colorShadow, colorShadow2, progressCircle = "red") {
    if (colorMain == "") {
        document.documentElement.style.setProperty("--color-main", "");
        document.documentElement.style.setProperty("--color-title", "");
        document.documentElement.style.setProperty("--color-border", "");
        document.documentElement.style.setProperty("--color-shadow", "");
        document.documentElement.style.setProperty("--color-shadow2", "");
        document.documentElement.style.setProperty("--color-progressCircle", "");
    }
    else {
        document.documentElement.style.setProperty("--color-main", "rgb(" + colorMain + ")");
        document.documentElement.style.setProperty("--color-title", "rgb(" + colorTitle + ")");
        document.documentElement.style.setProperty("--color-border", "rgb(" + colorBorder + ")");
        document.documentElement.style.setProperty("--color-shadow", "rgb(" + colorShadow + ")");
        document.documentElement.style.setProperty("--color-shadow2", "rgba(" + colorShadow2 + ")");
        document.documentElement.style.setProperty("--color-progressCircle", "rgb(" + progressCircle + ")");
    }
}
export function changeBackground(name) {
    if (name != "none")
        document.body.style.background = `url("../img/backgrounds/${name}.webp")`;
    else
        document.body.style.background = `black`;
}
export function changeFont(name) {
    if (name == "default")
        name = "";
    document.documentElement.style.setProperty("--font-main", name);
    document.documentElement.style.setProperty("--font-title", name);
    document.documentElement.style.setProperty("--font-input", name);
}
//# sourceMappingURL=theme.js.map