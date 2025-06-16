// export function setupPopup() {
//     const orderButtons = document.querySelectorAll('.order-button');
//     const popup = document.getElementById('popup');
//     const popupClose = popup.querySelector('.popup__close-button');
//     const popupBlur = document.querySelector('.popup-blur');
//     const header = document.querySelector('.header');

//     const openPopup = () => {
//         popup.classList.add('active');
//         popupBlur.classList.add('active');
//         header?.classList.add('hide');
//         document.body.style.overflow = 'hidden';
//     };

//     const closePopup = () => {
//         popup.classList.remove('active');
//         popupBlur.classList.remove('active');
//         header?.classList.remove('hide');
//         document.body.style.overflow = '';
//     };
    

//     orderButtons.forEach(button => {
//         button.addEventListener('click', openPopup);
//     });

//     popupClose?.addEventListener('click', closePopup);
//     popupBlur?.addEventListener('click', closePopup);
// }

export function setupPopup() {
    const orderButtons = document.querySelectorAll('.order-button');
    const popup = document.getElementById('popup');
    const popupCalculator = document.getElementById('popup-calculator');
    const popupClose = popup.querySelector('.popup__close-button');
    const popupBlur = document.querySelector('.popup-blur');
    const header = document.querySelector('.header');
    const openCalculatorBtn = document.getElementById('open-calculator');
    const backFromCalculatorBtn = document.getElementById('btn-primary-back');

    const openPopup = () => {
        // Закрываем калькулятор, если открыт
        popupCalculator?.classList.remove('active');
        popup.classList.add('active');
        popupBlur.classList.add('active');
        header?.classList.add('hide');
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        popup.classList.remove('active');
        popupCalculator?.classList.remove('active');
        popupBlur.classList.remove('active');
        header?.classList.remove('hide');
        document.body.style.overflow = '';
    };

    const openCalculator = () => {
        popup.classList.remove('active');
        popupCalculator.classList.add('active');
        popupBlur.classList.add('active');
        header?.classList.add('hide');
        document.body.style.overflow = 'hidden';
    };

    const backFromCalculator = () => {
        popupCalculator.classList.remove('active');
        popup.classList.add('active');
        // popupBlur уже активен — оставляем
        header?.classList.add('hide');
        document.body.style.overflow = 'hidden';
    };

    orderButtons.forEach(button => {
        button.addEventListener('click', openPopup);
    });

    popupClose?.addEventListener('click', closePopup);
    popupBlur?.addEventListener('click', closePopup);
    openCalculatorBtn?.addEventListener('click', openCalculator);
    backFromCalculatorBtn?.addEventListener('click', backFromCalculator);
}






