// swiperCleanersSetup.js
export function setupSwiperCleaners() {
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
            nextButton.classList.add("hidden");
        } else {
            nextButton.classList.remove("hidden");
        }

        // Если это первый слайд, скрываем кнопку "prev"
        if (swiper.isBeginning) {
            prevButton.classList.add("hidden");
        } else {
            prevButton.classList.remove("hidden");
        }
    }

    // Обновляем видимость кнопок при изменении слайда
    swiper.on("slideChange", function () {
        updateNavigationButtons();
    });

    // Инициализируем видимость кнопок при загрузке
    updateNavigationButtons();
}
