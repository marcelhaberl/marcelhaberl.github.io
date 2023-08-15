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

function setTheme(theme) {
    if (!theme) theme = Theme.DARK;
    currentTheme = theme;
    if (theme === Theme.SYSTEM) theme = getSystemTheme();

    document.documentElement.setAttribute("data-theme", theme);
    const el = document.getElementById("theme-toggle");
    el.setAttribute("src", getSrcPrefix() + getToggleImageUrl(currentTheme));
}

function getToggleImageUrl(theme) {
    switch (theme) {
        case Theme.SYSTEM:
            return "assets/img/system_mode.svg";
        case Theme.LIGHT:
            return  "assets/img/light_mode.svg";
        default:
            return  "assets/img/dark_mode.svg";
    }
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