// import { fadeIn, fadeOut } from "./fade.js";

// export function setupMobileNavigation() {
//     const toggleBtn = document.getElementById("toggle-btn-header-mobile");
//     const iconDots = document.getElementById("icon-dots-vertical-header-mobile");
//     const iconClose = document.getElementById("icon-close-header-mobile");
//     const nav = document.getElementById("navigation-switch-header-mobile");
//     const body = document.body; // Получаем body

//     if (!toggleBtn || !iconDots || !iconClose || !nav) return;

//     toggleBtn.addEventListener("click", () => {
//         iconDots.classList.toggle("active");
//         iconClose.classList.toggle("active");

//         if (nav.classList.contains("active")) {
//             fadeOut(nav, () => {
//                 nav.classList.remove("active");
//                 body.style.overflow = ""; // Возвращаем прокрутку
//             });
//         } else {
//             nav.classList.add("active");
//             body.style.overflow = "hidden"; // Отключаем прокрутку
//             fadeIn(nav);
//         }
//     });
// }

// Раюотает

import { fadeIn, fadeOut } from "./fade.js";

export function setupMobileNavigation() {
    const toggleBtn = document.getElementById("toggle-btn-header-mobile");
    const iconDots = document.getElementById("icon-dots-vertical-header-mobile");
    const iconClose = document.getElementById("icon-close-header-mobile");
    const nav = document.getElementById("navigation-switch-header-mobile");
    const body = document.body;

    if (!toggleBtn || !iconDots || !iconClose || !nav) return;

    // Переключение меню
    toggleBtn.addEventListener("click", () => {
        iconDots.classList.toggle("active");
        iconClose.classList.toggle("active");

        if (nav.classList.contains("active")) {
            fadeOut(nav, () => {
                nav.classList.remove("active");
                body.style.overflow = "";
            });
        } else {
            nav.classList.add("active");
            body.style.overflow = "hidden";
            fadeIn(nav);
        }
    });

    // Закрытие меню при нажатии на .btn-nav
    const navLinks = nav.querySelectorAll(".btn-nav");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (nav.classList.contains("active")) {
                fadeOut(nav, () => {
                    nav.classList.remove("active");
                    body.style.overflow = "";
                    iconClose.classList.remove("active");
                    iconDots.classList.add("active");
                });
            }
        });
    });
}


// last work ver 


// import { fadeIn, fadeOut } from "./fade.js";
// import { temporarilyDisableScrollHeader } from "./scrollHeader.js";

// export function setupMobileNavigation() {
//     const toggleBtn = document.getElementById("toggle-btn-header-mobile");
//     const iconDots = document.getElementById("icon-dots-vertical-header-mobile");
//     const iconClose = document.getElementById("icon-close-header-mobile");
//     const nav = document.getElementById("navigation-switch-header-mobile");
//     const body = document.body;

//     if (!toggleBtn || !iconDots || !iconClose || !nav) return;

//     // Клик по кнопке открытия/закрытия меню
//     toggleBtn.addEventListener("click", () => {
//         iconDots.classList.toggle("active");
//         iconClose.classList.toggle("active");

//         if (nav.classList.contains("active")) {
//             fadeOut(nav, () => {
//                 nav.classList.remove("active");
//                 body.style.overflow = "";
//             });
//         } else {
//             nav.classList.add("active");
//             body.style.overflow = "hidden";
//             fadeIn(nav);
//         }
//     });

//     // Клики по пунктам мобильного меню
//     const navLinks = nav.querySelectorAll(".btn-nav");
//     navLinks.forEach((link) => {
//         link.addEventListener("click", () => {
//             if (nav.classList.contains("active")) {
//                 fadeOut(nav, () => {
//                     nav.classList.remove("active");
//                     body.style.overflow = "";
//                     iconClose.classList.remove("active");
//                     iconDots.classList.add("active");

//                     // Скрываем хедер и отключаем scroll-логику на 1.5 секунды
//                     const header = document.querySelector(".header");
//                     if (header && !header.classList.contains("hide")) {
//                         header.classList.add("hide");
//                         temporarilyDisableScrollHeader(1500);
//                     }
//                 });
//             }
//         });
//     });

//     // Клики по пунктам десктоп меню
//     const navPrimary = document.getElementById("nav-primary");
//     if (navPrimary) {
//         const desktopLinks = navPrimary.querySelectorAll(".btn-nav");
//         desktopLinks.forEach((link) => {
//             link.addEventListener("click", () => {
//                 const header = document.querySelector(".header");
//                 if (header && !header.classList.contains("hide")) {
//                     header.classList.add("hide");
//                     temporarilyDisableScrollHeader(1500);
//                 }
//             });
//         });
//     }
// }


// import { fadeIn, fadeOut } from "./fade.js";
// // import { temporarilyDisableScrollHeader } from "./scrollHeader.js";

// export function setupMobileNavigation() {
//     const toggleBtn = document.getElementById("toggle-btn-header-mobile");
//     const iconDots = document.getElementById("icon-dots-vertical-header-mobile");
//     const iconClose = document.getElementById("icon-close-header-mobile");
//     const nav = document.getElementById("navigation-switch-header-mobile");
//     const body = document.body;

//     if (!toggleBtn || !iconDots || !iconClose || !nav) return;

//     // Клик по кнопке открытия/закрытия меню
//     toggleBtn.addEventListener("click", () => {
//         iconDots.classList.toggle("active");
//         iconClose.classList.toggle("active");

//         if (nav.classList.contains("active")) {
//             fadeOut(nav, () => {
//                 nav.classList.remove("active");
//                 body.style.overflow = "";
//             });
//         } else {
//             nav.classList.add("active");
//             body.style.overflow = "hidden";
//             fadeIn(nav);
//         }
//     });

//     // Клики по пунктам мобильного меню
//     const navLinks = nav.querySelectorAll(".btn-nav");
//     navLinks.forEach((link) => {
//         link.addEventListener("click", () => {
//             if (nav.classList.contains("active")) {
//                 fadeOut(nav, () => {
//                     nav.classList.remove("active");
//                     body.style.overflow = "";
//                     iconClose.classList.remove("active");
//                     iconDots.classList.add("active");

//                     // const header = document.querySelector(".header");
//                     // if (header && !header.classList.contains("hide")) {
//                     //     header.classList.add("hide");
//                     //     temporarilyDisableScrollHeader(1500);
//                     // }
//                 });
//             }
//         });
//     });

//     // // ======= Десктопная часть =======
//     // const desktopNav = document.querySelector(".navigation");
//     // if (desktopNav) {
//     //     const desktopLinks = desktopNav.querySelectorAll(".btn-nav");
//     //     desktopLinks.forEach((link) => {
//     //         link.addEventListener("click", () => {
//     //             const header = document.querySelector(".header");
//     //             if (header && !header.classList.contains("hide")) {
//     //                 header.classList.add("hide");
//     //                 temporarilyDisableScrollHeader(1500);
//     //             }
//     //         });
//     //     });
//     // }
// }
