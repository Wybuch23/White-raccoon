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

  let formData = {
    values: {},   // тут хранятся выбранные значения по именам полей
    prices: {}    // тут храним цены по именам полей
  };  // сюда будем сохранять данные


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

      // Обновляем helperText поля area, если есть rate
      if (formData.values.cleaningType) {
        const cleaningStep = currentBranchSteps.find(step =>
          step.fields?.some(f => f.name === 'cleaningType')
        );

        const cleaningField = cleaningStep?.fields?.find(f => f.name === 'cleaningType');
        const selectedOption = cleaningField?.options?.find(opt => opt.value === formData.values.cleaningType);

        if (selectedOption?.rate) {
          const helper = bodyEl.querySelector('[data-helper-for="area"]');
          if (helper) {
            helper.textContent = `${selectedOption.rate} ₽/м²`;
          }
        }
      }
    }

    attachRadioListeners(stepData, bodyEl, formData);
    attachCheckboxListeners(stepData, bodyEl, formData); //обновление цены при нажатии на чекбокс

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

    formData.values = formData.values || {};
    formData.prices = formData.prices || {};

    stepData.fields.forEach(field => {
      if (field.type === 'radio' || field.type === 'radio-inline') {
        const selected = bodyEl.querySelector(`input[name="${field.name}"]:checked`);
        if (selected) {
          formData.values[field.name] = selected.value;
        }

      } else if (field.type === 'input') {
        const input = bodyEl.querySelector(`input[name="${field.name}"]`);
        if (input) {
          const value = parseFloat(input.value);
          formData.values[field.name] = value;

          const rate = formData.meta?.ratePerM2;
          if (!isNaN(value) && typeof rate === 'number') {
            formData.prices[field.name] = value * rate;
          }
        }

      } else if (field.type === 'checkbox') {
        const checkedBoxes = bodyEl.querySelectorAll(`input[name="${field.name}"]:checked`);
        const values = Array.from(checkedBoxes).map(cb => cb.value);
        formData.values[field.name] = values;

        // 💰 расчёт суммы по выбранным чекбоксам
        let total = 0;
        if (field.options) {
          values.forEach(val => {
            const option = field.options.find(opt => opt.value === val);
            if (option?.price) {
              total += option.price;
            }
          });
        }
        formData.prices[field.name] = total;
      }
    });

    // 💵 Обновляем сумму
    const total = calculateTotalPrice(formData.prices);
    const priceEl = document.querySelector('.popup__summary-price');
    if (priceEl) priceEl.textContent = total;
  }

  function attachRadioListeners(stepData, bodyEl, formData) {
    if (!stepData.fields) return;

    stepData.fields.forEach(field => {
      if (field.type === 'radio' || field.type === 'radio-inline') {
        const radios = bodyEl.querySelectorAll(`input[name="${field.name}"]`);

        radios.forEach(radio => {
          radio.addEventListener('change', () => {
            if (radio.checked) {
              formData.values[field.name] = radio.value;

              const option = field.options.find(opt => opt.value === radio.value);
              if (option) {
                if (typeof option.price === 'number') {
                  formData.prices[field.name] = option.price;
                }

                // Обновление ставки и helperText — для поля cleaningType
                if (field.name === 'cleaningType' && typeof option.rate === 'number') {
                  formData.meta = formData.meta || {};
                  formData.meta.ratePerM2 = option.rate;

                  const helper = bodyEl.querySelector('[data-helper-for="area"]');
                  if (helper) {
                    helper.textContent = `${option.rate} ₽/м²`;
                  }
                }

                // Поддержка логики расчёта для подушек — при выборе размера
                if (field.name === 'pillowSize') {
                  const multiplier = option.priceMultiplier || 1;
                  const countValue = formData.values.pillowCount;

                  const countOption = currentBranchSteps
                    .flatMap(step => step.fields || [])
                    .find(f => f.name === 'pillowCount')?.options
                    ?.find(opt => opt.value === countValue);

                  const basePrice = countOption?.price || 0;
                  const finalPrice = basePrice * multiplier;

                  formData.prices.pillowCount = finalPrice;
                }

                // Поддержка логики расчёта для подушек — при выборе количества
                if (field.name === 'pillowCount') {
                  const basePrice = option.price || 0;

                  const selectedSize = formData.values.pillowSize;
                  const pillowSizeStep = stepData.fields.find(f => f.name === 'pillowSize');
                  const sizeOption = pillowSizeStep?.options?.find(opt => opt.value === selectedSize);
                  const multiplier = sizeOption?.priceMultiplier || 1;

                  const finalPrice = basePrice * multiplier;
                  formData.prices.pillowCount = finalPrice;
                }
              }

              const total = calculateTotalPrice(formData.prices);
              const priceEl = document.querySelector('.popup__summary-price');
              if (priceEl) priceEl.textContent = total;
            }
          });

          // Инициализация выбранных radio
          if (radio.checked && !formData.values[field.name]) {
            formData.values[field.name] = radio.value;

            const option = field.options.find(opt => opt.value === radio.value);
            if (option) {
              if (typeof option.price === 'number') {
                formData.prices[field.name] = option.price;
              }

              if (field.name === 'cleaningType' && typeof option.rate === 'number') {
                formData.meta = formData.meta || {};
                formData.meta.ratePerM2 = option.rate;

                const helper = bodyEl.querySelector('[data-helper-for="area"]');
                if (helper) {
                  helper.textContent = `${option.rate} ₽/м²`;
                }
              }

              // Повтор логики для подушек при инициализации
              if (field.name === 'pillowSize') {
                const multiplier = option.priceMultiplier || 1;
                const countValue = formData.values.pillowCount;

                const countOption = stepData.fields
                  .find(f => f.name === 'pillowCount')?.options
                  ?.find(opt => opt.value === countValue);

                const basePrice = countOption?.price || 0;
                const finalPrice = basePrice * multiplier;

                formData.prices.pillowCount = finalPrice;
              }

              if (field.name === 'pillowCount') {
                const basePrice = option.price || 0;

                const selectedSize = formData.values.pillowSize;
                const pillowSizeStep = stepData.fields.find(f => f.name === 'pillowSize');
                const sizeOption = pillowSizeStep?.options?.find(opt => opt.value === selectedSize);
                const multiplier = sizeOption?.priceMultiplier || 1;

                const finalPrice = basePrice * multiplier;
                formData.prices.pillowCount = finalPrice;
              }
            }
          }
        });
      }
    });

    // Принудительно запустить change у выбранных radio-кнопок
    stepData.fields.forEach(field => {
      if (field.type === 'radio' || field.type === 'radio-inline') {
        const checkedRadio = bodyEl.querySelector(`input[name="${field.name}"]:checked`);
        if (checkedRadio) {
          checkedRadio.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
  }




  
  //обновление цены при нажатии на чекбокс
  function attachCheckboxListeners(stepData, bodyEl, formData) {
    if (!stepData.fields) return;

    stepData.fields.forEach(field => {
      if (field.type === 'checkbox') {
        const checkboxes = bodyEl.querySelectorAll(`input[name="${field.name}"]`);
        checkboxes.forEach(checkbox => {
          checkbox.addEventListener('change', () => {
            const checked = bodyEl.querySelectorAll(`input[name="${field.name}"]:checked`);
            const values = Array.from(checked).map(cb => cb.value);
            formData.values[field.name] = values;

            let total = 0;
            if (field.options) {
              values.forEach(val => {
                const option = field.options.find(opt => opt.value === val);
                if (option?.price) total += option.price;
              });
            }

            formData.prices[field.name] = total;

            const priceEl = document.querySelector('.popup__summary-price');
            const totalPrice = calculateTotalPrice(formData.prices);
            if (priceEl) priceEl.textContent = totalPrice;
          });
        });
      }
    });
  }


  // const price = getPriceForValue(field, radio.value);
  // if (typeof price === 'number' && !isNaN(price)) {
  //   formData.prices[field.name] = price;
  // }

  function getPriceForValue(field, value) {
    if (!field.options) return 0;

    const option = field.options.find(opt => opt.value === value);
    return option ? option.price : 0;
  }

  function calculateTotalPrice(pricesObj) {
    const total = Object.values(pricesObj)
      .filter(p => typeof p === 'number' && !isNaN(p))
      .reduce((sum, price) => sum + price, 0);
      
    return Math.round(total);
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
