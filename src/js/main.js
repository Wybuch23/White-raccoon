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

// свайпер

// document.addEventListener("DOMContentLoaded", function () {
//     const swiper = new Swiper(".mySwiper", {
//         slidesPerView: 3, // Показывать 3 слайда
//         spaceBetween: 20, // Отступы между слайдами
//         slidesPerGroup: 1, // Переключать по 1 слайду
//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },
//         mousewheel: false, // Управление колесиком мыши
//         loop: false, // Убираем зацикливание, т.к. оно может мешать корректной работе
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const swiper = new Swiper(".mySwiper", {
//         slidesPerView: 3,
//         spaceBetween: 20,
//         slidesPerGroup: 1,
//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },
//         mousewheel: true,
//         loop: false,
//     });
// });


document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerGroup: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        mousewheel: false,
        loop: false,
    });

    // Функция для обновления видимости кнопок
    function updateNavigationButtons() {
        const nextButton = document.querySelector(".swiper-button-next");
        const prevButton = document.querySelector(".swiper-button-prev");

        // Если это последний слайд, скрываем кнопку "next"
        if (swiper.isEnd) {
            nextButton.classList.add("hidden");  // Добавляем класс для скрытия
        } else {
            nextButton.classList.remove("hidden");  // Убираем класс, если слайды есть впереди
        }

        // Если это первый слайд, скрываем кнопку "prev"
        if (swiper.isBeginning) {
            prevButton.classList.add("hidden");  // Добавляем класс для скрытия
        } else {
            prevButton.classList.remove("hidden");  // Убираем класс, если слайды есть назад
        }
    }

    // Обновляем видимость кнопок при изменении слайда
    swiper.on("slideChange", function () {
        updateNavigationButtons();
    });

    // Инициализируем видимость кнопок при загрузке
    updateNavigationButtons();
});


// появление 



// window.addEventListener('scroll', function() {
//     const sticky = document.querySelector('.basic__sticky-title_hidden');  // Блок, который двигается
//     const triggerTop = document.querySelector('.why-cleaning__trigger-top');  // Верхний триггер

//     // Получаем координаты блока sticky и триггера
//     const stickyRect = sticky.getBoundingClientRect();
//     const triggerTopRect = triggerTop.getBoundingClientRect();

//     // Проверяем, касаются ли они
//     if (stickyRect.bottom >= triggerTopRect.top && stickyRect.top <= triggerTopRect.bottom) {
//         sticky.classList.add('touched');
//     } else {
//         sticky.classList.remove('touched');
//     }
// });


window.addEventListener('scroll', function() {
    // Все элементы с классом .basic__sticky-title
    const stickies = document.querySelectorAll('.basic__sticky-title_hidden');  
    // Верхний триггер
    const triggerTop = document.querySelector('.why-cleaning__trigger-top');  

    stickies.forEach(function(sticky) {
        // Получаем координаты блока sticky и триггера
        const stickyRect = sticky.getBoundingClientRect();
        const triggerTopRect = triggerTop.getBoundingClientRect();

        // Проверяем, касаются ли они
        if (stickyRect.bottom >= triggerTopRect.top && stickyRect.top <= triggerTopRect.bottom) {
            sticky.classList.add('touched');  // Добавляем класс, если касаются
        } else {
            sticky.classList.remove('touched');  // Убираем класс, если не касаются
        }
    });
});


