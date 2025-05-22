/* Всплывающие сообщения */



// export function setupMessageBubbles() {
//     for (let i = 1; i <= 6; i++) {
//         const trigger = document.querySelector(`.bubble__massage_triger-${i}`);
//         const bubbleCard = document.querySelector(`.speech-bubble__card-0${i}`);

//         if (!trigger || !bubbleCard) continue;

//         let enterTimeout, leaveTimeout;

//         // Показываем пузырь при наведении
//         trigger.addEventListener("mouseenter", () => {
//             clearTimeout(leaveTimeout);
//             enterTimeout = setTimeout(() => {
//                 bubbleCard.style.display = "block";
//                 bubbleCard.style.opacity = "1";
//             }, 200);
//         });

//         // Скрываем пузырь при убирании курсора
//         trigger.addEventListener("mouseleave", () => {
//             clearTimeout(enterTimeout);
//             leaveTimeout = setTimeout(() => {
//                 bubbleCard.style.opacity = "0";
//                 setTimeout(() => bubbleCard.style.display = "none", 200);
//             }, 200);
//         });

//         // Наблюдаем за выходом триггера из области видимости
//         const observer = new IntersectionObserver(([entry]) => {
//             if (!entry.isIntersecting) {
//                 clearTimeout(enterTimeout);
//                 clearTimeout(leaveTimeout);
//                 bubbleCard.style.opacity = "0";
//                 setTimeout(() => {
//                     bubbleCard.style.display = "none";
//                 }, 200);
//             }
//         }, {
//             threshold: 0.01,
//         });

//         observer.observe(trigger);
//     }
// }


// export function setupMessageBubbles() {
//     let isActive = false;
//     const triggerZone = document.getElementById("trigger-cleaning-focus");

//     const bubbles = [];
//     const triggers = [];

//     // Собираем все пары триггер/пузырь
//     for (let i = 1; i <= 6; i++) {
//         const trigger = document.querySelector(`.bubble__massage_triger-${i}`);
//         const bubble = document.querySelector(`.speech-bubble__card-0${i}`);
//         if (trigger && bubble) {
//             triggers.push(trigger);
//             bubbles.push({ trigger, bubble });
//             bubble.style.display = "none";
//             bubble.style.opacity = "0";
//         }
//     }

//     // Обработка клика на иконку — активирует показ пузырей
//     document.querySelectorAll(".basic__card-icon").forEach(icon => {
//         icon.addEventListener("click", () => {
//             isActive = true;

//             // Определяем карточку, в которой нажата иконка
//             const parentCard = icon.closest(".basic__card-primary");

//             // Показываем только связанные с этой карточкой пузырьки
//             bubbles.forEach(({ trigger, bubble }) => {
//                 if (parentCard && parentCard.contains(trigger)) {
//                     bubble.style.display = "block";
//                     bubble.style.opacity = "1";
//                 } else {
//                     bubble.style.display = "none";
//                     bubble.style.opacity = "0";
//                 }
//             });
//         });
//     });

//     // При наведении — показываем соответствующий пузырь, если активировано
//     bubbles.forEach(({ trigger, bubble }) => {
//         trigger.addEventListener("mouseenter", () => {
//             if (!isActive) return;
//             bubble.style.display = "block";
//             bubble.style.opacity = "1";
//         });

//         trigger.addEventListener("mouseleave", () => {
//             if (!isActive) return;
//             bubble.style.opacity = "0";
//             setTimeout(() => {
//                 bubble.style.display = "none";
//             }, 200);
//         });
//     });

//     // При выходе курсора за trigger-cleaning-focus — отключаем показ пузырей
//     if (triggerZone) {
//         triggerZone.addEventListener("mouseleave", () => {
//             if (!isActive) return;
//             isActive = false;

//             bubbles.forEach(({ bubble }) => {
//                 bubble.style.opacity = "0";
//                 setTimeout(() => {
//                     bubble.style.display = "none";
//                 }, 200);
//             });
//         });
//     }
// }


// export function setupMessageBubbles() {
//     let activeCard = null;
//     const triggerZone = document.getElementById("trigger-cleaning-focus");

//     const bubbles = [];
//     const triggers = [];

//     // Собираем пары: триггер и пузырь
//     for (let i = 1; i <= 6; i++) {
//         const trigger = document.querySelector(`.bubble__massage_triger-${i}`);
//         const bubble = document.querySelector(`.speech-bubble__card-0${i}`);
//         if (trigger && bubble) {
//             triggers.push(trigger);
//             bubbles.push({ trigger, bubble });
//             bubble.style.display = "none";
//             bubble.style.opacity = "0";
//         }
//     }

//     // Клик по иконке включает/выключает режим
//     document.querySelectorAll(".basic__card-icon").forEach(icon => {
//         icon.addEventListener("click", () => {
//             const parentCard = icon.closest(".basic__card-primary");

//             if (activeCard === parentCard) {
//                 // Если уже активна — выключаем
//                 hideAllBubbles();
//                 activeCard = null;
//             } else {
//                 // Включаем режим, делаем карточку активной
//                 activeCard = parentCard;
//                 updateBubbleDisplay();
//             }
//         });
//     });

//     // Наведение на другую карточку — перенос пузырей
//     document.querySelectorAll(".basic__card-primary").forEach(card => {
//         card.addEventListener("mouseenter", () => {
//             if (activeCard) {
//                 activeCard = card;
//                 updateBubbleDisplay();
//             }
//         });
//     });

//     // Обновить отображение пузырей для активной карточки
//     function updateBubbleDisplay() {
//         bubbles.forEach(({ trigger, bubble }) => {
//             if (activeCard && activeCard.contains(trigger)) {
//                 bubble.style.display = "block";
//                 bubble.style.opacity = "1";
//             } else {
//                 bubble.style.display = "none";
//                 bubble.style.opacity = "0";
//             }
//         });
//     }

//     // Скрыть все пузыри
//     function hideAllBubbles() {
//         bubbles.forEach(({ bubble }) => {
//             bubble.style.opacity = "0";
//             setTimeout(() => {
//                 bubble.style.display = "none";
//             }, 200);
//         });
//     }

//     // Уход из зоны отключает всё
//     if (triggerZone) {
//         triggerZone.addEventListener("mouseleave", () => {
//             hideAllBubbles();
//             activeCard = null;
//         });
//     }
// }

export function setupMessageBubbles() {
    let activeCard = null;
    const triggerZone = document.getElementById("trigger-cleaning-focus");

    const bubbles = [];
    const triggers = [];

    // Собираем пары: триггер и пузырь
    for (let i = 1; i <= 6; i++) {
        const trigger = document.querySelector(`.bubble__massage_triger-${i}`);
        const bubble = document.querySelector(`.speech-bubble__card-0${i}`);
        if (trigger && bubble) {
            triggers.push(trigger);
            bubbles.push({ trigger, bubble });
            bubble.style.display = "none";
            bubble.style.opacity = "0";
        }
    }

    // Клик по иконке включает/выключает режим
    document.querySelectorAll(".basic__card-icon").forEach(icon => {
        icon.addEventListener("click", () => {
            const parentCard = icon.closest(".basic__card-primary");

            if (activeCard === parentCard) {
                // Если уже активна — выключаем
                hideAllBubbles();
                activeCard = null;
            } else {
                // Включаем режим, делаем карточку активной
                activeCard = parentCard;
                updateBubbleDisplay();
            }
        });
    });

    // Наведение на другую карточку — перенос пузырей
    document.querySelectorAll(".basic__card-primary").forEach(card => {
        card.addEventListener("mouseenter", () => {
            if (activeCard) {
                activeCard = card;
                updateBubbleDisplay();
            }
        });
    });

    // Обновить отображение пузырей для активной карточки
    function updateBubbleDisplay() {
        bubbles.forEach(({ trigger, bubble }) => {
            if (activeCard && activeCard.contains(trigger)) {
                bubble.style.display = "block";
                bubble.style.opacity = "1";
            } else {
                bubble.style.display = "none";
                bubble.style.opacity = "0";
            }
        });
    }

    // Скрыть все пузыри
    function hideAllBubbles() {
        bubbles.forEach(({ bubble }) => {
            bubble.style.opacity = "0";
            setTimeout(() => {
                bubble.style.display = "none";
            }, 200);
        });
    }

    // Уход мыши из триггерной зоны
    if (triggerZone) {
        triggerZone.addEventListener("mouseleave", () => {
            hideAllBubbles();
            activeCard = null;
        });

        // Добавим IntersectionObserver — если триггер скрыт со страницы
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                hideAllBubbles();
                activeCard = null;
            }
        }, {
            threshold: 0.01,
        });

        observer.observe(triggerZone);
    }
}

