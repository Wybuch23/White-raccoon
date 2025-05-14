export function setupBasicTitleHidden() {
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
}