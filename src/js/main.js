// document.getElementById("toggle-btn").addEventListener("click", () => {
//     // Переключаем иконки
//     document.getElementById("icon-dots-horizontal").classList.toggle("active");
//     document.getElementById("icon-close").classList.toggle("active");
  
//     // Переключаем классы у navigation__wrapper
//     const firstElement = document.getElementById("1");
//     const secondElement = document.getElementById("2");
  
//     if (firstElement && secondElement) {
//       firstElement.classList.toggle("active");
//       secondElement.classList.toggle("active");
//     }
// });

document.getElementById("toggle-btn").addEventListener("click", () => {
    // Переключаем иконки
    document.getElementById("icon-dots-horizontal").classList.toggle("active");
    document.getElementById("icon-close").classList.toggle("active");

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
            }, 200); // Ждем 300ms перед скрытием
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