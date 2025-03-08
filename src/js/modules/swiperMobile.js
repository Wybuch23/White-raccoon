// export function setupSwiperMobile() {
//     const swiper = new Swiper(".swiper", {
//         slidesPerView: "auto", // Автоматическая ширина карточек
//         spaceBetween: 15, // Отступ между карточками
//         centeredSlides: false, // ОТКЛЮЧАЕМ центрирование
//         loop: false, // Отключаем бесконечную прокрутку
//         grabCursor: true, // Красивый курсор "рука"
//         slideToClickedSlide: true, // Клик по карточке — листает
//         resistanceRatio: 0.5, // Чувствительность к свайпу
//         threshold: 10, // Минимальная чувствительность к свайпу
//     });
// }

export function setupSwiperMobile() {
    function getSwiperConfig() {
        return {
            slidesPerView: "auto",
            spaceBetween: 10,
            centeredSlides: false,
            loop: false,
            grabCursor: true,
            slideToClickedSlide: true,
            resistanceRatio: 0.5,
            threshold: 10,
            slidesOffsetAfter: window.innerWidth <= 375 ? 40 : 0,
        };
    }

    let swiper = new Swiper(".swiper", getSwiperConfig());

    // Функция подёргивания первого слайда
    function shakeFirstSlide() {
        const firstSlide = document.querySelector(".swiper-slide");
        if (!firstSlide) return;

        firstSlide.style.transition = "transform 0.15s ease-in-out";
        firstSlide.style.transform = "translateX(-10px)";

        setTimeout(() => {
            firstSlide.style.transform = "translateX(0px)";
        }, 150);

        setTimeout(() => {
            firstSlide.style.transform = "translateX(-5px)";
        }, 300);

        setTimeout(() => {
            firstSlide.style.transform = "translateX(0px)";
        }, 450);
    }

    // Следим, когда первый слайд полностью в зоне видимости
    function observeFirstSlide() {
        const firstSlide = document.querySelector(".swiper-slide");
        if (!firstSlide || window.innerWidth > 375) return;

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        shakeFirstSlide();
                        observer.disconnect(); // Отключаем после первого срабатывания
                    }
                });
            },
            { threshold: 1.0 } // Запускаем только когда 100% в зоне видимости
        );

        observer.observe(firstSlide);
    }

    observeFirstSlide();

    // Обновляем Swiper при изменении экрана
    window.addEventListener("resize", () => {
        swiper.destroy(true, true);
        swiper = new Swiper(".swiper", getSwiperConfig());
        observeFirstSlide(); // Заново отслеживаем первый слайд
    });
}
