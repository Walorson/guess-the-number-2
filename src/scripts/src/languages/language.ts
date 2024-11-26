let language: string;
const lang = localStorage.getItem("Language");

switch(lang)
{
    case "polski": language = "polish"; break;
    case "english":
    default: language = "english"; break;
}

export function loadLanguage(): any
{
    return import(`../languages/${language}.js`);
}