import { fadeIn, fadeOut } from "./modules/fade.js";
import { setupHeaderToggle } from "./modules/headerToggle.js";
import { setupMobileNavigation } from "./modules/mobileNavigation.js";
import { setupCardHoverEffect } from "./modules/cardHover.js";
import { setupMessageBubbles } from "./modules/messageBubbles.js";
import { setupScrollHeader } from "./modules/scrollHeader.js";
import { setupFocusBlue } from "./modules/focusBlue.js";
import { setupSwiperMobile } from "./modules/swiperMobile.js";

document.addEventListener("DOMContentLoaded", () => {
    setupHeaderToggle();
    setupMobileNavigation();
    setupCardHoverEffect();
    setupMessageBubbles();
    setupScrollHeader();
    setupFocusBlue();
    setupSwiperMobile();
});

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabs-control__tub");
    const images = document.querySelectorAll(".card-tabs-img__wrapped_right .card-tabs-img__img");

    // Массив путей картинок
    const imageSources = [
        "src/assets/images/dry-cleaning/dry-cleaning-img-1.png",
        "src/assets/images/dry-cleaning/dry-cleaning-img-2.png",
        "src/assets/images/dry-cleaning/dry-cleaning-img-3.png",
        "src/assets/images/dry-cleaning/dry-cleaning-img-4.png",
        "src/assets/images/dry-cleaning/dry-cleaning-img-5.png"
    ];

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            if (tab.classList.contains("active")) return;
            // Убираем активный класс у всех табов
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // Скрываем все картинки с плавным переходом
            images.forEach(img => fadeOut(img));

            // Меняем картинку и показываем её с плавным переходом
            fadeOut(images[index], () => {
                images[index].src = imageSources[index]; // Меняем изображение
                fadeIn(images[index]); // Плавно показываем новое изображение
            });
        });
    });
});