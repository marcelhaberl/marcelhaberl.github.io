function acceptCookies() {
    findElement().style.animationPlayState = "running";
    setCookie("accepted", true);
    setCookie("lang", currentLanguage);
    setCookie("theme", currentTheme);
    setCookie("theme-switches", themeSwitches);
}

document.addEventListener("DOMContentLoaded", function() {
    if (!hasAcceptedCookies()) {
        writeBanner();
        const ELEMENT = findElement();
        ELEMENT.style.display = "flex";
        ELEMENT.addEventListener("animationend", function () {
            ELEMENT.style.display = "none";
        })
    }
});

function writeBanner() {
    const URL = document.body.hasAttribute("add-src") ? document.body.getAttribute("add-src") : "";
    document.body.insertAdjacentHTML("beforeend", `<div id="cookie-wrapper"> 
        <div class="cookie-content-wrapper">
            <div class="cookie-header">
                <img src="${URL}assets/img/cookie.svg" alt="cookie" id="cookie-image">
                <h2>Cookies</h2>
            </div>
            <p id="cookie" class="info"></p>
            <button id="cookie_btn" class="info" onclick="acceptCookies()"></button>
        </div>
    </div>
    `);
}

function findElement() {
    return document.getElementById("cookie-wrapper");
}

function setCookie(key, value) {
    const DATE = new Date();
    DATE.setDate(DATE.getDate() + 30);
    const COOKIE_VALUE = encodeURIComponent(value) + `; expires=${DATE.toUTCString()}`;
    document.cookie = `${key}=${COOKIE_VALUE}; path=/`;
}

function getCookie(cookieKey) {
    const KEY = `${cookieKey}=`;
    const ARRAY = document.cookie.split(';');
    for (const COOKIE of ARRAY) {
        let content = COOKIE;
        while (content.charAt(0) === ' ') {
            content = content.substring(1);
        }
        if (content.indexOf(KEY) === 0) {
            return decodeURIComponent(content.substring(KEY.length, content.length));
        }
    }
    return null;
}

function hasAcceptedCookies() {
    return document.cookie.includes('accepted=true');
}