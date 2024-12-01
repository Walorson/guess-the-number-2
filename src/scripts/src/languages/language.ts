export let loadLanguage: Function;
let language: string;
const lang = localStorage.getItem("Language");

switch(lang)
{
    case "polski": language = "polish"; break;
    case "english":
    default: language = "english"; break;
}

{
    let langs = await import(`../languages/${language}.js`);

    loadLanguage = function(): any
    {
        return langs.language;
    }
}