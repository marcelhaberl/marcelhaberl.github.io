let lastY = 0;

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", () => {
        const HEADER = document.querySelector("header");
        if (!HEADER) return;

        const CURRENT_Y = window.scrollY;
        if (CURRENT_Y <= 0) return;

        if (lastY >= CURRENT_Y) {
            HEADER.style.top = "0";
        } else {
            if (!HEADER.matches(":hover")) {
                HEADER.style.top = "-500px";
            }
        }
        lastY = CURRENT_Y;
    });
});