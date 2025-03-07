/* Скрытие шапки при скролле */
export function setupScrollHeader() {
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    const header = document.querySelector(".header");
    const scrollThreshold = 160;

    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop + scrollThreshold) {
            header.classList.add("hide");
            lastScrollTop = scrollTop; // Обновляем только после скрытия
        } else if (scrollTop < lastScrollTop - scrollThreshold) {
            header.classList.remove("hide");
            lastScrollTop = scrollTop; // Обновляем только после появления
        }
    });
}