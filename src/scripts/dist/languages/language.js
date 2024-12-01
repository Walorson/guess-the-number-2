export let loadLanguage;
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
{
    let langs = await import(`../languages/${language}.js`);
    loadLanguage = function () {
        return langs.language;
    };
}
//# sourceMappingURL=language.js.map