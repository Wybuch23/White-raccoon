// Получаем кнопку и блок
const button = document.getElementById('add-class-button');
const block = document.getElementById('target-block');

// Добавляем обработчик события "click" к кнопке
button.addEventListener('click', () => {
    // Добавляем класс к блоку
    block.classList.toggle('active');
  });