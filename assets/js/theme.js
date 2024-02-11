const Theme = {
    DARK: "dark",
    LIGHT: "light",
    SYSTEM: "system"
}

let currentTheme = Theme.SYSTEM;
let themeSwitches = 0;

document.addEventListener("DOMContentLoaded", function() {
    if (hasAcceptedCookies()) {
        setTheme(getCookie("theme"));
        themeSwitches = parseInt(getCookie("theme-switches"));
    } else {
        setTheme(currentTheme);
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        if (currentTheme === Theme.SYSTEM)
            setTheme(Theme.SYSTEM);
    });
});

function hasAcceptedCookies() {
    // TODO: Delete function as soon as cookies are used again.
    return false;
}

function setTheme(theme) {
    if (!theme) theme = Theme.DARK;
    currentTheme = theme;
    if (theme === Theme.SYSTEM) theme = getSystemTheme();

    document.documentElement.setAttribute("data-theme", theme);
    const ELEMENT = document.getElementById("theme-toggle");
    ELEMENT.setAttribute("src", getToggleImageUrl(currentTheme, ELEMENT));
}

function getToggleImageUrl(theme, element) {
    const ATTRIBUTE = element.getAttribute("path");
    let url = ATTRIBUTE ? ATTRIBUTE : "";
    switch (theme) {
        case Theme.SYSTEM:
            url += "system_mode.svg";
            break;
        case Theme.LIGHT:
            url +=  "light_mode.svg";
            break;
        default:
            url +=  "dark_mode.svg";
            break;
    }
    return url;
}

function toggleTheme() {
    let theme;

    if (currentTheme === Theme.SYSTEM) {
        theme = getSystemTheme() === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        themeSwitches = 1;
    } else {
        if (themeSwitches === 2) {
            theme = Theme.SYSTEM;
            themeSwitches = 0;
        } else {
            theme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
            themeSwitches = 2;
        }
    }

    setTheme(theme);
    if (hasAcceptedCookies()) {
        setCookie("theme", currentTheme);
        setCookie("theme-switches", themeSwitches);
    }
}

function getSystemTheme() {
    const darkMode =  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return darkMode ? Theme.DARK : Theme.LIGHT;
}