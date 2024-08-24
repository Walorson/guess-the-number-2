export function changeColor(color) {
    switch (color) {
        case "red":
            {
                colorPalette("217, 29, 29", "182, 23, 23", "137, 16, 16", "175, 21, 21", "137,16,16, 0.75");
            }
            break;
        case "blue":
            {
                colorPalette("15, 161, 194", "24, 177, 219", "4, 121, 164", "21, 118, 175", "11, 65, 104, 0.75");
            }
            break;
    }
}
function colorPalette(colorMain, colorTitle, colorBorder, colorShadow, colorShadow2) {
    document.documentElement.style.setProperty("--color-main", "rgb(" + colorMain + ")");
    document.documentElement.style.setProperty("--color-title", "rgb(" + colorTitle + ")");
    document.documentElement.style.setProperty("--color-border", "rgb(" + colorBorder + ")");
    document.documentElement.style.setProperty("--color-shadow", "rgb(" + colorShadow + ")");
    document.documentElement.style.setProperty("--color-shadow2", "rgba(" + colorShadow2 + ")");
}
//# sourceMappingURL=theme.js.map