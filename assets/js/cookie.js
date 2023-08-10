function acceptCookies() {
    findElement().style.animationPlayState = "running";
    setCookie("accepted", true);
    setCookie("lang", language);
    setCookie("theme", document.documentElement.getAttribute("data-theme"));
}

document.addEventListener("DOMContentLoaded", function() {
    if (!hasAcceptedCookies()) {
        const el = findElement();
        el.style.display = "flex";
        el.addEventListener("animationend", function () {
            el.style.display = "none";
        })
    }
});

function findElement() {
    return document.getElementById("cookie-wrapper");
}

function setCookie(key, value) {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const cookieValue = encodeURIComponent(value) + `; expires=${date.toUTCString()}`;
    document.cookie = `${key}=${cookieValue}; path=/`;
}

function getCookie(key) {
    const name = `${key}=`;
    const array = document.cookie.split(';');
    for (const cookie of array) {
        let c = cookie;
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return null;
}

function hasAcceptedCookies() {
    return document.cookie.includes('accepted=true');
}