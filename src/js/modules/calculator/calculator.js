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
import { setInputError, clearInputError } from './calculator-renderers.js';


// Проверка ввода номера в инпут

function extractDigits(str) {
  return String(str || '').replace(/\D/g, '');
}

// Нормализуем под РФ: 10 национальных цифр после 7/8
function normalizeRuDigits(d) {
  let ds = extractDigits(d);
  if (ds.startsWith('8')) ds = ds.slice(1);
  else if (ds.startsWith('7')) ds = ds.slice(1);
  return ds.slice(0, 10);
}

function formatRuPhoneFromDigits(ds) {
  const a = ds[0] || '';
  const b = ds[1] || '';
  const c = ds[2] || '';
  const d = ds[3] || '';
  const e = ds[4] || '';
  const f = ds[5] || '';
  const g = ds[6] || '';
  const h = ds[7] || '';
  const i = ds[8] || '';
  const j = ds[9] || '';

  if (ds.length === 0) return '+7 ';
  if (ds.length <= 3) return `+7 (${a}${b}${c}`;
  if (ds.length <= 6) return `+7 (${a}${b}${c}) ${d}${e}${f}`;
  if (ds.length <= 8) return `+7 (${a}${b}${c}) ${d}${e}${f}-${g}${h}`;
  return `+7 (${a}${b}${c}) ${d}${e}${f}-${g}${h}-${i}${j}`;
}

function validatePhoneRu(value) {
  const ds = normalizeRuDigits(value);
  if (ds.length < 10) return 'Введите номер в формате +7 (XXX) XXX-XX-XX';
  return null;
}

// Разрешённые домены (Россия + популярные мировые)
const ALLOWED_EMAIL_DOMAINS = new Set([
  // Mail.ru Group
  'mail.ru', 'inbox.ru', 'list.ru', 'bk.ru',
  // Yandex
  'yandex.ru', 'yandex.com', 'ya.ru', 'yandex.kz', 'yandex.by',
  // Rambler
  'rambler.ru', 'rambler.com',
  // Google
  'gmail.com', 'googlemail.com',
  // Microsoft
  'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
  // Apple
  'icloud.com', 'me.com',
  // Proton
  'protonmail.com', 'proton.me',
  // GMX
  'gmx.com', 'gmx.de',
  // Yahoo
  'yahoo.com', 'yahoo.co.uk', 'yahoo.co.in', 'ymail.com', 'rocketmail.com',
]);

// Строгий валидатор email с проверкой домена по whitelist
function validateEmail(raw) {
  const val = String(raw || '').trim();
  if (val.length === 0) return 'Поле является обязательным для заполнения';
  if (val.length > 254) return 'Слишком длинный email';

  // Базовый формат: локальная часть и домен с точками
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
  if (!re.test(val)) return 'Некорректный email';

  // Разделяем и проверяем длины частей
  const [local, domainRaw] = val.split('@');
  if (!local || !domainRaw) return 'Некорректный email';
  if (local.length > 64) return 'Слишком длинная локальная часть';
  if (domainRaw.length > 190) return 'Слишком длинный домен';

  // Приведём домен к нижнему регистру
  const domain = domainRaw.toLowerCase();

  // Проверка по списку разрешённых доменов
  if (!ALLOWED_EMAIL_DOMAINS.has(domain)) {
    return 'Почтовый домен не поддерживается';
  }

  return null; // ок
}



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

  let finalErrorOpacityHandler = null;

  function applyInlineOpacityByErrors() {
    // Ищем блок там, где он реально находится
    const inline = container.querySelector('.radio-group-inline') || bodyEl.querySelector('.radio-group-inline');
    if (!inline) return;

    // Есть ли хоть одна ошибка на текущем шаге
    const hasError = !!bodyEl.querySelector('.input-wrapper_error');

    inline.style.opacity = hasError ? '0' : '1';
    inline.style.pointerEvents = hasError ? 'none' : '';
  }

  function validateRequiredInputs(stepRoot) {
    const wrappers = stepRoot.querySelectorAll('.input-wrapper');
    let ok = true;

    wrappers.forEach((w) => {
      // Берём любые поля ввода, даже без класса .input
      const input = w.querySelector('input, textarea, select');
      if (!input) return;

      const val = String(input.value || '').trim();

      // Общая проверка на пустоту
      if (val === '') {
        setInputError(w, 'Поле является обязательным для заполнения');
        ok = false;
        return;
      }

      // Имя
      if (input.name === 'contactName') {
        const nameError = validateContactName(val);
        if (nameError) {
          setInputError(w, nameError);
          ok = false;
          return;
        }
      }

      // Телефон
      if (input.name === 'contactPhone') {
        const phoneError = validatePhoneRu(val);
        if (phoneError) {
          setInputError(w, phoneError);
          ok = false;
          return;
        }
      }

      // Email
      if (input.name === 'contactMail') {
        const emailError = validateEmail(val);
        if (emailError) {
          setInputError(w, emailError);
          ok = false;
          return;
        }
      }
    });

    return ok;
  }

  function validateContactName(inputValue) {
    const val = inputValue.trim().replace(/\s+/g, ' ');
    if (val.length < 2) {
      return 'Имя должно содержать минимум 2 буквы';
    }
    if (val.length > 50) {
      return 'Имя не может быть длиннее 50 символов';
    }
    // Разрешаем только буквы (русские, латинские) и пробел
    if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(val)) {
      return 'Имя может содержать только буквы';
    }
    return null; // ошибок нет
  }

  // Снимаем ошибку при вводе
  bodyEl.addEventListener('input', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    const wrapper = target.closest('.input-wrapper');
    if (wrapper) clearInputError(wrapper);
  });

  btnNext?.addEventListener('click', (e) => {
    const stepRoot = bodyEl;
    const ok = validateRequiredInputs(stepRoot);
    applyInlineOpacityByErrors();
    if (!ok) {
      e.preventDefault();
      e.stopImmediatePropagation(); // ← важно: блокируем другие обработчики на этой кнопке
      const firstErr = stepRoot.querySelector('.input-wrapper_error');
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    // дальше твоя логика перехода (останется работать, когда ok === true)
  });

  // "Оформить заказ"
  const btnOrder = container.querySelector('#btn-primary-submit');
  btnOrder?.addEventListener('click', (e) => {
    const stepRoot = bodyEl;
    const ok = validateRequiredInputs(stepRoot);
    applyInlineOpacityByErrors();
    if (!ok) {
      e.preventDefault();
      e.stopImmediatePropagation(); // ← то же самое
      const firstErr = stepRoot.querySelector('.input-wrapper_error');
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    // отправка формы
  });


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
    if (stepData.fields) {
    stepData.fields.forEach(field => {
      if ((field.type === 'radio' || field.type === 'radio-inline') && formData.values?.[field.name]) {
        const savedValue = formData.values[field.name];
        const inputEl = bodyEl.querySelector(`input[name="${field.name}"][value="${savedValue}"]`);
        if (inputEl) inputEl.checked = true;
      }
    });
}

    // 🔁 Восстановление значений input-полей
    if (stepData.fields) stepData.fields.forEach(field => {
      if (field.type === 'input' && formData.values?.[field.name] !== undefined) {
        const inputEl = bodyEl.querySelector(`input[name="${field.name}"]`);
        if (inputEl) {
          inputEl.value = formData.values[field.name];
        }
      }
    });

    // 🔁 Восстановление чекбоксов
    if (stepData.fields) {
      stepData.fields.forEach(field => {
        if (field.type === 'checkbox') {
          const savedValues = formData.values?.[field.name] || [];
          const checkboxes = bodyEl.querySelectorAll(`input[name="${field.name}"]`);
          checkboxes.forEach(checkbox => {
            checkbox.checked = savedValues.includes(checkbox.value);
          });
        }
      });
   }

    attachRadioListeners(stepData, bodyEl, formData);
    attachCheckboxListeners(stepData, bodyEl, formData); //обновление цены при нажатии на чекбокс
    attachPhoneMask(bodyEl);

    // --- Автопрозрачность radio-group-inline на финальном шаге (по классам ошибок) ---
    if (finalErrorOpacityHandler) {
      bodyEl.removeEventListener('input', finalErrorOpacityHandler);
      bodyEl.removeEventListener('change', finalErrorOpacityHandler);
      bodyEl.removeEventListener('blur', finalErrorOpacityHandler, true);
      finalErrorOpacityHandler = null;
    }

    if (stepData.isFinal) {
      applyInlineOpacityByErrors(); // первичная установка

      finalErrorOpacityHandler = () => applyInlineOpacityByErrors();
      // Обновлять, когда пользователь что-то вводит/правит
      bodyEl.addEventListener('input', finalErrorOpacityHandler);
      bodyEl.addEventListener('change', finalErrorOpacityHandler);
      // И на blur, чтобы поймать кейсы, когда ошибки ставятся/снимаются не сразу
      bodyEl.addEventListener('blur', finalErrorOpacityHandler, true);
    }

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

    const popupBodyEl = container.querySelector('.popup__container--right .popup__body');
    if (popupBodyEl) {
      popupBodyEl.classList.toggle('final-step-hidden', !!stepData.isFinal);
    }

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

    // Подключаем контактные улучшения только если есть эти поля на шаге
    if (bodyEl.querySelector('input[name="contactPhone"]')) {
      attachPhoneMask(bodyEl);
    }
  }

  function attachPhoneMask(stepRoot) {
    const input = stepRoot.querySelector('input[name="contactPhone"]');
    if (!input) return;

    input.addEventListener('focus', () => {
      if (!input.value.trim()) {
        input.value = '+7 ';
        requestAnimationFrame(() => {
          input.selectionStart = input.selectionEnd = input.value.length;
        });
      }
    });

    function applyMask() {
      const ds = normalizeRuDigits(input.value);
      input.value = formatRuPhoneFromDigits(ds);
    }

    input.addEventListener('input', applyMask);

    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text');
      const ds = normalizeRuDigits(text);
      input.value = formatRuPhoneFromDigits(ds);
    });

    input.addEventListener('keydown', (e) => {
      const prefixLimit = 3; // "+7"
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      if ((e.key === 'Backspace' && start <= prefixLimit && end <= prefixLimit) ||
          (e.key === 'Delete' && start < prefixLimit)) {
        e.preventDefault();
      }
    });
  }

  function attachPhoneMask(stepRoot) {
    const input = stepRoot.querySelector('input[name="contactPhone"]');
    if (!input) return;

    // При фокусе — автопрефикс
    input.addEventListener('focus', () => {
      if (!input.value || input.value.trim() === '') {
        input.value = '+7 ';
        // курсор в конец
        requestAnimationFrame(() => {
          input.selectionStart = input.selectionEnd = input.value.length;
        });
      }
    });

    // Маска на ввод и вставку
    function applyMaskFromCurrentValue() {
      const ds = normalizeRuDigits(input.value);
      input.value = formatRuPhoneFromDigits(ds);
    }

    input.addEventListener('input', () => {
      applyMaskFromCurrentValue();
    });

    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text');
      const ds = normalizeRuDigits(text);
      input.value = formatRuPhoneFromDigits(ds);
    });

    // Запрет стирания префикса "+7"
    input.addEventListener('keydown', (e) => {
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      const isBackspace = e.key === 'Backspace';
      const isDelete = e.key === 'Delete';

      // Не даем удалить символы в зоне "+7"
      // +7␠ => длина префикса 3 символа
      const prefixLimit = 3;
      if (isBackspace && start <= prefixLimit && end <= prefixLimit) {
        e.preventDefault();
        return;
      }
      if (isDelete && start < prefixLimit) {
        e.preventDefault();
        return;
      }
    });

    // На blur — если остался только префикс, оставляем как есть
    input.addEventListener('blur', () => {
      // Ничего не делаем, пусть остается "+7 " даже если пусто.
      // Если хочешь очищать полностью — раскомментируй:
      // const ds = normalizeRuDigits(input.value);
      // if (ds.length === 0) input.value = '';
    });
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
        if (!input) return;

        // Список полей, которые не участвуют в расчёте цены
        const excludedFields = ['contactPhone', 'contactMail', 'contactName'];
        if (excludedFields.includes(field.name)) {
          formData.values[field.name] = input.value.trim();
          delete formData.prices[field.name]; // на всякий случай убираем старое
          return; // выходим — цену не считаем
        }

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


  // Кастомные пути для отображении выборов если defaultTemplateMap не подходит
  const customTemplateMap = [
    {
      branch: 'cleaning',
      match: { cleaningType: 'after_repair' },
      template: ['serviceType', 'areaType', 'cleaningType', 'area', 'bathroomCount']
    },
    {
      branch: 'cleaning',
      match: { cleaningType: 'daily2' },
      template: ['serviceType', 'areaType', 'cleaningType', 'area', 'bathroomCount']
    },
    {
      branch: 'cleaning',
      match: { cleaningType: 'general2' },
      template: ['serviceType', 'areaType', 'cleaningType', 'area', 'bathroomCount']
    },
    {
      branch: 'dry_cleaning',
      match: { armchairSize: 'standart' },
      template: ['serviceType', 'armchairSize', 'variables']
    },
    {
      branch: 'dry_cleaning',
      match: { armchairSize: 'pull-out' },
      template: ['serviceType', 'armchairSize', 'variables']
    },
    {
      branch: 'dry_cleaning',
      match: { armchairSize: 'office' },
      template: ['serviceType', 'armchairSize', 'variables']
    },
    {
      branch: 'dry_cleaning',
      match: { chairSize: 'office' },
      template: ['serviceType', 'chairSize', 'variables']
    },
    {
      branch: 'dry_cleaning',
      match: { mattressSize: 'children' },
      template: ['serviceType', 'mattressSize', 'variables']
    },
    {
      branch: 'dry_cleaning',
      match: { mattressSize: '1_place' },
      template: ['serviceType', 'mattressSize', 'variables']
    },
    {
      branch: 'dry_cleaning',
      match: { mattressSize: '1.5_place' },
      template: ['serviceType', 'mattressSize', 'variables']
    },
    {
      branch: 'dry_cleaning',
      match: { mattressSize: '2_place' },
      template: ['serviceType', 'mattressSize', 'variables']
    },
  ];

  function buildPathText(formData) {
    const fullBranch = currentBranchSteps.branchName;
    const branch = fullBranch.startsWith('cleaning') ? 'cleaning' :
                  fullBranch.startsWith('windows') ? 'windows' :
                  'dry_cleaning';

    // 🧠 Попробуем найти подходящий кастомный шаблон
    let template = null;

    for (const rule of customTemplateMap) {
      if (rule.branch === branch) {
        const match = rule.match;
        const allMatch = Object.entries(match).every(([key, val]) => formData.values[key] === val);
        if (allMatch) {
          template = rule.template;
          break;
        }
      }
    }

    // Если ничего не подошло — используем стандартную карту
    if (!template) {
      const defaultTemplateMap = {
        cleaning: ['cleaningType', 'serviceType', 'areaType', 'area', 'bathroomCount'],
        windows: ['serviceType', 'area', 'urgency'],
        dry_cleaning: [
          'serviceType', 'sofaPull-out', 'sofaSize', 'variables', 'pillowCount', 'pillowSize',
          'armchairSize', 'chairSize', 'mattressSize', 'carpetSize', 'area'
        ]
      };

      template = defaultTemplateMap[branch];
    }

    const result = [];

    template.forEach(key => {
      const val = formData.values?.[key];
      if (!val) return;

      if (key === 'area') {
        result.push(`${val} м²`);
      } else {
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
