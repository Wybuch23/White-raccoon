export function setupPopup() {
    const orderButtons = document.querySelectorAll('.order-button');
    const popup = document.getElementById('popup');
    const popupCalculator = document.getElementById('popup-calculator');
    const popupClose = popup.querySelector('.popup__close-button');
    const popupCalculatorClose = popupCalculator.querySelector('.popup__close-button'); // добавили крестик калькулятора
    const popupBlur = document.querySelector('.popup-blur');
    const header = document.querySelector('.header');
    const openCalculatorBtn = document.getElementById('open-calculator');

    const closeOverlay = () => {
        popup.classList.remove('active');
        popupCalculator.classList.remove('active');
        popupBlur.classList.remove('active');
        header?.classList.remove('hide');
        document.body.style.overflow = '';
    };

    const openPopup = () => {
        popupCalculator?.classList.remove('active');
        popup.classList.add('active');
        popupBlur.classList.add('active');
        header?.classList.add('hide');
        document.body.style.overflow = 'hidden';
    };

    const openCalculator = () => {
        popup.classList.remove('active');
        popupCalculator.classList.add('active');
        popupBlur.classList.add('active');
        header?.classList.add('hide');
        document.body.style.overflow = 'hidden';
    };

    orderButtons.forEach(button => {
        button.addEventListener('click', openPopup);
    });

    popupClose?.addEventListener('click', closeOverlay);
    popupCalculatorClose?.addEventListener('click', closeOverlay);
    popupBlur?.addEventListener('click', closeOverlay);
    openCalculatorBtn?.addEventListener('click', openCalculator);
}
