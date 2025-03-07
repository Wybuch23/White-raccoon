export function setupCardHoverEffect() {
    const allCards = document.querySelectorAll(".basic__card-primary");
    let isHovered = false; // Флаг, был ли уже ховер 

    allCards.forEach(card => {
        let enterTimeout, leaveTimeout;

        card.addEventListener("mouseenter", () => {
            clearTimeout(leaveTimeout); // Отменяем удаление, если мышь быстро вернулась

            if (isHovered) {
                // Если уже была наведена хоть одна карточка – без задержки
                card.classList.add("hover-active");
            } else {
                // Если это первое наведение, ждем 200 мс
                enterTimeout = setTimeout(() => {
                    card.classList.add("hover-active");
                    isHovered = true; // Запоминаем, что хоть раз навелись
                }, 200);
            }
        });

        card.addEventListener("mouseleave", () => {
            clearTimeout(enterTimeout); // Отменяем добавление, если мышь ушла до завершения таймера

            leaveTimeout = setTimeout(() => {
                card.classList.remove("hover-active");

                // Проверяем, осталась ли хоть одна активная карточка
                if (![...allCards].some(card => card.matches(":hover"))) {
                    isHovered = false; // Если нет, сбрасываем флаг
                }
            }, 200);
        });
    });
}