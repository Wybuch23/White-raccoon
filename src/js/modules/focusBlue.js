// // добавление класса focus-blue

// export function setupFocusBlue() {
//     const allCards = document.querySelectorAll(".basic__card-primary");
//     const header = document.querySelector(".header");
//     const targetElementsSelector = ".basic__card-secondary, .header, .basic__card-primary, .basic__card-img, .basic__card-title, .basic__sticky-title, .basic__top-title, body, .basic__card-icon, .basic__card-title, .basic__card-text, .card-tabs-img, .tabs-control__tub, .btn-primary, .card-tabs-img__text";

//     const getTargetElements = () => document.querySelectorAll(targetElementsSelector);

//     let hoverTimeout, leaveTimeout;

//     allCards.forEach(card => {
//         card.addEventListener("mouseenter", () => {
//             clearTimeout(leaveTimeout);

//             hoverTimeout = setTimeout(() => {
//                 getTargetElements().forEach(el => el.classList.add("focus-blue"));
//                 card.querySelectorAll(targetElementsSelector).forEach(el => el.classList.remove("focus-blue"));

//                 // Если хедер не скрыт изначально (не имеет только класса .header), скрываем его при наведении
//                 if (!header.classList.contains("hide") && !header.classList.contains("header")) {
//                     header.classList.add("hide");
//                 }
//             }, 200);
//         });

//         card.addEventListener("mouseleave", () => {
//             clearTimeout(hoverTimeout);

//             leaveTimeout = setTimeout(() => {
//                 if (![...allCards].some(card => card.matches(":hover"))) {
//                     getTargetElements().forEach(el => el.classList.remove("focus-blue"));

//                     // Если хедер был скрыт, показываем его, если он не имеет класса .header (если он скрыт при наведении)
//                     if (header.classList.contains("hide") && !header.classList.contains("header")) {
//                         header.classList.remove("hide");
//                     }
//                 }
//             }, 200);
//         });
//     });
// }

// export function setupFocusBlue() {
//     const allCards = document.querySelectorAll(".basic__card-primary");
//     const header = document.querySelector(".header");
//     const targetElementsSelector = ".basic__card-secondary, .header, .basic__card-primary, .basic__card-img, .basic__card-title, .basic__sticky-title, .basic__top-title, body, .basic__card-icon, .basic__card-title, .basic__card-text, .card-tabs-img, .tabs-control__tub, .btn-primary, .card-tabs-img__text";

//     const getTargetElements = () => document.querySelectorAll(targetElementsSelector);

//     let hoverTimeout, leaveTimeout;

//     allCards.forEach(card => {
//         card.addEventListener("mouseenter", () => {
//             clearTimeout(leaveTimeout);

//             hoverTimeout = setTimeout(() => {
//                 getTargetElements().forEach(el => el.classList.add("focus-blue"));
//                 card.querySelectorAll(targetElementsSelector).forEach(el => el.classList.remove("focus-blue"));

//                 if (!header.classList.contains("hide") && !header.classList.contains("header")) {
//                     header.classList.add("hide");
//                 }
//             }, 200);
//         });

//         card.addEventListener("mouseleave", () => {
//             clearTimeout(hoverTimeout);

//             leaveTimeout = setTimeout(() => {
//                 if (![...allCards].some(card => card.matches(":hover"))) {
//                     getTargetElements().forEach(el => el.classList.remove("focus-blue"));

//                     if (header.classList.contains("hide") && !header.classList.contains("header")) {
//                         header.classList.remove("hide");
//                     }
//                 }
//             }, 200);
//         });
//     });

//     // Убираем .focus-blue, если ни одна карточка не видна
//     const observer = new IntersectionObserver(entries => {
//         const anyVisible = entries.some(entry => entry.isIntersecting);

//         if (!anyVisible) {
//             getTargetElements().forEach(el => el.classList.remove("focus-blue"));
//             if (header.classList.contains("hide") && !header.classList.contains("header")) {
//                 header.classList.remove("hide");
//             }
//         }
//     }, {
//         threshold: 0.01
//     });

//     allCards.forEach(card => observer.observe(card));
// }

export function setupFocusBlue() {
    const focusBlueTrigger = document.querySelector(".focus-blue-trigger");
    const header = document.querySelector(".header");
    const targetElementsSelector = ".basic__card-secondary, .header, .basic__card-primary, .basic__card-img, .basic__card-title, .basic__sticky-title, .basic__top-title, body, .basic__card-icon, .basic__card-title, .basic__card-text, .card-tabs-img, .tabs-control__tub, .btn-primary, .card-tabs-img__text";

    const getTargetElements = () => document.querySelectorAll(targetElementsSelector);
    const allCards = document.querySelectorAll(".basic__card-primary");

    let hoverTimeout, leaveTimeout;

    allCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            clearTimeout(leaveTimeout);

            hoverTimeout = setTimeout(() => {
                getTargetElements().forEach(el => el.classList.add("focus-blue"));
                card.querySelectorAll(targetElementsSelector).forEach(el => el.classList.remove("focus-blue"));

                if (!header.classList.contains("hide") && !header.classList.contains("header")) {
                    header.classList.add("hide");
                }
            }, 200);
        });

        card.addEventListener("mouseleave", () => {
            clearTimeout(hoverTimeout);

            leaveTimeout = setTimeout(() => {
                if (![...allCards].some(card => card.matches(":hover"))) {
                    getTargetElements().forEach(el => el.classList.remove("focus-blue"));

                    if (header.classList.contains("hide") && !header.classList.contains("header")) {
                        header.classList.remove("hide");
                    }
                }
            }, 200);
        });
    });

    if (focusBlueTrigger) {
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                getTargetElements().forEach(el => el.classList.remove("focus-blue"));
                if (header.classList.contains("hide") && !header.classList.contains("header")) {
                    header.classList.remove("hide");
                }
            }
        }, {
            threshold: 0.01,
        });

        observer.observe(focusBlueTrigger);
    }
}
