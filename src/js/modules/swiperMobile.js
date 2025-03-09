// export function setupSwiperMobile() {
//     function getSwiperConfig() {
//         return {
//             slidesPerView: "auto",
//             spaceBetween: 10,
//             centeredSlides: false,
//             loop: false,
//             grabCursor: true,
//             slideToClickedSlide: true,
//             resistanceRatio: 0.5,
//             threshold: 10,
//         };
//     }

//     let swiper = new Swiper(".swiper", getSwiperConfig());

//     // Функция подёргивания первого слайда
//     function shakeFirstSlide() {
//         const firstSlide = document.querySelector(".swiper-slide");
//         if (!firstSlide) return;

//         firstSlide.style.transition = "transform 0.15s ease-in-out";
//         firstSlide.style.transform = "translateX(-10px)";

//         setTimeout(() => {
//             firstSlide.style.transform = "translateX(0px)";
//         }, 150);

//         setTimeout(() => {
//             firstSlide.style.transform = "translateX(-5px)";
//         }, 300);

//         setTimeout(() => {
//             firstSlide.style.transform = "translateX(0px)";
//         }, 450);
//     }

//     // Следим, когда первый слайд полностью в зоне видимости
//     function observeFirstSlide() {
//         const firstSlide = document.querySelector(".swiper-slide");
//         if (!firstSlide || window.innerWidth > 375) return;

//         const observer = new IntersectionObserver(
//             (entries, observer) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         shakeFirstSlide();
//                         observer.disconnect();
//                     }
//                 });
//             },
//             { threshold: 1.0 }
//         );

//         observer.observe(firstSlide);
//     }

//     observeFirstSlide();

//     // Обновляем Swiper при изменении экрана
//     window.addEventListener("resize", () => {
//         swiper.destroy(true, true);
//         swiper = new Swiper(".swiper", getSwiperConfig());
//         observeFirstSlide();
//     });
// }

export function setupSwiperMobile() {
    function getSwiperConfig() {
        return {
            slidesPerView: "auto",
            spaceBetween: 15,
            centeredSlides: false,
            loop: false,
            grabCursor: true,
            slideToClickedSlide: true,
            resistanceRatio: 0.5,
            threshold: 10,
        };
    }

    let swiper = new Swiper(".swiper", getSwiperConfig());

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

    function observeFirstSlide() {
        const firstSlide = document.querySelector(".swiper-slide");
        if (!firstSlide || window.innerWidth > 375) return;

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        shakeFirstSlide();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 1.0 }
        );

        observer.observe(firstSlide);
    }

    observeFirstSlide();

    // Фикс: отслеживаем только изменение ширины, а не высоты
    let lastWindowWidth = window.innerWidth;

    window.addEventListener("resize", () => {
        if (window.innerWidth !== lastWindowWidth) { // Только если изменилась ширина
            lastWindowWidth = window.innerWidth; // Обновляем значение ширины
            swiper.destroy(true, true);
            swiper = new Swiper(".swiper", getSwiperConfig());
            observeFirstSlide();
        }
    });
}
