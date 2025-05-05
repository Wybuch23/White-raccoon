

// // /* Скрытие шапки при скролле */
// export function setupScrollHeader() {
//     let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
//     const header = document.querySelector(".header");
//     const scrollThreshold = 160;

//     window.addEventListener("scroll", () => {
//         let scrollTop = window.scrollY || document.documentElement.scrollTop;

//         // Добавляем проверку на наличие класса 'focus-blue'
//         if (scrollTop > lastScrollTop + scrollThreshold && !header.classList.contains("focus-blue")) {
//             header.classList.add("hide");
//             lastScrollTop = scrollTop; // Обновляем только после скрытия
//         } else if (scrollTop < lastScrollTop - scrollThreshold) {
//             header.classList.remove("hide");
//             lastScrollTop = scrollTop; // Обновляем только после появления
//         }
//     });
// }


export function setupScrollHeader() {
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    const header = document.querySelector(".header");
    const hero = document.querySelector(".hero");
    const scrollThreshold = 160;

    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        // Проверка, виден ли блок .hero
        const heroRect = hero?.getBoundingClientRect();
        const isHeroVisible = heroRect &&
            heroRect.bottom > 0 &&
            heroRect.top < window.innerHeight;

        // Если .hero в поле видимости — не скрываем хедер
        if (isHeroVisible) {
            header.classList.remove("hide");
            return;
        }

        // Если скроллим вниз, и .hero не виден, и нет .focus-blue
        if (scrollTop > lastScrollTop + scrollThreshold && !header.classList.contains("focus-blue")) {
            header.classList.add("hide");
            lastScrollTop = scrollTop;
        } 
        // Скроллим вверх
        else if (scrollTop < lastScrollTop - scrollThreshold) {
            header.classList.remove("hide");
            lastScrollTop = scrollTop;
        }
    });
}
