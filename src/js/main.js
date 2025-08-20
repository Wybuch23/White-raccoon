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
import { setupBasicTitleHidden } from "./modules/basicTitleHidden.js";
import { setupSliderGallaryDesktop } from "./modules/sliderGalleryDesktop.js";
import { setupPopup } from "./modules/popup.js";
import { setupCalculatorPopup } from './modules/calculator/calculator.js';

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
  setupBasicTitleHidden();
  setupSliderGallaryDesktop();
  setupPopup();
  setupCalculatorPopup();
});

// появление и изчезание заголовка 

// window.addEventListener('scroll', function () {
//   const sections = document.querySelectorAll('.basic');

//   sections.forEach((section) => {
//     const sticky = section.querySelector('.basic__sticky-title_hidden');
//     const triggerTop = section.querySelector('.why-cleaning__trigger-top');

//     // Если вдруг чего-то нет — выходим из этой секции
//     if (!sticky || !triggerTop || triggerTop.offsetHeight === 0) return;

//     const stickyRect = sticky.getBoundingClientRect();
//     const triggerTopRect = triggerTop.getBoundingClientRect();

//     // Проверяем касание и добавляем/убираем класс
//     if (
//       stickyRect.bottom >= triggerTopRect.top &&
//       stickyRect.top <= triggerTopRect.bottom
//     ) {
//       sticky.classList.add('touched');
//     } else {
//       sticky.classList.remove('touched');
//     }
//   });
// });





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

// document.addEventListener("DOMContentLoaded", function () {
//     // Инициализация Swiper
//     const swiper = new Swiper('.slider-gellery', {
//       loop: true,
//       slidesPerView: "auto",
//       centeredSlides: true,
//       spaceBetween: 20,
//       navigation: {
//         nextEl: '.slider-gellery__swiper-button-next',
//         prevEl: '.slider-gellery__swiper-button-prev',
//       }
//     });
  
//     // Получаем все слайды в секции .our-works
//     const ourWorks = document.querySelector('.our-works');
//     const swiperSlides = ourWorks.querySelectorAll('.swiper-slide');
  
//     // Для каждого слайда создаем наблюдатель
//     swiperSlides.forEach(slide => {
//       const tabsGallery = slide.querySelectorAll('.tabs-control__tub');
//       const imagesGallery = slide.querySelectorAll('.slider-gellery__img');
      
//       // Флаг для отслеживания, был ли слайд уже активирован
//       let hasSwitched = false;
  
//       // Наблюдатель для отслеживания слайда, когда он попадает в зону экрана на 100%
//       const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting && !hasSwitched) {
//             // Если слайд полностью видим и еще не был переключен
//             setTimeout(() => {
//               tabsGallery.forEach(t => t.classList.remove('active'));
//               imagesGallery.forEach(img => img.classList.remove('active'));
  
//               tabsGallery[1].classList.add('active');  // Переключаем на таб "после"
//               imagesGallery[1].classList.add('active');  // Показываем картинку "после"
//               hasSwitched = true; // Устанавливаем флаг, что слайд был переключен
//             }, 400); // Задержка 0.4 секунды
//           }
//         });
//       }, { threshold: 1.0 }); // 100% видимости слайда
  
//       // Начинаем отслеживание каждого слайда
//       observer.observe(slide);
//     });
  
//     // Переключение табов и картинок по клику
//     swiperSlides.forEach(slide => {
//       const tabsGallery = slide.querySelectorAll('.tabs-control__tub');
//       const imagesGallery = slide.querySelectorAll('.slider-gellery__img');
  
//       tabsGallery.forEach((tab, index) => {
//         tab.addEventListener('click', () => {
//           tabsGallery.forEach(t => t.classList.remove('active'));
//           imagesGallery.forEach(img => img.classList.remove('active'));
//           tab.classList.add('active');
//           imagesGallery[index].classList.add('active');
//         });
//       });
//     });
//   });

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


document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion__item");

  accordionItems.forEach(item => {
      item.addEventListener("click", () => {
          // Удаляем класс active у всех элементов
          accordionItems.forEach(el => el.classList.remove("active"));
          // Добавляем active только к текущему
          item.classList.add("active");
      });
  });
});

// динамическая высота 

document.addEventListener("DOMContentLoaded", () => {
  const accordionElements = document.querySelectorAll(".accordion__item");

  function updateHeight() {
      accordionElements.forEach(element => {
          const wrappedBlock = element.querySelector(".accordion__item_wrapped");
          const textBlock = element.querySelector(".accordion__text");
          const gap = parseFloat(getComputedStyle(element).gap) || 0;

          requestAnimationFrame(() => {
              let wrappedHeight = wrappedBlock ? wrappedBlock.offsetHeight : 0;

              if (element.classList.contains("active") && textBlock) {
                  element.style.height = wrappedHeight + textBlock.offsetHeight + gap + "px";
              } else {
                  element.style.height = wrappedHeight + "px";
              }
          });
      });
  }

  window.addEventListener("load", updateHeight);
  window.addEventListener("resize", updateHeight);

  new MutationObserver(updateHeight).observe(document.body, { attributes: true, subtree: true, attributeFilter: ["class"] });
});


// добавляет темную тему для хедера при пересечении dark section

const header = document.querySelector('.header');
const darkSection = document.querySelector('.dark-sections_wrapped');

const logoWhite = document.querySelector('.navigation .navigation__logo.white');
const logoDark = document.querySelector('.navigation .navigation__logo.dark');

const logoWhiteMobile = document.querySelector('.navigation__mobile .navigation__logo.white');
const logoDarkMobile = document.querySelector('.navigation__mobile .navigation__logo.dark');

const navButtons = document.querySelectorAll('.navigation .btn-nav');

window.addEventListener('scroll', () => {
  const sectionTop = darkSection.getBoundingClientRect().top;

  const inDarkSection = sectionTop <= 0;

  // Добавляем или убираем тему для шапки
  if (inDarkSection) {
    header.classList.add('dark-theme');
  } else {
    header.classList.remove('dark-theme');
  }

  // Переключаем логотипы (десктоп)
  logoWhite?.classList.toggle('active', !inDarkSection);
  logoDark?.classList.toggle('active', inDarkSection);

  // Переключаем логотипы (мобильная навигация)
  logoWhiteMobile?.classList.toggle('active', !inDarkSection);
  logoDarkMobile?.classList.toggle('active', inDarkSection);

  // Кнопки навигации
  navButtons.forEach(btn => {
    btn.classList.toggle('btn-nav_dark', inDarkSection);
  });
});



// парралакс 

const parallax = document.querySelector('.dark-sections__parallax-bg');

window.addEventListener('scroll', () => {
  const rect = parallax.getBoundingClientRect();

  // Сколько пикселей от нижней части экрана до верхней части блока
  const progress = 1 - rect.top / window.innerHeight;

  // Ограничим от 0 до 1
  const clampedProgress = Math.max(0, Math.min(progress, 1));

  // Коэффициент скорости. Уменьшаем его, чтобы блок двигался медленнее
  const speedFactor = 0.5; // чем меньше значение, тем медленнее движение

  // Двигаем блок вверх на maxMove пикселей, умножаем на speedFactor для замедления
  const maxMove = 300; // Максимальный сдвиг
  const moveY = clampedProgress * maxMove * speedFactor;

  parallax.style.transform = `translateY(-${moveY}px)`;
});


// hero slider 

document.addEventListener('scroll', () => {
  const section = document.querySelector('.hero-desktop');
  const scrollContainer = document.querySelector('.hero__scroll');
  const sectionTop = section.offsetTop;
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const maxScroll = viewportHeight * 2; // только 2 экрана для анимации

  // Проверяем, находится ли прокрутка в пределах секции
  if (scrollY >= sectionTop && scrollY <= sectionTop + maxScroll) {
    const scrollDistance = scrollY - sectionTop;
    const progress = scrollDistance / maxScroll;

    // Устанавливаем движение слайдов
    scrollContainer.style.transform = `translateX(-${Math.min(progress * 200, 200)}vw)`; // Останавливаем на 200vw для последнего слайда
  }

  // Если прокручено больше, чем два экрана, фиксируем последний слайд
  if (scrollY > sectionTop + maxScroll) {
    scrollContainer.style.transform = `translateX(-200vw)`; // Последний слайд фиксируется на 200vw
  }
});

// logo slide 

document.addEventListener('scroll', () => {
  const wrapper = document.querySelector('.hero__wrapped-logo');
  const slide = document.querySelector('.hero__slide-logo');
  const logo = document.querySelector('.hero__logo-img');

  if (!wrapper || !slide || !logo) return;

  const wrapperRect = wrapper.getBoundingClientRect();
  const slideRect = slide.getBoundingClientRect();

  const start = wrapperRect.top;
  const end = wrapperRect.bottom - slideRect.height;

  // Прокрутка внутри видимой части контейнера
  const scrollProgress = Math.min(Math.max((0 - start) / (end - start), 0), 1);

  const maxTranslate = -270; // пикселей
  const translateX = scrollProgress * maxTranslate;

  logo.style.transform = `translateX(${translateX}px)`;
});



// // hero mobile logo slide 

// document.addEventListener('scroll', () => {
//   const trigger = document.querySelector('.hero-mobile_subsection__second-slide');
//   const logo = document.querySelector('.hero-mobile_slider-logo');

//   if (!trigger || !logo) return;

//   const triggerRect = trigger.getBoundingClientRect();
//   const viewportHeight = window.innerHeight;

//   const start = viewportHeight; // когда блок только касается нижней границы экрана
//   const end = 0;                // когда верх блока касается верха экрана

//   const progress = Math.min(Math.max((start - triggerRect.top) / (start - end), 0), 1);
//   const translateY = -180 * progress;

//   logo.style.transform = `translateY(${translateY}px)`;
// });

// // group images logo slide 

// document.addEventListener('scroll', () => {
//   const trigger = document.querySelector('.group-images');
//   const logo = document.querySelector('.group-images_mobile_slider-logo');

//   if (!trigger || !logo) return;

//   const triggerRect = trigger.getBoundingClientRect();
//   const viewportHeight = window.innerHeight;

//   const start = viewportHeight; // когда блок только касается нижней границы экрана
//   const end = 0;                // когда верх блока касается верха экрана

//   const progress = Math.min(Math.max((start - triggerRect.top) / (start - end), 0), 1);
//   const translateY = -180 * progress;

//   logo.style.transform = `translateY(${translateY}px)`;
// });


// анимация енотов в хиро и петс 



window.addEventListener('load', () => {
  setTimeout(() => {
    const raccoonLogo = document.querySelector('.hero-mobile_logo-raccoon');
    if (raccoonLogo) {
      raccoonLogo.classList.add('active');
    }
  }, 200);
});


document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.group-images_logo-raccoon-trigger');
  const logo = document.querySelector('.group-images_logo-raccoon');

  if (target && logo) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          logo.classList.add('active');
        }
      });
    }, {
      threshold: 0.1 // можно изменить чувствительность
    });

    observer.observe(target);
  }
});

// Анимация текста бегущая строка в радио кнопках


(function(){
  const SEL = '.radio .radio_wrapped .radio__text';
  const MQ  = '(max-width: 1185px)';
  const SPEED = 40;        // px/сек
  const PAUSE = 1000;      // мс: одинаковая пауза в начале и конце

  const mm = window.matchMedia(MQ);
  const states = new Map();   // el -> { el, max, x, pause, phase }
  let running = false;
  let last = 0;

  function measure(el){ return Math.max(0, el.scrollWidth - el.clientWidth); }

  function scan(){
    const mobile = mm.matches;
    const els = Array.from(document.querySelectorAll(SEL));
    const seen = new Set();

    if (!mobile) {
      // десктоп: очистить всё
      for (const st of states.values()) st.el.scrollLeft = 0;
      states.clear();
      stop();
      return;
    }

    for (const el of els) {
      if (el.scrollWidth <= el.clientWidth) {
        if (states.has(el)) { el.scrollLeft = 0; states.delete(el); }
        continue;
      }
      seen.add(el);
      const max = measure(el);
      const st = states.get(el);
      if (st) {
        st.max = max;                 // сохраняем x/pause/phase
      } else {
        states.set(el, { el, max, x: 0, pause: PAUSE, phase: 'start' });
      }
    }

    // убрать те, что исчезли
    for (const [el, st] of states) {
      if (!seen.has(el)) { st.el.scrollLeft = 0; states.delete(el); }
    }

    if (states.size && !running) start();
    if (!states.size && running) stop();
  }

  function start(){ running = true; last = performance.now(); requestAnimationFrame(tick); }
  function stop(){ running = false; }

  function tick(now){
    if (!running) return;
    const dt = now - last; last = now;
    const dx = (SPEED * dt) / 1000;

    for (const st of states.values()) {
      const newMax = measure(st.el);
      if (newMax !== st.max) {
        st.max = newMax;
        if (st.x > st.max) { st.x = 0; st.pause = PAUSE; st.phase = 'start'; }
      }

      if (st.pause > 0) {
        st.pause -= dt;
        st.el.scrollLeft = st.x;
        continue;
      }

      if (st.phase === 'start' || st.phase === 'scroll') {
        st.phase = 'scroll';
        st.x += dx;
        if (st.x >= st.max) {
          st.x = st.max;
          st.phase = 'end';
          st.pause = PAUSE;          // пауза в конце
        }
      } else if (st.phase === 'end') {
        st.x = 0;                    // сброс в начало
        st.phase = 'start';
        st.pause = PAUSE;            // пауза в начале
      }

      st.el.scrollLeft = st.x;
    }

    requestAnimationFrame(tick);
  }

  document.addEventListener('DOMContentLoaded', scan);
  window.addEventListener('resize', debounce(scan, 150));
  mm.addEventListener ? mm.addEventListener('change', scan) : mm.addListener(scan);

  // лёгкий периодический скан для динамически добавленных элементов
  setInterval(scan, 1000);

  function debounce(fn, ms){ let t; return (...a)=>{ clearTimeout(t); t = setTimeout(()=>fn(...a), ms); }; }
})();



