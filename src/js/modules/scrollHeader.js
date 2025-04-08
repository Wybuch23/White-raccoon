// /* Скрытие шапки при скролле */
// export function setupScrollHeader() {
//     let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
//     const header = document.querySelector(".header");
//     const scrollThreshold = 160;

//     window.addEventListener("scroll", () => {
//         let scrollTop = window.scrollY || document.documentElement.scrollTop;

//         if (scrollTop > lastScrollTop + scrollThreshold) {
//             header.classList.add("hide");
//             lastScrollTop = scrollTop; // Обновляем только после скрытия
//         } else if (scrollTop < lastScrollTop - scrollThreshold) {
//             header.classList.remove("hide");
//             lastScrollTop = scrollTop; // Обновляем только после появления
//         }
//     });
// }

// /* Скрытие шапки при скролле */
export function setupScrollHeader() {
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    const header = document.querySelector(".header");
    const scrollThreshold = 160;

    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        // Добавляем проверку на наличие класса 'focus-blue'
        if (scrollTop > lastScrollTop + scrollThreshold && !header.classList.contains("focus-blue")) {
            header.classList.add("hide");
            lastScrollTop = scrollTop; // Обновляем только после скрытия
        } else if (scrollTop < lastScrollTop - scrollThreshold) {
            header.classList.remove("hide");
            lastScrollTop = scrollTop; // Обновляем только после появления
        }
    });
}


// let disableScrollDetection = false;

// // Экспортируем флаг для управления извне убирает отслеживание скрола
// export function temporarilyDisableScrollHeader(ms = 1000) {
//     disableScrollDetection = true;
//     setTimeout(() => {
//         disableScrollDetection = false;
//     }, ms);
// }

// export function setupScrollHeader() {
//     let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
//     const header = document.querySelector(".header");
//     const scrollThreshold = 160;

//     window.addEventListener("scroll", () => {
//         if (disableScrollDetection) return; // Если флаг включен, игнорируем скролл

//         let scrollTop = window.scrollY || document.documentElement.scrollTop;

//         // Если прокручиваем вниз больше чем на threshold — скрываем хедер
//         if (scrollTop > lastScrollTop + scrollThreshold && !header.classList.contains("focus-blue")) {
//             header.classList.add("hide");
//             lastScrollTop = scrollTop;
//         }
//         // Если прокручиваем вверх — показываем хедер
//         else if (scrollTop < lastScrollTop - scrollThreshold) {
//             header.classList.remove("hide");
//             lastScrollTop = scrollTop;
//         }
//     });
// }
