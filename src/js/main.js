import { fadeIn, fadeOut } from "./modules/fade.js";
import { setupHeaderToggle } from "./modules/headerToggle.js";
import { setupMobileNavigation } from "./modules/mobileNavigation.js";
import { setupCardHoverEffect } from "./modules/cardHover.js";
import { setupMessageBubbles } from "./modules/messageBubbles.js";
import { setupScrollHeader } from "./modules/scrollHeader.js";
import { setupFocusBlue } from "./modules/focusBlue.js";
import { setupSwiperMobile } from "./modules/swiperMobile.js";
import { setupCardTabs } from "./modules/cardTabs.js";
import { setupSwiperCleaners } from "./modules/swiperCleanersSetup.js";

document.addEventListener("DOMContentLoaded", () => {
    setupHeaderToggle();
    setupMobileNavigation();
    setupCardHoverEffect();
    setupMessageBubbles();
    setupScrollHeader();
    setupFocusBlue();
    setupSwiperMobile();
    setupCardTabs();
    setupSwiperCleaners();
});

// появление и изчезание заголовка 

// window.addEventListener('scroll', function () {
//     const stickies = document.querySelectorAll('.basic__sticky-title_hidden');
//     const triggerTop = document.querySelector('.why-cleaning__trigger-top');

//     // Проверка, существует ли триггер и он видимый
//     if (!triggerTop || triggerTop.offsetHeight === 0) return;

//     stickies.forEach(function (sticky) {
//         const stickyRect = sticky.getBoundingClientRect();
//         const triggerTopRect = triggerTop.getBoundingClientRect();

//         // Проверяем, касаются ли они
//         if (
//             stickyRect.bottom >= triggerTopRect.top &&
//             stickyRect.top <= triggerTopRect.bottom
//         ) {
//             sticky.classList.add('touched');
//         } else {
//             sticky.classList.remove('touched');
//         }
//     });
// });

window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('.basic');

  sections.forEach((section) => {
    const sticky = section.querySelector('.basic__sticky-title_hidden');
    const triggerTop = section.querySelector('.why-cleaning__trigger-top');

    // Если вдруг чего-то нет — выходим из этой секции
    if (!sticky || !triggerTop || triggerTop.offsetHeight === 0) return;

    const stickyRect = sticky.getBoundingClientRect();
    const triggerTopRect = triggerTop.getBoundingClientRect();

    // Проверяем касание и добавляем/убираем класс
    if (
      stickyRect.bottom >= triggerTopRect.top &&
      stickyRect.top <= triggerTopRect.bottom
    ) {
      sticky.classList.add('touched');
    } else {
      sticky.classList.remove('touched');
    }
  });
});





// card-tabs-list 


const tabs = document.querySelectorAll('.how-cleaning .tabs-control__tub');
const lists = document.querySelectorAll('.how-cleaning .card-tabs-list__list');
const texts = document.querySelectorAll('.how-cleaning .card-tabs-list__text');

// Добавляем обработчик события на каждый таб
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Убираем класс 'active' с всех табов и списков
        tabs.forEach(t => t.classList.remove('active'));
        
        // Скрываем текущий активный список с плавным эффектом
        const activeList = document.querySelector('.how-cleaning .card-tabs-list__list.active');
        if (activeList) {
            fadeOut(activeList, () => {
                // После того как текущий список скрыт, убираем класс 'active' и показываем новый
                activeList.classList.remove('active');

                // Показываем новый список с плавным эффектом
                lists[index].classList.add('active');
                fadeIn(lists[index]);
            });
        } else {
            // Если нет активного списка, сразу добавляем класс 'active' и показываем
            lists[index].classList.add('active');
            fadeIn(lists[index]);
        }

        // Скрываем текущий активный текст с плавным эффектом
        const activeText = document.querySelector('.how-cleaning .card-tabs-list__text.active');
        if (activeText) {
            fadeOut(activeText, () => {
                // После того как текущий текст скрыт, убираем класс 'active' и показываем новый
                activeText.classList.remove('active');

                // Показываем новый текст с плавным эффектом
                texts[index].classList.add('active');
                fadeIn(texts[index]);
            });
        } else {
            // Если нет активного текста, сразу добавляем класс 'active' и показываем
            texts[index].classList.add('active');
            fadeIn(texts[index]);
        }

        // Добавляем класс 'active' на текущий таб
        tab.classList.add('active');
    });
});


// слайдер галлерея

document.addEventListener("DOMContentLoaded", function () {
    // Инициализация Swiper
    const swiper = new Swiper('.slider-gellery', {
      loop: true,
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 20,
      navigation: {
        nextEl: '.slider-gellery__swiper-button-next',
        prevEl: '.slider-gellery__swiper-button-prev',
      }
    });
  
    // Получаем все слайды в секции .our-works
    const ourWorks = document.querySelector('.our-works');
    const swiperSlides = ourWorks.querySelectorAll('.swiper-slide');
  
    // Для каждого слайда создаем наблюдатель
    swiperSlides.forEach(slide => {
      const tabsGallery = slide.querySelectorAll('.tabs-control__tub');
      const imagesGallery = slide.querySelectorAll('.slider-gellery__img');
      
      // Флаг для отслеживания, был ли слайд уже активирован
      let hasSwitched = false;
  
      // Наблюдатель для отслеживания слайда, когда он попадает в зону экрана на 100%
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasSwitched) {
            // Если слайд полностью видим и еще не был переключен
            setTimeout(() => {
              tabsGallery.forEach(t => t.classList.remove('active'));
              imagesGallery.forEach(img => img.classList.remove('active'));
  
              tabsGallery[1].classList.add('active');  // Переключаем на таб "после"
              imagesGallery[1].classList.add('active');  // Показываем картинку "после"
              hasSwitched = true; // Устанавливаем флаг, что слайд был переключен
            }, 400); // Задержка 0.4 секунды
          }
        });
      }, { threshold: 1.0 }); // 100% видимости слайда
  
      // Начинаем отслеживание каждого слайда
      observer.observe(slide);
    });
  
    // Переключение табов и картинок по клику
    swiperSlides.forEach(slide => {
      const tabsGallery = slide.querySelectorAll('.tabs-control__tub');
      const imagesGallery = slide.querySelectorAll('.slider-gellery__img');
  
      tabsGallery.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          tabsGallery.forEach(t => t.classList.remove('active'));
          imagesGallery.forEach(img => img.classList.remove('active'));
          tab.classList.add('active');
          imagesGallery[index].classList.add('active');
        });
      });
    });
  });

// наши работы мобилка 

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".our-works .basic__card-secondary");

  cards.forEach((card) => {
      const images = card.querySelectorAll(".our-works .basic__card-secondary_img");
      const tabs = card.querySelectorAll(".our-works .tabs-control__tub");

      let currentImage = 0;

      card.addEventListener("click", () => {
          // Снимаем "active" с текущих элементов
          images[currentImage].classList.remove("active");
          tabs[currentImage].classList.remove("active");

          // Переключаемся на следующий индекс
          currentImage = (currentImage + 1) % images.length;

          // Добавляем "active" новой картинке и табу
          images[currentImage].classList.add("active");
          tabs[currentImage].classList.add("active");
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".our-works .basic__card-secondary");
  const loadMoreBtn = document.querySelector(".our-works .btn-mobile");
  let visibleCards = 3;

  // Скрываем все карточки, кроме первых трех
  cards.forEach((card, index) => {
    if (index >= visibleCards) card.style.display = "none";
  });

  loadMoreBtn.addEventListener("click", () => {
    const hiddenCards = Array.from(cards).slice(visibleCards, visibleCards + 3);

    hiddenCards.forEach((card) => {
      fadeIn(card);
    });

    visibleCards += 3;

    // Если карточки закончились — скрываем кнопку с анимацией
    if (visibleCards >= cards.length) {
      fadeOut(loadMoreBtn);
    }
  });
});


// Аккордион 


// document.addEventListener("DOMContentLoaded", () => {
//   const accordionItems = document.querySelectorAll(".accordion__item");

//   accordionItems.forEach(item => {
//       item.addEventListener("click", () => {
//           // Удаляем класс active у всех элементов
//           accordionItems.forEach(el => el.classList.remove("active"));
//           // Добавляем active только к текущему
//           item.classList.add("active");
//       });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion__item");

  accordionItems.forEach(item => {
    // Устанавливаем начальную высоту для активных элементов при загрузке
    if (item.classList.contains("active")) {
      item.style.maxHeight = item.scrollHeight + 60 + "px"; // Устанавливаем правильную высоту для активного элемента
    } else {
      item.style.maxHeight = "88px"; // Устанавливаем начальную высоту для неактивных элементов
    }

    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Если элемент уже активен, просто убираем класс и сбрасываем maxHeight
      if (isActive) {
        item.classList.remove("active");
        item.style.maxHeight = "88px"; // Сбрасываем max-height
      } else {
        // Закрываем все элементы
        accordionItems.forEach(el => {
          el.classList.remove("active");
          el.style.maxHeight = "88px"; // Сбрасываем max-height
        });

        // Добавляем класс active и устанавливаем максимальную высоту
        item.classList.add("active");

        // Устанавливаем максимальную высоту с запасом
        setTimeout(() => {
          item.style.maxHeight = item.scrollHeight + 60 + "px"; // +60px для запаса
        }, 10);
      }
    });
  });
});




