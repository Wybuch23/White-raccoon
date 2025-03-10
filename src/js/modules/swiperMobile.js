
// export function setupSwiperMobile() {
//     function getSwiperConfig() {
//         return {
//             slidesPerView: "auto",
//             spaceBetween: false,
//             centeredSlides: false,
//             loop: false,
//             grabCursor: true,
//             slideToClickedSlide: true,
//             resistanceRatio: 0.5,
//             threshold: 10,
//         };
//     }

//     let swiper = new Swiper(".swiper", getSwiperConfig());

//     function shakeFirstSlide() {
//         const firstSlide = document.querySelector(".swiper");
//         if (!firstSlide) return;

//         firstSlide.style.transition = "transform 0.20s ease-in-out";
//         firstSlide.style.transform = "translateX(-30px)";

//         setTimeout(() => {
//             firstSlide.style.transform = "translateX(0px)";
//         }, 400);
//     }

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

//     // Фикс: отслеживаем только изменение ширины, а не высоты
//     let lastWindowWidth = window.innerWidth;

//     window.addEventListener("resize", () => {
//         if (window.innerWidth !== lastWindowWidth) { // Только если изменилась ширина
//             lastWindowWidth = window.innerWidth; // Обновляем значение ширины
//             swiper.destroy(true, true);
//             swiper = new Swiper(".swiper", getSwiperConfig());
//             observeFirstSlide();
//         }
//     });
// }


export function setupSwiperMobile() {
    function getSwiperConfig() {
        return {
            slidesPerView: "auto",
            spaceBetween: false,
            centeredSlides: false,
            loop: false,
            grabCursor: true,
            slideToClickedSlide: true,
            resistanceRatio: 0.5,
            threshold: 10,
        };
    }

    let swipers = document.querySelectorAll(".swiper");
    let swiperInstances = [];

    swipers.forEach((swiperElement) => {
        let swiper = new Swiper(swiperElement, getSwiperConfig());
        swiperInstances.push(swiper);
    });

    function shakeSwiper(swiperWrapper) {
        if (!swiperWrapper) return;

        swiperWrapper.style.transition = "transform 0.2s ease-in-out";
        swiperWrapper.style.transform = "translateX(-30px)";

        setTimeout(() => {
            swiperWrapper.style.transform = "translateX(0px)";
        }, 400);
    }

    function observeSwipers() {
        swipers.forEach((swiperElement) => {
            if (window.innerWidth > 375) return;

            const swiperWrapper = swiperElement.querySelector(".swiper-wrapper");
            if (!swiperWrapper) return;

            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            shakeSwiper(swiperWrapper);
                            observer.disconnect(); // Анимация для этого элемента только один раз
                        }
                    });
                },
                { threshold: 1.0 }
            );

            observer.observe(swiperElement);
        });
    }

    observeSwipers();

    // Фикс: отслеживаем только изменение ширины, а не высоты
    let lastWindowWidth = window.innerWidth;

    window.addEventListener("resize", () => {
        if (window.innerWidth !== lastWindowWidth) { // Только если изменилась ширина
            lastWindowWidth = window.innerWidth; // Обновляем значение ширины

            swiperInstances.forEach((swiper) => swiper.destroy(true, true));
            swiperInstances = [];

            swipers.forEach((swiperElement) => {
                let newSwiper = new Swiper(swiperElement, getSwiperConfig());
                swiperInstances.push(newSwiper);
            });

            observeSwipers();
        }
    });
}
