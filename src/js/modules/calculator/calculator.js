import { commonSteps, finalSteps } from './calculator-steps.js';
import { cleaningSteps } from './cleaning-steps.js';
import { windowCleaningSteps } from './window-cleaning-steps.js';
import { dryCleaningSteps } from './dry-cleaning-steps.js';
import { renderRadioField, renderInputField, renderInlineRadioField, renderCheckboxField } from './calculator-renderers.js';

export function setupCalculatorPopup() {
  const container = document.querySelector('#popup-calculator');
  const titleEl = container.querySelector('#popup__title');
  const bodyEl = container.querySelector('#popup__body_content');
  const btnNext = container.querySelector('#btn-primary-next');
  const btnBack = container.querySelector('#btn-primary-back');
  const footerHelpTextEl = container.querySelector('#popup__footer_help-text');

  let currentStep = 0;
  let currentBranchSteps = commonSteps;
  let selectedBranch = null;

  function renderStep() {
    const stepData = currentBranchSteps[currentStep];
    const stepEl = container.querySelector('#popup__step');
    if (stepEl && stepData.stepTitle) stepEl.textContent = stepData.stepTitle;
    else if (stepEl) stepEl.textContent = '';

    titleEl.innerHTML = stepData.title;
    bodyEl.innerHTML = '';

    if (stepData.fields) {
      stepData.fields.forEach(field => {
        if (field.type === 'radio') renderRadioField(field, bodyEl);
        if (field.type === 'radio-inline') renderInlineRadioField(field, bodyEl);
        if (field.type === 'input') renderInputField(field, bodyEl);
        if (field.type === 'checkbox') renderCheckboxField(field, bodyEl);
      });
    }

    if (stepData.titleHtml) {
      titleEl.innerHTML = stepData.titleHtml;
    } else {
      titleEl.innerHTML = stepData.title;
    }

    if (stepData.bodyHtml) {
      bodyEl.innerHTML = stepData.bodyHtml;
    }

    // Меняем текст кнопки, если нужно
    if (stepData.nextButtonText) {
      btnNext.textContent = stepData.nextButtonText;
    } else {
      btnNext.textContent = 'Далее';
    }

    // Футер
    if (footerHelpTextEl) {
      footerHelpTextEl.innerHTML = stepData.footerHtml || '';

      // Управляем display для finalSteps
      if (stepData.isFinal) {
        footerHelpTextEl.style.display = 'block';
      } else {
        footerHelpTextEl.style.display = 'none';
      }
    }

    // Если это финальный спасибо-шаг, можно скрыть кнопки
    if (stepData.hideNavButtons) {
      btnNext.style.display = 'none';
      btnBack.style.display = 'none';
    } else {
      btnNext.style.display = '';
      btnBack.style.display = '';
    }

    // Обработчик кнопки нового расчета
    const restartBtn = document.querySelector('#popup__new-calculation');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        currentBranchSteps = commonSteps;
        currentStep = 0;
        renderStep();
      });
    }

    // Показ/скрытие логотипа спасибо
    const thanksLogoEl = container.querySelector('#popup__thanks-logo');
    if (thanksLogoEl) {
      if (stepData.isThankYou) {
        thanksLogoEl.style.display = 'block';
      } else {
        thanksLogoEl.style.display = 'none';
      }
    }
  }


  function getSelectedRadioValue(name) {
    const radios = bodyEl.querySelectorAll(`input[name="${name}"]`);
    for (const radio of radios) {
      if (radio.checked) return radio.value;
    }
    return null;
  }

  btnNext.addEventListener('click', () => {
    if (currentBranchSteps === commonSteps) {
      selectedBranch = getSelectedRadioValue('serviceType');

      if (selectedBranch === 'cleaning') {
        currentBranchSteps = [...cleaningSteps, ...finalSteps];
        currentStep = 0;
        renderStep();
        return;
      } else if (selectedBranch === 'windows') {
        currentBranchSteps = [...windowCleaningSteps, ...finalSteps];
        currentStep = 0;
        renderStep();
        return;
      } else if (selectedBranch === 'dry_cleaning') {
        currentBranchSteps = [...dryCleaningSteps, ...finalSteps];
        currentStep = 0;
        renderStep();
        return;
      } else {
        alert('Ветка для выбранной услуги пока не реализована');
        return;
      }
    }

    if (currentStep < currentBranchSteps.length - 1) {
      currentStep++;
      renderStep();
    } else {
      alert('Калькулятор завершён');
    }
  });

  btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    } else if (currentBranchSteps === commonSteps) {
      // Возвращаемся в попап
      document.getElementById('popup-calculator')?.classList.remove('active');
      document.getElementById('popup')?.classList.add('active');
      // Если используешь затемнение и скрытие хедера, оно уже активно — не нужно ничего менять
    } else {
      // Если это не commonSteps, возвращаемся к выбору услуги
      currentBranchSteps = commonSteps;
      currentStep = 0;
      renderStep();
    }
  });

  renderStep();
}