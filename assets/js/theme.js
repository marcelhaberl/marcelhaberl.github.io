const Theme = {
    Dark: "dark",
    Light: "light",
    System: "system"
}

let currentTheme = Theme.System;
let themeSwitches = 0;

document.addEventListener("DOMContentLoaded", function() {
    if (hasAcceptedCookies()) {
        setTheme(getCookie("theme"));
        themeSwitches = parseInt(getCookie("theme-switches"));
    } else {
        setTheme(currentTheme);
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        if (currentTheme === Theme.System)
            setTheme(Theme.System);
    });
});

function setTheme(theme) {
    currentTheme = theme;
    if (theme === Theme.System) theme = getSystemTheme();

    document.documentElement.setAttribute("data-theme", theme);
    const el = document.getElementById("theme-toggle");
    el.setAttribute("src", getSrcPrefix() + getToggleImageUrl(currentTheme));
}

function getToggleImageUrl(theme) {
    switch (theme) {
        case Theme.System:
            return "assets/img/system_mode.svg";
        case Theme.Light:
            return  "assets/img/light_mode.svg";
        default:
            return  "assets/img/dark_mode.svg";
    }
}

function toggleTheme() {
    let theme;

    if (currentTheme === Theme.System) {
        theme = getSystemTheme() === Theme.Dark ? Theme.Light : Theme.Dark;
        themeSwitches = 1;
    } else {
        if (themeSwitches === 2) {
            theme = Theme.System;
            themeSwitches = 0;
        } else {
            theme = currentTheme === Theme.Dark ? Theme.Light : Theme.Dark;
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
    return darkMode ? Theme.Dark : Theme.Light;
}