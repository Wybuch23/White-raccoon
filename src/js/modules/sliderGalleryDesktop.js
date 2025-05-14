export function setupSliderGallaryDesktop() {
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
}