const Theme = {
    Dark: "dark",
    Light: "light"
}

document.addEventListener("DOMContentLoaded", function() {
    const isDarkMode = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (!isDarkMode()) {
        setTheme(Theme.Dark);
    } else {
        setTheme(Theme.Light);
    }
});

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const el = document.getElementById("theme-toggle");
    const url = (el.hasAttribute("add") ? "../" : "") + getToggleImageUrl(theme)
    el.setAttribute("src", url);
}

function getToggleImageUrl(theme) {
    if (theme === Theme.Dark) {
        return  "assets/img/dark_mode.svg";
    }
    return  "assets/img/light_mode.svg";
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === Theme.Dark ? Theme.Light : Theme.Dark);
}