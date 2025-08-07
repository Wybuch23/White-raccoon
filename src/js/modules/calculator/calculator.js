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
  let stepHistory = []; // храним историю шагов

  let formData = {
    values: {},   // тут хранятся выбранные значения по именам полей
    prices: {}    // тут храним цены по именам полей
  };  // сюда будем сохранять данные

  let allSteps = [...commonSteps]; // будет обновляться при переходах


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

    // 🔁 Восстановление выбранных radio на основе formData
    stepData.fields.forEach(field => {
      if ((field.type === 'radio' || field.type === 'radio-inline') && formData.values?.[field.name]) {
        const savedValue = formData.values[field.name];
        const inputEl = bodyEl.querySelector(`input[name="${field.name}"][value="${savedValue}"]`);
        if (inputEl) inputEl.checked = true;
      }
    });

    // 🔁 Восстановление значений input-полей
    stepData.fields.forEach(field => {
      if (field.type === 'input' && formData.values?.[field.name] !== undefined) {
        const inputEl = bodyEl.querySelector(`input[name="${field.name}"]`);
        if (inputEl) {
          inputEl.value = formData.values[field.name];
        }
      }
    });

    // 🔁 Восстановление чекбоксов
    stepData.fields.forEach(field => {
      if (field.type === 'checkbox') {
        const savedValues = formData.values?.[field.name] || [];

        const checkboxes = bodyEl.querySelectorAll(`input[name="${field.name}"]`);
        checkboxes.forEach(checkbox => {
          checkbox.checked = savedValues.includes(checkbox.value);
        });
      }
    });

    attachRadioListeners(stepData, bodyEl, formData);
    attachCheckboxListeners(stepData, bodyEl, formData); //обновление цены при нажатии на чекбокс

    // Если выбрана мойка окон — восстановим ставку из serviceType
    if (formData.values.serviceType === 'windows') {
      const serviceOption = commonSteps[0].fields[0].options
        .find(opt => opt.value === 'windows' && typeof opt.rate === 'number');
      if (serviceOption) {
        formData.meta = formData.meta || {};
        formData.meta.ratePerM2 = serviceOption.rate;
      }
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

    updatePathSummary(formData);

    const thanksLogoEl = container.querySelector('#popup__thanks-logo');
    if (thanksLogoEl) thanksLogoEl.style.display = stepData.isThankYou ? 'block' : 'none';
  }

  function calculateTotalDuration(formData) {
    const service = formData.values.serviceType;
    let total = 0;

    if (service === 'cleaning') {
      const type = formData.values.cleaningType;
      const area = Number(formData.values.area) || 0;
      const bathrooms = Number(formData.values.bathroomCount) || 0;

      const bathroomMap = {
        daily: 30,
        general: 60,
        after_repair: 70,
        daily2: 30,
        general2: 40
      };

      const areaMap = {
        daily: 4.5,
        general: 9,
        after_repair: 11,
        daily2: 3,
        general2: 8
      };

      const bathroomTime = bathroomMap[type] ? bathrooms * bathroomMap[type] : 0;

      let areaTime = area * (areaMap[type] || 0);
      if (area > 200) areaTime /= 4;
      else if (area > 120) areaTime /= 3;
      else if (area > 40) areaTime /= 2;

      total = bathroomTime + areaTime;
    }

    if (service === 'windows') {
      const area = Number(formData.values.area) || 0;
      const urgency = formData.values.urgency;

      const windowDurations = {
        light: 5,
        hard: 7.5
      };

      const perM2 = windowDurations[urgency] || 0;
      total = area * perM2;
    }

    if (service === 'dry_cleaning') {
      const selectedSub = formData.values.variables;

      // === Ковры ===
      if (selectedSub === 'carpet') {
        const area = Number(formData.values.area) || 0;
        const size = formData.values.carpetSize;

        const rateMap = {
          low: 15,
          medium: 20,
          tall: 30
        };
        const perM2 = rateMap[size] || 0;

        total += area * perM2;
      }

      // === Шторы и тюль ===
      if (selectedSub === 'curtains') {
        const area = Number(formData.values.area) || 0;
        total += area * 20;
      }
    }

    // Добавляем доп.услуги
    // let extra = 0;
    // if (formData.durations) {
    //   extra = Object.values(formData.durations).reduce((sum, val) => sum + val, 0);
    // }

    let extra = 0;
    if (formData.durations) {
      console.log('⏱ durations:', formData.durations); // временно
      extra = Object.values(formData.durations).reduce((sum, val) => sum + val, 0);
    }

    total += extra;

    const el = document.querySelector('.popup__summary-time');
    if (el) {
      el.textContent = formatDuration(Math.round(total));
    }
  }

  function formatDuration(duration) {
    if (duration < 60) {
      return `${duration} мин`;
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (minutes === 0) {
      return `${hours} ${getHourWord(hours)}`;
    } else {
      return `${hours} ${getHourWord(hours)} ${minutes} мин`;
    }
  }

  function getHourWord(h) {
    if (h % 10 === 1 && h % 100 !== 11) return 'час';
    if ([2, 3, 4].includes(h % 10) && ![12, 13, 14].includes(h % 100)) return 'часа';
    return 'часов';
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
            if (field.options) {
              const option = field.options.find(opt => opt.value === selected.value);
              if (option?.duration) {
                if (!formData.durations) formData.durations = {};

                // ❌ Исключение: если это pillowCount — duration будет пересчитан на шаге pillowSize
                if (field.name !== 'pillowCount') {
                  formData.durations[field.name] = option.duration;
                }
              }
            }
        }
      }

      else if (field.type === 'input') {
        const input = bodyEl.querySelector(`input[name="${field.name}"]`);
        if (input) {
          const value = parseFloat(input.value);
          formData.values[field.name] = value;

          let rate = formData.meta?.ratePerM2;
          let multiplier = 1;

          // Для ковров
          const selectedCarpetSize = formData.values.carpetSize;
          if (selectedCarpetSize) {
            const carpetField = currentBranchSteps.flatMap(s => s.fields || []).find(f => f.name === 'carpetSize');
            const carpetOption = carpetField?.options?.find(opt => opt.value === selectedCarpetSize);
            if (carpetOption?.priceMultiplier) {
              multiplier = carpetOption.priceMultiplier;
            }
          }

          // Для мойки окон
          const selectedUrgency = formData.values.urgency;
          if (selectedUrgency) {
            const urgencyField = currentBranchSteps.flatMap(s => s.fields || []).find(f => f.name === 'urgency');
            const urgencyOption = urgencyField?.options?.find(opt => opt.value === selectedUrgency);
            if (urgencyOption) {
              if (typeof urgencyOption.rate === 'number') rate = urgencyOption.rate;
              if (typeof urgencyOption.priceMultiplier === 'number') multiplier = urgencyOption.priceMultiplier;
            }
          }

          if (!isNaN(value) && typeof rate === 'number') {
            formData.prices[field.name] = Math.round(value * rate * multiplier);
          }
        }
      }

      else if (field.type === 'checkbox') {
        const checkedBoxes = bodyEl.querySelectorAll(`input[name="${field.name}"]:checked`);
        const values = Array.from(checkedBoxes).map(cb => cb.value);
        formData.values[field.name] = values;

        let total = 0;
        if (field.options) {
          values.forEach(val => {
            const option = field.options.find(opt => opt.value === val);
            if (option?.price) total += option.price;
          });
        }

        formData.prices[field.name] = total;
      }
    });

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

                if (field.name !== 'pillowCount' && 'duration' in option) {
                  formData.durations = formData.durations || {};
                  formData.durations[field.name] = option.duration;
                }

                // Обновление ставки и helperText — для поля cleaningType или serviceType
                if ((field.name === 'cleaningType' || field.name === 'serviceType') && typeof option.rate === 'number') {
                  formData.meta = formData.meta || {};
                  formData.meta.ratePerM2 = option.rate;

                  const helper = bodyEl.querySelector('[data-helper-for="area"]');
                  if (helper) {
                    helper.textContent = `${option.rate} ₽/м²`;
                  }
                }

                // Установка ставки за м² при выборе универсальный
                if (field.name === 'variables' && typeof option.rate === 'number') {
                  formData.meta = formData.meta || {};
                  formData.meta.ratePerM2 = option.rate;
                }

                // Поддержка расчета стоимости ковра по метрам
                if (field.name === 'carpetSize') {
                  const multiplier = option.priceMultiplier || 1;
                  const areaValue = parseFloat(formData.values.area);

                  if (!isNaN(areaValue)) {
                    const rate = formData.meta?.ratePerM2 || 0;
                    const price = areaValue * rate * multiplier;
                    formData.prices.area = Math.round(price);
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

                // Поддержка логики расчёта для мойки окон — при выборе тяжести
                if (field.name === 'urgency') {
                  const multiplier = option.priceMultiplier || 1;
                  const rate = option.rate || 0;
                  const areaValue = parseFloat(formData.values.area);

                  if (!isNaN(areaValue)) {
                    formData.prices.area = Math.round(areaValue * rate * multiplier);
                  }
                }

                // Поддержка логики расчёта для подушек — при выборе количества
                if (field.name === 'pillowCount') {
                  const basePrice = option.price || 0;

                  const selectedSize = formData.values.pillowSize;
                  const pillowSizeStep = currentBranchSteps
                    .flatMap(step => step.fields || [])
                    .find(f => f.name === 'pillowSize');

                  const sizeOption = pillowSizeStep?.options?.find(opt => opt.value === selectedSize);
                  const multiplier = sizeOption?.priceMultiplier || 1;
                  const finalPrice = basePrice * multiplier;
                  formData.prices.pillowCount = finalPrice;

                  const baseDuration = option?.duration || 0;

                  // 💾 Сохраняем как базу для дальнейшего пересчёта
                  formData.tempDurations = formData.tempDurations || {};
                  formData.tempDurations.pillowCountBase = baseDuration;

                  // ✅ Сохраняем напрямую для отображения
                  formData.durations = formData.durations || {};
                  formData.durations.pillowCount = baseDuration;

                  calculateTotalDuration(formData);
                }
                
                // Пересчёт duration для подушек при выборе размера
                if (field.name === 'pillowSize') {
                  const selectedCount = formData.values.pillowCount;

                  const pillowCountStep = currentBranchSteps
                    .flatMap(step => step.fields || [])
                    .find(f => f.name === 'pillowCount');

                  const countOption = pillowCountStep?.options?.find(opt => opt.value === selectedCount);

                  // Берем duration напрямую из countOption, НЕ из formData.durations
                  const baseDuration = countOption?.duration || 0;

                  const sizeOption = field.options.find(opt => opt.value === radio.value);
                  const multiplier = sizeOption?.priceMultiplier || 1;

                  // Перезаписываем duration с нуля
                  formData.durations = formData.durations || {};
                  formData.durations.pillowCount = Math.round(baseDuration * multiplier);
                }

                calculateTotalDuration(formData);
                updatePathSummary(formData);
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

              if ((field.name === 'cleaningType' || field.name === 'serviceType') && typeof option.rate === 'number') {
                formData.meta = formData.meta || {};
                formData.meta.ratePerM2 = option.rate;

                const helper = bodyEl.querySelector('[data-helper-for="area"]');
                if (helper) {
                  helper.textContent = `${option.rate} ₽/м²`;
                }
              }

              if (field.name === 'variables' && typeof option.rate === 'number') {
                formData.meta = formData.meta || {};
                formData.meta.ratePerM2 = option.rate;
              }

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

              // Поддержка логики расчёта для мойки окон — при выборе тяжести
              if (field.name === 'urgency') {
                const multiplier = option.priceMultiplier || 1;
                const rate = option.rate || 0;
                const areaValue = parseFloat(formData.values.area);

                if (!isNaN(areaValue)) {
                  formData.prices.area = Math.round(areaValue * rate * multiplier);
                }
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

    // Принудительно запускаем change у выбранных radio-кнопок,
    // но пропускаем поля, которые уже были обработаны вручную
    stepData.fields.forEach(field => {
      if ((field.type === 'radio' || field.type === 'radio-inline') && field.name !== 'pillowSize') {
        const checkedRadio = bodyEl.querySelector(`input[name="${field.name}"]:checked`);
        if (checkedRadio) {
          checkedRadio.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
      updatePathSummary(formData);
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

            // ⏱ Обновим duration для выбранных чекбоксов
            if (!formData.durations) formData.durations = {};
            formData.durations[field.name] = 0;

            if (field.options) {
              values.forEach(val => {
                const option = field.options.find(opt => opt.value === val);
                if (option?.duration) {
                  formData.durations[field.name] += option.duration;
                }
              });
            }

            // 💲 Обновим цену
            const priceEl = document.querySelector('.popup__summary-price');
            const totalPrice = calculateTotalPrice(formData.prices);
            if (priceEl) priceEl.textContent = totalPrice;

            // ✅ Пересчёт времени сразу
            calculateTotalDuration(formData);
            updatePathSummary(formData);
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

  function clearStep(step) {
    const fieldList = step?.fields || [];

    fieldList.forEach(field => {
      const name = field.name;
      delete formData.values?.[name];
      delete formData.prices?.[name];
      if (formData.durations) delete formData.durations[name];
    });
  }

  function buildPathText(formData) {
    const fullBranch = currentBranchSteps.branchName;
    const branch = fullBranch.startsWith('cleaning') ? 'cleaning' :
                  fullBranch.startsWith('windows') ? 'windows' :
                  'dry_cleaning';

    const templateMap = {
      cleaning: ['cleaningType', 'serviceType', 'areaType', 'area', 'bathroomCount'],
      windows: ['serviceType', 'area', 'urgency'],
      dry_cleaning: [
        'serviceType', 'sofaPull-out', 'sofaSize', 'variables', 'pillowCount', 'pillowSize',
        'armchairSize', 'chairSize', 'mattressSize', 'carpetSize', 'area'
      ]
    };

    const template = templateMap[branch];
    const result = [];

    template.forEach(key => {
      const val = formData.values?.[key];
      if (!val) return;

      if (key === 'area') {
        result.push(`${val} м²`);
      } else {
        // 🧠 Ищем поле сначала в текущей ветке, если не нашли — в commonSteps
        let field = allSteps
          .flatMap(step => step.fields || [])
          .find(f => f.name === key);

        if (!field) {
          field = commonSteps
            .flatMap(step => step.fields || [])
            .find(f => f.name === key);
        }

        const option = field?.options?.find(opt => opt.value === val);
        if (option?.wayname) {
          result.push(option.wayname);
        }
      }
    });

    const finalText = result.join(' ');
    return finalText.charAt(0).toUpperCase() + finalText.slice(1);
  }

  function updatePathSummary(formData) {
    const pathEl = document.querySelector('.history__step');
    const checkboxListEl = document.querySelector('.history__checkbox-list');

    if (!pathEl || !checkboxListEl) return;

    pathEl.textContent = buildPathText(formData);

    checkboxListEl.innerHTML = '';

    Object.entries(formData.values).forEach(([fieldName, values]) => {
      if (!Array.isArray(values)) return;

      // 🛠 Ищем поле сначала в текущем шаге, потом в commonSteps
      let field = currentBranchSteps
        .flatMap(step => step.fields || [])
        .find(f => f.name === fieldName);

      if (!field) {
        field = commonSteps
          .flatMap(step => step.fields || [])
          .find(f => f.name === fieldName);
      }

      values.forEach(val => {
        const label = field?.options?.find(opt => opt.value === val)?.label;
        if (label) {
          const div = document.createElement('div');
          div.className = 'history__checkbox';
          div.textContent = `+ ${label}`;
          checkboxListEl.appendChild(div);
        }
      });
    });
  }


  btnNext.addEventListener('click', () => {

    // Сохраняем все выбранные значения с текущего шага
    const stepData = currentBranchSteps[currentStep];

    collectStepData(currentBranchSteps[currentStep], bodyEl, formData);
    // Сохраняем копию значений перед переходом
    stepHistory.push(JSON.parse(JSON.stringify(formData)));
    console.log('Текущие данные формы:', formData);



    if (currentBranchSteps.branchName === 'commonSteps') {
      selectedBranch = getSelectedRadioValue('serviceType');
      const branch = branchMap[selectedBranch];
      if (branch) {
        currentBranchSteps = [...branch.steps, ...finalSteps];
        currentBranchSteps.branchName = selectedBranch;
        formData.meta = formData.meta || {};
        formData.meta.selectedBranch = selectedBranch; // 🧠 сохраняем выбранную ветку
        allSteps = [...commonSteps, ...branch.steps];
        currentStep = 0;
        renderStep();
      } else alert('Ветка для выбранной услуги пока не реализована');
      return;
    }

    if (branchMap[currentBranchSteps.branchName]?.sub) {
      const valueKey = currentBranchSteps.branchName === 'cleaning' ? 'areaType' : 'variables';
      const selectedValue = getSelectedRadioValue(valueKey);

      const rootBranch = formData.meta?.selectedBranch; // ← используем ранее сохранённую ветку
      const baseSteps = branchMap[rootBranch]?.steps || [];
      const subSteps = branchMap[rootBranch]?.sub?.[selectedValue];

      if (subSteps) {
        currentBranchSteps = [...subSteps, ...finalSteps];
        currentBranchSteps.branchName = `${rootBranch}${selectedValue}`;
        allSteps = [...commonSteps, ...baseSteps, ...subSteps]; // ← теперь всё есть

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
      calculateTotalDuration(formData);
    } else {
      // Финальный шаг — но всё равно сохраняем данные
      collectStepData(currentBranchSteps[currentStep], bodyEl, formData);
      calculateTotalDuration(formData);
      updatePathSummary(formData);
      alert('Калькулятор завершён');
    }
  });

  btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
      clearStep(currentBranchSteps[currentStep]);
      currentStep--;
      renderStep();

      // Восстанавливаем из истории
      const lastStepData = stepHistory.pop();
      if (lastStepData) {
        formData = lastStepData;
      }

      renderStep();
      calculateTotalDuration(formData);
      updatePathSummary(formData);
      const priceEl = document.querySelector('.popup__summary-price');
      if (priceEl) priceEl.textContent = calculateTotalPrice(formData.prices);
      return;
    }

    // 🔁 dry_cleaning: возврат из подветки
    const match = currentBranchSteps.branchName.match(/^(.+?)(sofa|chair|armchair|carpet|curtains|mattress|pillow)$/);
    if (match) {
      clearStep(currentBranchSteps[currentStep]); // очистить шаг перед выходом
      const rootBranch = match[1];
      const baseBranch = formData.meta?.selectedBranch || rootBranch;

      const branch = branchMap[baseBranch];
      currentBranchSteps = [...branch.steps];
      currentBranchSteps.branchName = baseBranch;
      currentStep = branch.steps.length - 1;
      renderStep();
      calculateTotalDuration(formData);
      updatePathSummary(formData);
      const priceEl = document.querySelector('.popup__summary-price');
      if (priceEl) priceEl.textContent = calculateTotalPrice(formData.prices);
      return;
    }

    // 🔁 cleaning: возврат из подветки living/office/industrial
    if (/^cleaning(living|office|industrial)$/.test(currentBranchSteps.branchName)) {
      clearStep(currentBranchSteps[currentStep]);
      const rootBranch = 'cleaning';

      const branch = branchMap[rootBranch];
      currentBranchSteps = [...branch.steps];
      currentBranchSteps.branchName = rootBranch;
      currentStep = branch.steps.length - 1;
      renderStep();
      calculateTotalDuration(formData);
      updatePathSummary(formData);
      const priceEl = document.querySelector('.popup__summary-price');
      if (priceEl) priceEl.textContent = calculateTotalPrice(formData.prices);
      return;
    }

    // 🛑 последний уровень — возврат в commonSteps
    if (currentBranchSteps.branchName !== 'commonSteps') {
      clearStep(currentBranchSteps[currentStep]);
      currentBranchSteps = [...commonSteps];
      currentBranchSteps.branchName = 'commonSteps';
      currentStep = commonSteps.length - 1;
      renderStep();
      calculateTotalDuration(formData);
      updatePathSummary(formData);
      const priceEl = document.querySelector('.popup__summary-price');
      if (priceEl) priceEl.textContent = calculateTotalPrice(formData.prices);
      return;
    }

    // 🔚 Закрытие калькулятора
    document.getElementById('popup-calculator')?.classList.remove('active');
    document.getElementById('popup')?.classList.add('active');
  });

  renderStep();
}
