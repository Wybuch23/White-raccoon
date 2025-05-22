// export function setupCardHoverEffect() {
//     const allCards = document.querySelectorAll(".basic__card-primary");
//     let isHovered = false; // Флаг, был ли уже ховер 

//     allCards.forEach(card => {
//         let enterTimeout, leaveTimeout;

//         card.addEventListener("mouseenter", () => {
//             clearTimeout(leaveTimeout); // Отменяем удаление, если мышь быстро вернулась

//             if (isHovered) {
//                 // Если уже была наведена хоть одна карточка – без задержки
//                 card.classList.add("hover-active");
//             } else {
//                 // Если это первое наведение, ждем 200 мс
//                 enterTimeout = setTimeout(() => {
//                     card.classList.add("hover-active");
//                     isHovered = true; // Запоминаем, что хоть раз навелись
//                 }, 200);
//             }
//         });

//         card.addEventListener("mouseleave", () => {
//             clearTimeout(enterTimeout); // Отменяем добавление, если мышь ушла до завершения таймера

//             leaveTimeout = setTimeout(() => {
//                 card.classList.remove("hover-active");

//                 // Проверяем, осталась ли хоть одна активная карточка
//                 if (![...allCards].some(card => card.matches(":hover"))) {
//                     isHovered = false; // Если нет, сбрасываем флаг
//                 }
//             }, 200);
//         });
//     });
// }

// export function setupCardHoverEffect() {
//     const allCards = document.querySelectorAll(".basic__card-primary");

//     allCards.forEach(card => {
//         card.addEventListener("mouseenter", () => {
//             card.classList.add("hover-active");
//         });

//         card.addEventListener("mouseleave", () => {
//             card.classList.remove("hover-active");
//         });
//     });
// }


export function setupCardHoverEffect() {
    const allCards = document.querySelectorAll(".basic__card-primary");
    const triggerArea = document.getElementById("trigger-cleaning-focus");

    let activeCard = null;

    allCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            if (activeCard && activeCard !== card) {
                activeCard.classList.remove("hover-active");
            }

            card.classList.add("hover-active");
            activeCard = card;
        });
    });

    // Когда курсор покидает зону, снимаем активный класс
    if (triggerArea) {
        triggerArea.addEventListener("mouseleave", () => {
            if (activeCard) {
                activeCard.classList.remove("hover-active");
                activeCard = null;
            }
        });
    }
}

