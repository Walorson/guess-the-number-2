let language;
const lang = localStorage.getItem("Language");
switch (lang) {
    case "polski":
        language = "polish";
        break;
    case "english":
    default:
        language = "english";
        break;
}
export function loadLanguage() {
    return import(`../languages/${language}.js`);
}
//# sourceMappingURL=language.js.map