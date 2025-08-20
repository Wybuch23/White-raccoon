export function setupPopup() {
    const orderButtons = document.querySelectorAll('.order-button');
    const popup = document.getElementById('popup');
    const popupCalculator = document.getElementById('popup-calculator');
    const popupClose = popup.querySelector('.popup__close-button');
    const popupCalculatorClose = popupCalculator.querySelector('.popup__close-button'); // добавили крестик калькулятора
    const popupBlur = document.querySelector('.popup-blur');
    const header = document.querySelector('.header');
    const openCalculatorBtn = document.getElementById('open-calculator');

    const lockScroll = () => {
        document.body.style.setProperty('--scroll-y', `-${window.scrollY}px`);
        document.body.classList.add('scroll-lock');
    };

    const unlockScroll = () => {
        const y = -parseInt(getComputedStyle(document.body).getPropertyValue('--scroll-y')) || 0;
        document.body.classList.remove('scroll-lock');
        document.body.style.removeProperty('--scroll-y');
        window.scrollTo(0, y);
    };

    const closeOverlay = () => {
        popup.classList.remove('active');
        popupCalculator.classList.remove('active');
        popupBlur.classList.remove('active');
        header?.classList.remove('hide');
        unlockScroll();
    };

    const openPopup = () => {
        popupCalculator?.classList.remove('active');
        popup.classList.add('active');
        popupBlur.classList.add('active');
        header?.classList.add('hide');
        lockScroll();
    };

    const openCalculator = () => {
        popup.classList.remove('active');
        popupCalculator.classList.add('active');
        popupBlur.classList.add('active');
        header?.classList.add('hide');
        lockScroll();
    };

    orderButtons.forEach(button => {
        button.addEventListener('click', openPopup);
    });

    popupClose?.addEventListener('click', closeOverlay);
    popupCalculatorClose?.addEventListener('click', closeOverlay);
    popupBlur?.addEventListener('click', closeOverlay);
    openCalculatorBtn?.addEventListener('click', openCalculator);
}
