let lastY = 0;

document.addEventListener("DOMContentLoaded", () => {
    const HEADER = document.querySelector("header");
    window.addEventListener("scroll", () => scroll(HEADER));
    registerHeaderClickEvent(document.querySelector("#content header nav .menu"), HEADER);
    for (const ELEMENT of HEADER.getElementsByTagName("a")) {
        registerHeaderClickEvent(ELEMENT, HEADER);
    }
});

function registerHeaderClickEvent(element, header) {
    element.addEventListener("click", () => toggleMenu(header));
}

function scroll(header) {
    if (!header) return;

    const CURRENT_Y = window.scrollY;
    if (CURRENT_Y <= 0) return;

    if (lastY >= CURRENT_Y) {
        header.style.top = "0";
    } else {
        if (!header.matches(":hover")) {
            header.style.top = "-500px";
        }
    }
    lastY = CURRENT_Y;
}

function toggleMenu(header) {
    if (!header) return;

    const MENU = header.querySelector("#content header nav .menu img.menu_item");
    const CLOSE = header.querySelector("#content header nav .menu img.close_item");

    MENU.classList.toggle("show");
    CLOSE.classList.toggle("show");


    const PARENT = document.querySelector("#content header nav");
    for (const ELEMENT of PARENT.getElementsByTagName("a")) {
        ELEMENT.classList.toggle("show");
    }
}