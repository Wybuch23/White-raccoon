import { commonSteps, finalSteps } from './calculator-steps.js';
import { cleaningSteps, cleaningStepsLiving, cleaningStepsOffice, cleaningStepsIndustrial } from './cleaning-steps.js';
import { windowCleaningSteps } from './window-cleaning-steps.js';
import { dryCleaningSteps, dryCleaningStepsSofa, dryCleaningStepsArmchair, dryCleaningStepsChair, dryCleaningStepsCarpet, dryCleaningStepsCurtains, dryCleaningStepsMattress, dryCleaningStepsPillow } from './dry-cleaning-steps.js';
import { renderRadioField, renderInputField, renderInlineRadioField, renderCheckboxField } from './calculator-renderers.js';

export function setupCalculatorPopup() {
  const container = document.querySelector('#popup-calculator');
  const titleEl = container.querySelector('#popup__title');
  const bodyEl = container.querySelector('#popup__body_content');
  const btnNext = container.querySelector('#btn-primary-next');
  const btnBack = container.querySelector('#btn-primary-back');
  const footerHelpTextEl = container.querySelector('#popup__footer_help-text');

  let currentStep = 0;
  let currentBranchSteps = [...commonSteps];
  currentBranchSteps.branchName = 'commonSteps';
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
        currentBranchSteps = [...commonSteps];
        currentBranchSteps.branchName = 'commonSteps';
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
    if (currentBranchSteps.branchName === 'commonSteps') {
      selectedBranch = getSelectedRadioValue('serviceType');

      if (selectedBranch === 'cleaning') {
        currentBranchSteps = [...cleaningSteps, ...finalSteps];
        currentBranchSteps.branchName = 'cleaning';
        currentStep = 0;
        renderStep();
        return;
      } else if (selectedBranch === 'windows') {
        currentBranchSteps = [...windowCleaningSteps, ...finalSteps];
        currentBranchSteps.branchName = 'windows';
        currentStep = 0;
        renderStep();
        return;
      } else if (selectedBranch === 'dry_cleaning') {
        currentBranchSteps = [...dryCleaningSteps, ...finalSteps];
        currentBranchSteps.branchName = 'dry_cleaning';
        currentStep = 0;
        renderStep();
        return;
      } else {
        alert('Ветка для выбранной услуги пока не реализована');
        return;
      }
    }

    // Ветка cleaning: выбор типа помещения
    if (currentBranchSteps.branchName === 'cleaning') {
      const areaType = getSelectedRadioValue('areaType');

      if (areaType === 'living') {
        currentBranchSteps = [...cleaningStepsLiving, ...finalSteps];
        currentBranchSteps.branchName = 'cleaningLiving';
      } else if (areaType === 'office') {
        currentBranchSteps = [...cleaningStepsOffice, ...finalSteps];
        currentBranchSteps.branchName = 'cleaningOffice';
      } else if (areaType === 'industrial') {
        currentBranchSteps = [...cleaningStepsIndustrial, ...finalSteps];
        currentBranchSteps.branchName = 'cleaningIndustrial';
      } else {
        alert('Выберите тип помещения');
        return;
      }

      currentStep = 0;
      renderStep();
      return;
    }

    // Ветка dry_cleaning: выбор объекта химчистки
    if (currentBranchSteps.branchName === 'dry_cleaning') {
      const cleanType = getSelectedRadioValue('variables');

      if (cleanType === 'sofa') {
        currentBranchSteps = [...dryCleaningStepsSofa, ...finalSteps];
        currentBranchSteps.branchName = 'dryCleaningSofa';
      } else if (cleanType === 'armchair') {
        currentBranchSteps = [...dryCleaningStepsArmchair, ...finalSteps];
        currentBranchSteps.branchName = 'dryCleaningArmchair';
      } else if (cleanType === 'chair') {
        currentBranchSteps = [...dryCleaningStepsChair, ...finalSteps];
        currentBranchSteps.branchName = 'dryCleaningChair';
      } else if (cleanType === 'carpet') {
        currentBranchSteps = [...dryCleaningStepsCarpet, ...finalSteps];
        currentBranchSteps.branchName = 'dryCleaningCarpet';
      } else if (cleanType === 'curtains') {
        currentBranchSteps = [...dryCleaningStepsCurtains, ...finalSteps];
        currentBranchSteps.branchName = 'dryCleaningCurtains';
      } else if (cleanType === 'mattress') {
        currentBranchSteps = [...dryCleaningStepsMattress, ...finalSteps];
        currentBranchSteps.branchName = 'dryCleaningMattress';
      } else if (cleanType === 'pillow') {
        currentBranchSteps = [...dryCleaningStepsPillow, ...finalSteps];
        currentBranchSteps.branchName = 'dryCleaningPillow';
      } else {
        alert('Выберите, что нужно почистить');
        return;
      }

      currentStep = 0;
      renderStep();
      return;
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
      return;
    }

    // Возврат из подветок уборки
    if (
      currentBranchSteps.branchName === 'cleaningLiving' ||
      currentBranchSteps.branchName === 'cleaningOffice' ||
      currentBranchSteps.branchName === 'cleaningIndustrial'
    ) {
      currentBranchSteps = [...cleaningSteps];
      currentBranchSteps.branchName = 'cleaning';
      currentStep = 0;
      renderStep();
      return;
    }

    // Возврат из подветок химчистки
    if (
      currentBranchSteps.branchName === 'dryCleaningSofa' ||
      currentBranchSteps.branchName === 'dryCleaningArmchair' ||
      currentBranchSteps.branchName === 'dryCleaningChair' ||
      currentBranchSteps.branchName === 'dryCleaningCarpet' ||
      currentBranchSteps.branchName === 'dryCleaningCurtains' ||
      currentBranchSteps.branchName === 'dryCleaningMattress' ||
      currentBranchSteps.branchName === 'dryCleaningPillow'
    ) {
      currentBranchSteps = [...dryCleaningSteps];
      currentBranchSteps.branchName = 'dry_cleaning';
      currentStep = 0;
      renderStep();
      return;
    }

    // Возврат из базовой ветки уборки
    if (currentBranchSteps.branchName === 'cleaning') {
      currentBranchSteps = [...commonSteps];
      currentBranchSteps.branchName = 'commonSteps';
      currentStep = 0;
      renderStep();
      return;
    }

    // Возврат из базовой ветки химчистки
    if (currentBranchSteps.branchName === 'dry_cleaning') {
      currentBranchSteps = [...commonSteps];
      currentBranchSteps.branchName = 'commonSteps';
      currentStep = 0;
      renderStep();
      return;
    }

    // Возврат из ветки мытья окон
    if (currentBranchSteps.branchName === 'windows') {
      currentBranchSteps = [...commonSteps];
      currentBranchSteps.branchName = 'commonSteps';
      currentStep = 0;
      renderStep();
      return;
    }

    // Если в commonSteps — закрываем калькулятор
    if (currentBranchSteps.branchName === 'commonSteps') {
      document.getElementById('popup-calculator')?.classList.remove('active');
      document.getElementById('popup')?.classList.add('active');
      return;
    }
  });

renderStep();

}