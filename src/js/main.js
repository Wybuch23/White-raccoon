// document.getElementById("toggle-btn-header-dekstop").addEventListener("click", () => {
//     // Переключаем иконки
//     document.getElementById("icon-dots-horizontal-header-dekstop").classList.toggle("active");
//     document.getElementById("icon-close-header-dekstop").classList.toggle("active");

//     // Переключаем классы у navigation__wrapper
//     const firstElement = document.getElementById("1");
//     const secondElement = document.getElementById("2");

//     if (firstElement && secondElement) {
//         if (firstElement.classList.contains("active")) {
//             firstElement.style.opacity = "0"; // Исчезает плавно

//             setTimeout(() => {
//                 firstElement.classList.remove("active"); // Убираем display: flex
//                 secondElement.classList.add("active"); // Показываем второй элемент
//                 setTimeout(() => {
//                     secondElement.style.opacity = "1"; // Плавное появление
//                 }, 10);
//             }, 200); // Ждем 200ms перед скрытием
//         } else {
//             secondElement.style.opacity = "0"; // Исчезает плавно

//             setTimeout(() => {
//                 secondElement.classList.remove("active");
//                 firstElement.classList.add("active");
//                 setTimeout(() => {
//                     firstElement.style.opacity = "1"; // Плавное появление
//                 }, 10);
//             }, 200);
//         }
//     }
// });

// 2 код с мобилкой

// document.getElementById("toggle-btn-header-dekstop").addEventListener("click", () => {
//     // Переключаем иконки
//     document.getElementById("icon-dots-horizontal-header-dekstop").classList.toggle("active");
//     document.getElementById("icon-close-header-dekstop").classList.toggle("active");

//     // Переключаем классы у navigation__wrapper
//     const firstElement = document.getElementById("1");
//     const secondElement = document.getElementById("2");

//     if (firstElement && secondElement) {
//         if (firstElement.classList.contains("active")) {
//             firstElement.style.opacity = "0"; // Исчезает плавно

//             setTimeout(() => {
//                 firstElement.classList.remove("active"); // Убираем display: flex
//                 secondElement.classList.add("active"); // Показываем второй элемент
//                 setTimeout(() => {
//                     secondElement.style.opacity = "1"; // Плавное появление
//                 }, 10);
//             }, 200); // Ждем 200ms перед скрытием
//         } else {
//             secondElement.style.opacity = "0"; // Исчезает плавно

//             setTimeout(() => {
//                 secondElement.classList.remove("active");
//                 firstElement.classList.add("active");
//                 setTimeout(() => {
//                     firstElement.style.opacity = "1"; // Плавное появление
//                 }, 10);
//             }, 200);
//         }
//     }
// });

// // Мобильная версия
// document.getElementById("toggle-btn-header-mobile").addEventListener("click", () => {
//     // Переключаем иконки
//     document.getElementById("icon-dots-vertical-header-mobile").classList.toggle("active");
//     document.getElementById("icon-close-header-mobile").classList.toggle("active");

//     // Переключаем навигацию
//     document.getElementById("navigation-switch-header-mobile").classList.toggle("active");
// });

document.getElementById("toggle-btn-header-dekstop").addEventListener("click", () => {
    // Переключаем иконки
    document.getElementById("icon-dots-horizontal-header-dekstop").classList.toggle("active");
    document.getElementById("icon-close-header-dekstop").classList.toggle("active");

    // Переключаем классы у navigation__wrapper
    const firstElement = document.getElementById("1");
    const secondElement = document.getElementById("2");

    if (firstElement && secondElement) {
        if (firstElement.classList.contains("active")) {
            firstElement.style.opacity = "0"; // Исчезает плавно

            setTimeout(() => {
                firstElement.classList.remove("active"); // Убираем display: flex
                secondElement.classList.add("active"); // Показываем второй элемент
                setTimeout(() => {
                    secondElement.style.opacity = "1"; // Плавное появление
                }, 10);
            }, 200); // Ждем 200ms перед скрытием
        } else {
            secondElement.style.opacity = "0"; // Исчезает плавно

            setTimeout(() => {
                secondElement.classList.remove("active");
                firstElement.classList.add("active");
                setTimeout(() => {
                    firstElement.style.opacity = "1"; // Плавное появление
                }, 10);
            }, 200);
        }
    }
});

// Мобильная версия с плавным появлением
document.getElementById("toggle-btn-header-mobile").addEventListener("click", () => {
    // Переключаем иконки
    document.getElementById("icon-dots-vertical-header-mobile").classList.toggle("active");
    document.getElementById("icon-close-header-mobile").classList.toggle("active");

    // Переключаем навигацию с плавной анимацией
    const nav = document.getElementById("navigation-switch-header-mobile");

    if (nav.classList.contains("active")) {
        nav.style.opacity = "0"; // Исчезает плавно
        setTimeout(() => {
            nav.classList.remove("active");
        }, 200); // Ждем перед скрытием
    } else {
        nav.classList.add("active");
        setTimeout(() => {
            nav.style.opacity = "1"; // Плавное появление
        }, 10);
    }
});