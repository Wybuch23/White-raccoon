// import { fadeIn, fadeOut } from "./modules/fade.js";
import { setupHeaderToggle } from "./modules/headerToggle.js";
import { setupMobileNavigation } from "./modules/mobileNavigation.js";
import { setupCardHoverEffect } from "./modules/cardHover.js";
import { setupMessageBubbles } from "./modules/messageBubbles.js";
import { setupScrollHeader } from "./modules/scrollHeader.js";
import { setupFocusBlue } from "./modules/focusBlue.js";

document.addEventListener("DOMContentLoaded", () => {
    setupHeaderToggle();
    setupMobileNavigation();
    setupCardHoverEffect();
    setupMessageBubbles();
    setupScrollHeader();
    setupFocusBlue();
});

// рабочая версия

// const swiper = new Swiper('.swiper', {
//     loop: true,
//     pagination: false,  // Отключаем встроенную пагинацию
//     slidesPerView: 'auto',
//     spaceBetween: window.innerWidth * 0.5,
//     centeredSlides: true,
//     grabCursor: true,
//     allowTouchMove: true,
//     speed: 500,
// });

// // Функция для обновления заголовка и текста
// function updateContent() {
//     const activeSlide = document.querySelector('.swiper-slide-active');

//     // Проверяем, если у слайда есть нужные атрибуты
//     if (activeSlide) {
//         const title = activeSlide.dataset.title || "Нет заголовка";  // Убедитесь, что атрибуты есть
//         const text = activeSlide.dataset.text || "Нет текста";      // Убедитесь, что атрибуты есть

//         // Обновляем содержимое
//         document.querySelector('.mobile-card__title').textContent = title;
//         document.querySelector('.mobile-card__text').innerHTML = text;
//     }
// }

// // Инициализируем обновление контента сразу после загрузки страницы
// updateContent();

// // Синхронизация активных точек и обновление текста при изменении слайда
// swiper.on('slideChangeTransitionEnd', function () {
//     const activeIndex = swiper.realIndex; // Получаем индекс активного слайда
//     const dots = document.querySelectorAll('.mobile-card__dot');

//     // Снимаем класс 'active' со всех точек
//     dots.forEach(dot => dot.classList.remove('active'));

//     // Добавляем класс 'active' к точке, соответствующей текущему слайду
//     dots[activeIndex].classList.add('active');

//     // Обновляем текст
//     updateContent();
// });

// Анимация появления 

const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: false,  // Отключаем встроенную пагинацию
    slidesPerView: 'auto',
    spaceBetween: window.innerWidth * 0.5,
    centeredSlides: true,
    grabCursor: true,
    allowTouchMove: true,
    speed: 400,
});

// Функция для обновления активного слайда и точек
function updateActiveSlide() {
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.classList.remove('active'); // Убираем у всех слайдов
    });

    const activeSlide = document.querySelector('.swiper-slide-active');
    if (activeSlide) {
        activeSlide.classList.add('active'); // Добавляем активному
    }

    updateDots(swiper.realIndex); // Обновляем точки
}

// Функция для обновления заголовка, текста и анимации
function updateContent() {
    const activeSlide = document.querySelector('.swiper-slide-active');
    const titleElement = document.querySelector('.mobile-card__title');
    const textElement = document.querySelector('.mobile-card__text');

    if (activeSlide) {
        const title = activeSlide.dataset.title || "Нет заголовка";
        const text = activeSlide.dataset.text || "Нет текста";

        // Анимация исчезновения
        titleElement.style.opacity = 0;
        textElement.style.opacity = 0;

        setTimeout(() => {
            titleElement.textContent = title;
            textElement.innerHTML = text;

            // Анимация появления
            titleElement.style.opacity = 1;
            textElement.style.opacity = 1;
        }, 200); // Совпадает с CSS-анимацией
    }
}

// Функция для обновления точек (пагинации)
function updateDots(activeIndex) {
    const dots = document.querySelectorAll('.mobile-card__dot');

    if (dots.length > 0) {
        dots.forEach(dot => dot.classList.remove('active')); // Убираем у всех
        if (dots[activeIndex]) {
            dots[activeIndex].classList.add('active'); // Добавляем только активной
        }
    }
}

// Инициализация
updateActiveSlide();
updateContent();

// Обновляем при смене слайда
swiper.on('slideChangeTransitionEnd', function () {
    updateActiveSlide();
    updateContent();
});

