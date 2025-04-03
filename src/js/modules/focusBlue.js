// // добавление класса focus-blue
// export function setupFocusBlue() {
//     const allCards = document.querySelectorAll(".basic__card-primary");
//     const header = document.querySelector(".header");
//     const targetElementsSelector = ".header, .basic__card-primary, .basic__card-img, .basic__card-title, .basic__sticky-title, .basic__top-title, body, .basic__card-icon, .basic__card-title, .basic__card-text, .card-tabs-img, .tabs-control__tub, .btn-primary, .card-tabs-img__text";

//     const getTargetElements = () => document.querySelectorAll(targetElementsSelector);

//     let hoverTimeout, leaveTimeout;

//     allCards.forEach(card => {
//         card.addEventListener("mouseenter", () => {
//             clearTimeout(leaveTimeout);

//             hoverTimeout = setTimeout(() => {
//                 getTargetElements().forEach(el => el.classList.add("focus-blue"));
//                 card.querySelectorAll(targetElementsSelector).forEach(el => el.classList.remove("focus-blue"));

//                 // Скрываем хедер, если он ещё не скрыт
//                 if (!header.classList.contains("hide")) {
//                     header.classList.add("hide");
//                 }
//             }, 200);
//         });

//         card.addEventListener("mouseleave", () => {
//             clearTimeout(hoverTimeout);

//             leaveTimeout = setTimeout(() => {
//                 if (![...allCards].some(card => card.matches(":hover"))) {
//                     getTargetElements().forEach(el => el.classList.remove("focus-blue"));
//                 }
//             }, 200);
//         });
//     });
// }

export function setupFocusBlue() {
    const allCards = document.querySelectorAll(".basic__card-primary");
    const header = document.querySelector(".header");
    const targetElementsSelector = ".header, .basic__card-primary, .basic__card-img, .basic__card-title, .basic__sticky-title, .basic__top-title, body, .basic__card-icon, .basic__card-title, .basic__card-text, .card-tabs-img, .tabs-control__tub, .btn-primary, .card-tabs-img__text";

    const getTargetElements = () => document.querySelectorAll(targetElementsSelector);

    let hoverTimeout, leaveTimeout;

    allCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            clearTimeout(leaveTimeout);

            hoverTimeout = setTimeout(() => {
                getTargetElements().forEach(el => el.classList.add("focus-blue"));
                card.querySelectorAll(targetElementsSelector).forEach(el => el.classList.remove("focus-blue"));

                // Если хедер не скрыт изначально (не имеет только класса .header), скрываем его при наведении
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

                    // Если хедер был скрыт, показываем его, если он не имеет класса .header (если он скрыт при наведении)
                    if (header.classList.contains("hide") && !header.classList.contains("header")) {
                        header.classList.remove("hide");
                    }
                }
            }, 200);
        });
    });
}

