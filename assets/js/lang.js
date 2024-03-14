let currentLanguage = getSystemLang();
let messages;

document.addEventListener('DOMContentLoaded', function() {
    if (hasAcceptedCookies()) {
        currentLanguage = getCookie("lang");
    }
    document.dispatchEvent(new Event("loadLang"));
    fetch("/assets/lang.json")
        .then(res => res.json())
        .then(json => messages = json)
        .then(json => document.dispatchEvent(new CustomEvent("langLoaded", json)))
        .then(writeMessages);
});

function toggleLanguage() {
    currentLanguage = (currentLanguage === 'de') ? 'en' : 'de';
    writeMessages()
    if (hasAcceptedCookies()) {
        setCookie("lang", currentLanguage);
    }
}

function getMessages() {
    return messages[currentLanguage];
}

function writeMessages() {
    for (const ELEMENT of document.getElementsByClassName("greeting")) {
        ELEMENT.innerText = getGreeting();
    }
    for (const key in getMessages()) {
        if (key.startsWith("greeting_") && key !== "greeting_i_am") continue;
        for (const ELEMENT of document.getElementsByClassName(key)) {
            ELEMENT.innerHTML = getMessages()[key];
        }
    }
}

function getGreeting() {
    const TIME = new Date().getHours();
    if (TIME >= 0 && TIME < 11) {
        return getMessages()["greeting_morning"];
    } else if (TIME >= 11 && TIME < 18) {
        return getMessages()["greeting_afternoon"];
    } else {
        return getMessages()["greeting_evening"];
    }
}

function getSystemLang() {
    for (const LANG of navigator.languages) {
        if (LANG.includes("en"))
            return "en";
        else if (LANG.includes("de")) {
            return "de";
        }
    }
    return "en";
}