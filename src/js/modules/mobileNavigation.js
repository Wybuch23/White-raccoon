import { fadeIn, fadeOut } from "./fade.js"

export function setupMobileNavigation() {
    const toggleBtn = document.getElementById("toggle-btn-header-mobile");
    const iconDots = document.getElementById("icon-dots-vertical-header-mobile");
    const iconClose = document.getElementById("icon-close-header-mobile");
    const nav = document.getElementById("navigation-switch-header-mobile");

    if (!toggleBtn || !iconDots || !iconClose || !nav) return;

    toggleBtn.addEventListener("click", () => {
        iconDots.classList.toggle("active");
        iconClose.classList.toggle("active");

        if (nav.classList.contains("active")) {
            fadeOut(nav, () => nav.classList.remove("active"));
        } else {
            nav.classList.add("active");
            fadeIn(nav);
        }
    });
}