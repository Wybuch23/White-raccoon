// import { commonSteps, finalSteps } from './calculator-steps.js';
// import {
//   cleaningSteps, cleaningStepsLiving, cleaningStepsOffice, cleaningStepsIndustrial
// } from './cleaning-steps.js';
// import { windowCleaningSteps } from './window-cleaning-steps.js';
// import {
//   dryCleaningSteps, dryCleaningStepsSofa, dryCleaningStepsArmchair, dryCleaningStepsChair,
//   dryCleaningStepsCarpet, dryCleaningStepsCurtains, dryCleaningStepsMattress, dryCleaningStepsPillow
// } from './dry-cleaning-steps.js';
// import {
//   renderRadioField, renderInputField, renderInlineRadioField, renderCheckboxField
// } from './calculator-renderers.js';

// export function setupCalculatorPopup() {
//   const container = document.querySelector('#popup-calculator');
//   const titleEl = container.querySelector('#popup__title');
//   const bodyEl = container.querySelector('#popup__body_content');
//   const btnNext = container.querySelector('#btn-primary-next');
//   const btnBack = container.querySelector('#btn-primary-back');
//   const footerHelpTextEl = container.querySelector('#popup__footer_help-text');

//   let currentStep = 0;
//   let currentBranchSteps = [...commonSteps];
//   currentBranchSteps.branchName = 'commonSteps';
//   let selectedBranch = null;

//   const branchMap = {
//     cleaning: { steps: cleaningSteps, sub: {
//       living: cleaningStepsLiving,
//       office: cleaningStepsOffice,
//       industrial: cleaningStepsIndustrial
//     }},
//     windows: { steps: windowCleaningSteps },
//     dry_cleaning: { steps: dryCleaningSteps, sub: {
//       sofa: dryCleaningStepsSofa,
//       armchair: dryCleaningStepsArmchair,
//       chair: dryCleaningStepsChair,
//       carpet: dryCleaningStepsCarpet,
//       curtains: dryCleaningStepsCurtains,
//       mattress: dryCleaningStepsMattress,
//       pillow: dryCleaningStepsPillow
//     }}
//   };

//   function renderStep() {
//     const stepData = currentBranchSteps[currentStep];
//     const stepEl = container.querySelector('#popup__step');

//     if (stepEl) stepEl.textContent = stepData.stepTitle || '';

//     titleEl.innerHTML = stepData.titleHtml || stepData.title;
//     bodyEl.innerHTML = stepData.bodyHtml || '';

//     if (stepData.fields) {
//       stepData.fields.forEach(field => {
//         const renderers = {
//           radio: renderRadioField,
//           'radio-inline': renderInlineRadioField,
//           input: renderInputField,
//           checkbox: renderCheckboxField
//         };
//         renderers[field.type]?.(field, bodyEl);
//       });
//     }

//     btnNext.textContent = stepData.nextButtonText || 'Далее';
//     footerHelpTextEl.innerHTML = stepData.footerHtml || '';
//     footerHelpTextEl.style.display = stepData.isFinal ? 'block' : 'none';
//     btnNext.style.display = btnBack.style.display = stepData.hideNavButtons ? 'none' : '';

//     const restartBtn = document.querySelector('#popup__new-calculation');
//     restartBtn?.addEventListener('click', () => {
//       currentBranchSteps = [...commonSteps];
//       currentBranchSteps.branchName = 'commonSteps';
//       currentStep = 0;
//       renderStep();
//     });

//     const thanksLogoEl = container.querySelector('#popup__thanks-logo');
//     if (thanksLogoEl) thanksLogoEl.style.display = stepData.isThankYou ? 'block' : 'none';
//   }

//   function getSelectedRadioValue(name) {
//     return [...bodyEl.querySelectorAll(`input[name="${name}"]`)]
//       .find(r => r.checked)?.value || null;
//   }

//   btnNext.addEventListener('click', () => {
//     if (currentBranchSteps.branchName === 'commonSteps') {
//       selectedBranch = getSelectedRadioValue('serviceType');
//       const branch = branchMap[selectedBranch];
//       if (branch) {
//         currentBranchSteps = [...branch.steps, ...finalSteps];
//         currentBranchSteps.branchName = selectedBranch;
//         currentStep = 0;
//         renderStep();
//       } else alert('Ветка для выбранной услуги пока не реализована');
//       return;
//     }

//     if (branchMap[currentBranchSteps.branchName]?.sub) {
//       const valueKey = currentBranchSteps.branchName === 'cleaning' ? 'areaType' : 'variables';
//       const selectedValue = getSelectedRadioValue(valueKey);
//       const subSteps = branchMap[currentBranchSteps.branchName].sub[selectedValue];

//       if (subSteps) {
//         currentBranchSteps = [...subSteps, ...finalSteps];
//         currentBranchSteps.branchName = `${currentBranchSteps.branchName}${selectedValue}`;
//         currentStep = 0;
//         renderStep();
//       } else {
//         alert('Выберите корректное значение');
//       }
//       return;
//     }

//     if (currentStep < currentBranchSteps.length - 1) {
//       currentStep++;
//       renderStep();
//     } else alert('Калькулятор завершён');
//   });

//   btnBack.addEventListener('click', () => {
//     if (currentStep > 0) {
//       currentStep--;
//       renderStep();
//       return;
//     }

//     for (const [branchKey, branch] of Object.entries(branchMap)) {
//       if (Object.values(branch.sub || {}).some(sub => sub.branchName === currentBranchSteps.branchName)) {
//         currentBranchSteps = [...branch.steps];
//         currentBranchSteps.branchName = branchKey;
//         currentStep = 0;
//         renderStep();
//         return;
//       }
//     }

//     if (currentBranchSteps.branchName !== 'commonSteps') {
//       currentBranchSteps = [...commonSteps];
//       currentBranchSteps.branchName = 'commonSteps';
//       currentStep = 0;
//       renderStep();
//       return;
//     }

//     document.getElementById('popup-calculator')?.classList.remove('active');
//     document.getElementById('popup')?.classList.add('active');
//   });

//   renderStep();
// }


import { commonSteps, finalSteps } from './calculator-steps.js';
import {
  cleaningSteps, cleaningStepsLiving, cleaningStepsOffice, cleaningStepsIndustrial
} from './cleaning-steps.js';
import { windowCleaningSteps } from './window-cleaning-steps.js';
import {
  dryCleaningSteps, dryCleaningStepsSofa, dryCleaningStepsArmchair, dryCleaningStepsChair,
  dryCleaningStepsCarpet, dryCleaningStepsCurtains, dryCleaningStepsMattress, dryCleaningStepsPillow
} from './dry-cleaning-steps.js';
import {
  renderRadioField, renderInputField, renderInlineRadioField, renderCheckboxField
} from './calculator-renderers.js';

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

  let formData = {};  // сюда будем сохранять данные


  const branchMap = {
    cleaning: { steps: cleaningSteps, sub: {
      living: cleaningStepsLiving,
      office: cleaningStepsOffice,
      industrial: cleaningStepsIndustrial
    }},
    windows: { steps: windowCleaningSteps },
    dry_cleaning: { steps: dryCleaningSteps, sub: {
      sofa: dryCleaningStepsSofa,
      armchair: dryCleaningStepsArmchair,
      chair: dryCleaningStepsChair,
      carpet: dryCleaningStepsCarpet,
      curtains: dryCleaningStepsCurtains,
      mattress: dryCleaningStepsMattress,
      pillow: dryCleaningStepsPillow
    }}
  };

  function renderStep() {
    const stepData = currentBranchSteps[currentStep];
    const stepEl = container.querySelector('#popup__step');

    if (stepEl) stepEl.textContent = stepData.stepTitle || '';

    titleEl.innerHTML = stepData.titleHtml || stepData.title;
    bodyEl.innerHTML = stepData.bodyHtml || '';

    if (stepData.fields) {
      stepData.fields.forEach(field => {
        const renderers = {
          radio: renderRadioField,
          'radio-inline': renderInlineRadioField,
          input: renderInputField,
          checkbox: renderCheckboxField
        };
        renderers[field.type]?.(field, bodyEl);
      });
    }

    btnNext.textContent = stepData.nextButtonText || 'Далее';
    footerHelpTextEl.innerHTML = stepData.footerHtml || '';
    footerHelpTextEl.style.display = stepData.isFinal ? 'block' : 'none';
    btnNext.style.display = btnBack.style.display = stepData.hideNavButtons ? 'none' : '';

    const restartBtn = document.querySelector('#popup__new-calculation');
    restartBtn?.addEventListener('click', () => {
      currentBranchSteps = [...commonSteps];
      currentBranchSteps.branchName = 'commonSteps';
      currentStep = 0;
      renderStep();
    });

    const thanksLogoEl = container.querySelector('#popup__thanks-logo');
    if (thanksLogoEl) thanksLogoEl.style.display = stepData.isThankYou ? 'block' : 'none';
  }

  function getSelectedRadioValue(name) {
    return [...bodyEl.querySelectorAll(`input[name="${name}"]`)]
      .find(r => r.checked)?.value || null;
  }

  function collectStepData(stepData, bodyEl, formData) {
    if (!stepData.fields) return;

    stepData.fields.forEach(field => {
      if (field.type === 'radio' || field.type === 'radio-inline') {
        // Собираем выбранное радио
        const selected = bodyEl.querySelector(`input[name="${field.name}"]:checked`);
        if (selected) formData[field.name] = selected.value;
      } else if (field.type === 'input') {
        // Собираем значение input
        const input = bodyEl.querySelector(`input[name="${field.name}"]`);
        if (input) formData[field.name] = input.value;
      } else if (field.type === 'checkbox') {
        // Собираем массив выбранных чекбоксов
        const checkedBoxes = bodyEl.querySelectorAll(`input[name="${field.name}"]:checked`);
        formData[field.name] = Array.from(checkedBoxes).map(cb => cb.value);
      }
    });
  }


  btnNext.addEventListener('click', () => {

    // Сохраняем все выбранные значения с текущего шага
    const stepData = currentBranchSteps[currentStep];

    collectStepData(currentBranchSteps[currentStep], bodyEl, formData);
    console.log('Текущие данные формы:', formData);



    if (currentBranchSteps.branchName === 'commonSteps') {
      selectedBranch = getSelectedRadioValue('serviceType');
      const branch = branchMap[selectedBranch];
      if (branch) {
        currentBranchSteps = [...branch.steps, ...finalSteps];
        currentBranchSteps.branchName = selectedBranch;
        currentStep = 0;
        renderStep();
      } else alert('Ветка для выбранной услуги пока не реализована');
      return;
    }

    if (branchMap[currentBranchSteps.branchName]?.sub) {
      const valueKey = currentBranchSteps.branchName === 'cleaning' ? 'areaType' : 'variables';
      const selectedValue = getSelectedRadioValue(valueKey);
      const subSteps = branchMap[currentBranchSteps.branchName].sub[selectedValue];

      if (subSteps) {
        currentBranchSteps = [...subSteps, ...finalSteps];
        currentBranchSteps.branchName = `${currentBranchSteps.branchName}${selectedValue}`;
        currentStep = 0;
        renderStep();
      } else {
        alert('Выберите корректное значение');
      }
      return;
    }

    if (currentStep < currentBranchSteps.length - 1) {
      currentStep++;
      renderStep();
    } else alert('Калькулятор завершён');
  });

  btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
      return;
    }

    for (const [branchKey, branch] of Object.entries(branchMap)) {
      if (Object.values(branch.sub || {}).some(sub => sub.branchName === currentBranchSteps.branchName)) {
        currentBranchSteps = [...branch.steps];
        currentBranchSteps.branchName = branchKey;
        currentStep = 0;
        renderStep();
        return;
      }
    }

    if (currentBranchSteps.branchName !== 'commonSteps') {
      currentBranchSteps = [...commonSteps];
      currentBranchSteps.branchName = 'commonSteps';
      currentStep = 0;
      renderStep();
      return;
    }

    document.getElementById('popup-calculator')?.classList.remove('active');
    document.getElementById('popup')?.classList.add('active');
  });

  renderStep();
}
