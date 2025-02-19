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


// Секция уборка

// Отвечает за добавление класа focus-blue и задержку перед появлением

document.addEventListener("DOMContentLoaded", () => {
    let hoverTimeout = null;
    let leaveTimeout = null;
    let lastHoveredCard = null;
    let isHoveringAnyCard = false;

    const allCards = document.querySelectorAll(".basic__card-primary");
    const targetElementsSelector = ".basic__card-primary, .basic__card-img, .basic__card-title, .basic__sticky-title, .basic__top-title, body, .basic__card-icon, .basic__card-title, .basic__card-text"; // Укажите нужные классы
    const getTargetElements = () => document.querySelectorAll(targetElementsSelector);

    allCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            clearTimeout(leaveTimeout); // Отменяем удаление классов
            isHoveringAnyCard = true;

            hoverTimeout = setTimeout(() => {
                getTargetElements().forEach(el => el.classList.add("focus-blue")); // Добавляем нужным элементам
                card.querySelectorAll(targetElementsSelector).forEach(el => el.classList.remove("focus-blue")); // Убираем у элементов внутри текущей карточки
                lastHoveredCard = card;
            }, 200);
        });

        card.addEventListener("mouseleave", () => {
            clearTimeout(hoverTimeout); // Отменяем, если курсор ушел раньше 200ms

            leaveTimeout = setTimeout(() => {
                if (lastHoveredCard === card) {
                    card.querySelectorAll(targetElementsSelector).forEach(el => el.classList.add("focus-blue")); // Вернем класс только если курсора нет
                }
                checkGlobalHover(); // Проверяем, не ушел ли курсор вообще
            }, 200);
        });
    });

    function checkGlobalHover() {
        setTimeout(() => {
            if (!isHoveringAnyCard) {
                getTargetElements().forEach(el => el.classList.remove("focus-blue")); // Убираем классы у всех целевых элементов
            }
        }, 200);
    }

    document.addEventListener("mousemove", (event) => {
        const isHovering = [...allCards].some(card => card.contains(event.target));
        isHoveringAnyCard = isHovering;
        if (!isHovering) {
            checkGlobalHover();
        }
    });
});

// Задержка анимации в card-primary 

document.addEventListener("DOMContentLoaded", () => {
    let hoverTimeout = null;
    let leaveTimeout = null;
    let lastHoveredCard = null;
    let isHoveringAnyCard = false; // Флаг, указывающий, есть ли курсор над карточками

    const allCards = document.querySelectorAll(".basic__card-primary");

    allCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            clearTimeout(leaveTimeout); // Отменяем таймер удаления классов
            isHoveringAnyCard = true; // Курсор на карточке

            if (lastHoveredCard) {
                lastHoveredCard.classList.remove("hover-active"); // Удаляем у предыдущей
                card.classList.add("hover-active"); // Добавляем новой сразу
                lastHoveredCard = card;
            } else {
                hoverTimeout = setTimeout(() => {
                    card.classList.add("hover-active");
                    lastHoveredCard = card;
                }, 200);
            }
        });

        card.addEventListener("mouseleave", () => {
            clearTimeout(hoverTimeout); // Отменяем добавление класса, если курсор ушел раньше 200 мс

            leaveTimeout = setTimeout(() => {
                if (!isHoveringAnyCard) {
                    allCards.forEach(el => el.classList.remove("hover-active")); // Удаляем классы у всех, если курсора нигде нет
                    lastHoveredCard = null;
                }
            }, 200);
        });
    });

    document.addEventListener("mousemove", (event) => {
        isHoveringAnyCard = [...allCards].some(card => card.contains(event.target));
        if (!isHoveringAnyCard) {
            clearTimeout(hoverTimeout);
            clearTimeout(leaveTimeout);
            leaveTimeout = setTimeout(() => {
                allCards.forEach(el => el.classList.remove("hover-active")); // Полностью удаляем класс, если курсора нет 200 мс
                lastHoveredCard = null;
            }, 200);
        }
    });
});

// появление блоков с сообщениями


// Для каждого триггера (1-6) добавляем обработчик событий
for (let i = 1; i <= 6; i++) {
    const trigger = document.querySelector(`.bubble__massage_triger-${i}`);
    const bubbleCard = document.querySelector(`.speech-bubble__card-0${i}`);
  
    let enterTimeout;
    let leaveTimeout;
  
    // Навешиваем событие на наведение
    trigger.addEventListener('mouseenter', () => {
      // Отменяем предыдущий таймер, если он был
      clearTimeout(leaveTimeout);
  
      // Запускаем таймер для задержки 200 мс перед показом
      enterTimeout = setTimeout(() => {
        // Делаем элемент видимым (сразу)
        bubbleCard.style.display = 'block';
  
        // Плавно меняем opacity
        bubbleCard.style.opacity = '1';
      }, 200); // Задержка перед появлением
    });
  
    // Навешиваем событие на увод мыши
    trigger.addEventListener('mouseleave', () => {
      // Отменяем таймер для появления, если курсор быстро уходит
      clearTimeout(enterTimeout);
  
      // Запускаем таймер для задержки 200 мс перед скрытием
      leaveTimeout = setTimeout(() => {
        bubbleCard.style.opacity = '0';
  
        // Прячем элемент через 0.2s (по времени анимации)
        setTimeout(() => {
          bubbleCard.style.display = 'none';
        }, 200); // Задержка перед скрытием
      }, 200); // Задержка перед исчезновением
    });
  }


