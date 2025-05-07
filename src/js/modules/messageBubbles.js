/* Всплывающие сообщения */
// export function setupMessageBubbles() {
//     for (let i = 1; i <= 6; i++) {
//         const trigger = document.querySelector(`.bubble__massage_triger-${i}`);
//         const bubbleCard = document.querySelector(`.speech-bubble__card-0${i}`);

//         if (!trigger || !bubbleCard) continue;

//         let enterTimeout, leaveTimeout;

//         trigger.addEventListener("mouseenter", () => {
//             clearTimeout(leaveTimeout);
//             enterTimeout = setTimeout(() => {
//                 bubbleCard.style.display = "block";
//                 bubbleCard.style.opacity = "1";
//             }, 200);
//         });

//         trigger.addEventListener("mouseleave", () => {
//             clearTimeout(enterTimeout);
//             leaveTimeout = setTimeout(() => {
//                 bubbleCard.style.opacity = "0";
//                 setTimeout(() => bubbleCard.style.display = "none", 200);
//             }, 200);
//         });
//     }
// }


export function setupMessageBubbles() {
    for (let i = 1; i <= 6; i++) {
        const trigger = document.querySelector(`.bubble__massage_triger-${i}`);
        const bubbleCard = document.querySelector(`.speech-bubble__card-0${i}`);

        if (!trigger || !bubbleCard) continue;

        let enterTimeout, leaveTimeout;

        trigger.addEventListener("mouseenter", () => {
            clearTimeout(leaveTimeout);
            enterTimeout = setTimeout(() => {
                bubbleCard.style.display = "block";
                bubbleCard.style.opacity = "1";
            }, 200);
        });

        trigger.addEventListener("mouseleave", () => {
            clearTimeout(enterTimeout);
            leaveTimeout = setTimeout(() => {
                bubbleCard.style.opacity = "0";
                setTimeout(() => {
                    bubbleCard.style.display = "none";
                }, 200);
            }, 200);
        });

        // Наблюдатель скрывает карточку, если триггер уходит с экрана
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                clearTimeout(enterTimeout);
                clearTimeout(leaveTimeout);
                bubbleCard.style.opacity = "0";
                bubbleCard.style.display = "none"; // мгновенно скрываем
            }
        }, {
            threshold: 0.01
        });

        observer.observe(trigger);
    }
}
