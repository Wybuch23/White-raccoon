import { fadeIn, fadeOut } from "./fade.js"

export function setupHeaderToggle() {
    const toggleBtn = document.getElementById("toggle-btn-header-dekstop");
    const iconDots = document.getElementById("icon-dots-horizontal-header-dekstop");
    const iconClose = document.getElementById("icon-close-header-dekstop");
    const navPrimary = document.getElementById("nav-primary");
    const navSecondary = document.getElementById("nav-secondary");

    if (!toggleBtn || !iconDots || !iconClose || !navPrimary || !navSecondary) return;

    toggleBtn.addEventListener("click", () => {
        iconDots.classList.toggle("active");
        iconClose.classList.toggle("active");

        if (navPrimary.classList.contains("active")) {
            fadeOut(navPrimary, () => {
                navPrimary.classList.remove("active");
                navSecondary.classList.add("active");
                fadeIn(navSecondary);
            });
        } else {
            fadeOut(navSecondary, () => {
                navSecondary.classList.remove("active");
                navPrimary.classList.add("active");
                fadeIn(navPrimary);
            });
        }
    });
}