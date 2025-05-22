// // добавление класса focus-blue


// export function setupFocusBlue() {
//     const focusBlueTrigger = document.querySelector(".focus-blue-trigger");
//     const header = document.querySelector(".header");
//     const targetElementsSelector = ".basic__card-secondary, .header, .basic__card-primary, .basic__card-img, .basic__card-title, .basic__sticky-title, .basic__top-title, body, .basic__card-title, .basic__card-text, .card-tabs-img, .tabs-control__tub, .btn-primary, .card-tabs-img__text";

//     const getTargetElements = () => document.querySelectorAll(targetElementsSelector);
//     const allCards = document.querySelectorAll(".basic__card-primary");

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

//     if (focusBlueTrigger) {
//         const observer = new IntersectionObserver(([entry]) => {
//             if (!entry.isIntersecting) {
//                 getTargetElements().forEach(el => el.classList.remove("focus-blue"));
//                 if (header.classList.contains("hide") && !header.classList.contains("header")) {
//                     header.classList.remove("hide");
//                 }
//             }
//         }, {
//             threshold: 0.01,
//         });

//         observer.observe(focusBlueTrigger);
//     }
// }


// export function setupFocusBlue() {
//     const header = document.querySelector(".header");
//     const targetElementsSelector = ".basic__card-secondary, .header, .basic__card-primary, .basic__card-img, .basic__card-title, .basic__sticky-title, .basic__top-title, body, .basic__card-title, .basic__card-text, .card-tabs-img, .tabs-control__tub, .btn-primary, .card-tabs-img__text";
//     const getTargetElements = () => document.querySelectorAll(targetElementsSelector);
//     const icons = document.querySelectorAll(".basic__card-icon");

//     icons.forEach(icon => {
//         icon.addEventListener("click", () => {
//             const isActive = document.body.classList.contains("focus-blue");

//             if (isActive) {
//                 getTargetElements().forEach(el => el.classList.remove("focus-blue"));
//                 header?.classList.remove("hide");
//             } else {
//                 getTargetElements().forEach(el => el.classList.add("focus-blue"));
//                 header?.classList.add("hide");
//             }
//         });
//     });
// }


// export function setupFocusBlue() {
//     const header = document.querySelector(".header");
//     const trigger = document.getElementById("trigger-cleaning-focus");
//     const icons = document.querySelectorAll(".basic__card-icon");
//     const targetElementsSelector = ".basic__card-secondary, .header, .basic__card-primary, .basic__card-img, .basic__card-title, .basic__sticky-title, .basic__top-title, body, .basic__card-title, .basic__card-text, .card-tabs-img, .tabs-control__tub, .btn-primary, .card-tabs-img__text";
//     const getTargetElements = () => document.querySelectorAll(targetElementsSelector);

//     let wasClicked = false;

//     icons.forEach(icon => {
//         icon.addEventListener("click", () => {
//             const isActive = document.body.classList.contains("focus-blue");

//             if (isActive) {
//                 getTargetElements().forEach(el => el.classList.remove("focus-blue"));
//                 header?.classList.remove("hide");
//                 wasClicked = false;
//             } else {
//                 getTargetElements().forEach(el => el.classList.add("focus-blue"));
//                 header?.classList.add("hide");
//                 wasClicked = true;
//             }
//         });
//     });

//     if (trigger) {
//         trigger.addEventListener("mouseleave", () => {
//             if (wasClicked) {
//                 getTargetElements().forEach(el => el.classList.remove("focus-blue"));
//                 header?.classList.remove("hide");
//                 wasClicked = false;
//             }
//         });
//     }
// }


export function setupFocusBlue() {
    const header = document.querySelector(".header");
    const trigger = document.getElementById("trigger-cleaning-focus");
    const icons = document.querySelectorAll(".basic__card-icon");
    const targetElementsSelector = ".basic__card-secondary, .header, .basic__card-primary, .basic__card-img, .basic__card-title, .basic__sticky-title, .basic__top-title, body, .basic__card-title, .basic__card-text, .card-tabs-img, .tabs-control__tub, .btn-primary, .card-tabs-img__text";
    const getTargetElements = () => document.querySelectorAll(targetElementsSelector);

    let wasClicked = false;

    const removeFocusClasses = () => {
        getTargetElements().forEach(el => el.classList.remove("focus-blue"));
        header?.classList.remove("hide");
        wasClicked = false;
    };

    icons.forEach(icon => {
        icon.addEventListener("click", () => {
            const isActive = document.body.classList.contains("focus-blue");

            if (isActive) {
                removeFocusClasses();
            } else {
                getTargetElements().forEach(el => el.classList.add("focus-blue"));
                header?.classList.add("hide");
                wasClicked = true;
            }
        });
    });

    // Убираем классы при выходе мыши из области
    if (trigger) {
        trigger.addEventListener("mouseleave", () => {
            if (wasClicked) {
                removeFocusClasses();
            }
        });

        // Наблюдаем за тем, ушёл ли trigger из зоны видимости
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting && wasClicked) {
                removeFocusClasses();
            }
        }, {
            threshold: 0.01,
        });

        observer.observe(trigger);
    }
}
