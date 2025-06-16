export function setupCalculatorPopup() {
  const state = {
    currentStep: 1,
    currentBranch: null,
  };

  // Конфигурация шагов и веток
  const stepsConfig = {
    start: {
      1: {
        html: `
        <div class="radio-group">
            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="serviceType" value="cleaning" checked>
                    <span class="radio__icon"></span>
                    <span class="radio__text">Уборка помещений</span>
                </div>
                <div class="radio__right-space">—</div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="serviceType" value="windows">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Мойка окон</span>
                </div>
                <div class="radio__right-space">—</div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="serviceType" value="dry_cleaning">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Химчистка</span>
                </div>
                <div class="radio__right-space">—</div>
            </label>
        </div>
        `
      }
    },
    cleaning: {
      2: {
        html: `
        <div class="radio-group">
            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="home" checked>
                    <span class="radio__icon"></span>
                    <span class="radio__text">Жилое помещение</span>
                </div>
                <div class="radio__right-space">от 90 ₽/м<sup>2</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="office">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Офис/малая коммерция</span>
                </div>
                <div class="radio__right-space">от 90 ₽/м<sup>2</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="production">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Производственное/складское помещение</span>
                </div>
                <div class="radio__right-space">от 140 ₽/м<sup>2</sup></div>
            </label>
        </div>
        `,
        nextMap: {
          home: 'cleaning_home',
          office: 'cleaning_office',
          production: 'cleaning_production'
        }
      }
    },
    cleaning_home: {
      3: {
        html: `
        <div class="radio-group">
            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="home" checked>
                    <span class="radio__icon"></span>
                    <span class="radio__text">Повседневная уборка</span>
                </div>
                <div class="radio__right-space">от 90 ₽/м<sup>2</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="office">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Генеральная уборка</span>
                </div>
                <div class="radio__right-space">от 130 ₽/м<sup>2</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="office">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Уборка после ремонта</span>
                </div>
                <div class="radio__right-space">от 150 ₽/м<sup>2</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="office">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Уборка до/после жильцов</span>
                </div>
                <div class="radio__right-space">от 120 ₽/м<sup>2</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="office">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Уборка после праздника</span>
                </div>
                <div class="radio__right-space">от 90 ₽/м<sup>2</sup></div>
            </label>
        </div>
        `
      },

      4: {
        html: `
        <div class="radio-group">
            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="0" checked>
                    <span class="radio__icon"></span>
                    <span class="radio__text">Без санузла</span>
                </div>
                <div class="radio__right-space">-</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="1">
                    <span class="radio__icon"></span>
                    <span class="radio__text">1</span>
                </div>
                <div class="radio__right-space">1200 ₽/шт</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="2">
                    <span class="radio__icon"></span>
                    <span class="radio__text">2</span>
                </div>
                <div class="radio__right-space">1100 ₽/шт</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="3">
                    <span class="radio__icon"></span>
                    <span class="radio__text">3</span>
                </div>
                <div class="radio__right-space">1000 ₽/шт</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="4">
                    <span class="radio__icon"></span>
                    <span class="radio__text">4</span>
                </div>
                <div class="radio__right-space">900 ₽/шт</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="5">
                    <span class="radio__icon"></span>
                    <span class="radio__text">5+</span>
                </div>
                <div class="radio__right-space">800 ₽/шт</sup></div>
            </label>
        </div>
        `
      },
      5: {
        html: `
        <div class="input-wrapper">
          <div class="input-label">м<sup>2</sup></div>
          <input type="text" class="input" id="myInput" placeholder="" />
          <div class="input-helper-text">90 ₽/м<sup>2</sup></div>
        </div>
        `
      },
      6: {
        html: `
        <label class="checkbox">
          <div class="checkbox_wrapped">
              <input type="checkbox" class="checkbox-input">
              <span class="checkbox__icon">
                  <svg class="icon-default" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="type=checkbox-empty">
                      <path id="Icon" d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z" stroke="#93A0AD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                  </svg>

                  <svg class="icon-checked" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="type=checkbox-filled">
                      <path id="Icon" d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z" fill="#0D1824" stroke="#0D1824" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path id="Icon_2" d="M7.5 12L10.5 15L16.5 9" stroke="#EBEFF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                  </svg>
              </span>
              <span class="checkbox__text">Мытье окон</span>
          </div>
          <div class="checkbox__right-space">450 ₽/м<sup>2</sup></div>
        </label>

        <label class="checkbox">
          <div class="checkbox_wrapped">
              <input type="checkbox" class="checkbox-input">
              <span class="checkbox__icon">
                  <svg class="icon-default" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="type=checkbox-empty">
                      <path id="Icon" d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z" stroke="#93A0AD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                  </svg>

                  <svg class="icon-checked" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="type=checkbox-filled">
                      <path id="Icon" d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z" fill="#0D1824" stroke="#0D1824" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path id="Icon_2" d="M7.5 12L10.5 15L16.5 9" stroke="#EBEFF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                  </svg>
              </span>
              <span class="checkbox__text">Мытье холодильника</span>
          </div>
          <div class="checkbox__right-space">800 ₽/шт</div>
        </label>

        <label class="checkbox">
          <div class="checkbox_wrapped">
              <input type="checkbox" class="checkbox-input">
              <span class="checkbox__icon">
                  <svg class="icon-default" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="type=checkbox-empty">
                      <path id="Icon" d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z" stroke="#93A0AD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                  </svg>

                  <svg class="icon-checked" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="type=checkbox-filled">
                      <path id="Icon" d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z" fill="#0D1824" stroke="#0D1824" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path id="Icon_2" d="M7.5 12L10.5 15L16.5 9" stroke="#EBEFF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                  </svg>
              </span>
              <span class="checkbox__text">Мытье духового шкафа</span>
          </div>
          <div class="checkbox__right-space">800 ₽/шт</div>
        </label>
        `
      },
      7: {
        html: `
        <div class="input-wrapper">
          <input type="text" class="input" id="myInput" placeholder="Имя" />

        </div>

        <div class="input-wrapper">

          <input type="text" class="input" id="myInput" placeholder="+7 (999) 999-99-99" />

        </div>

        <div class="input-wrapper">

          <input type="text" class="input" id="myInput" placeholder="example@mail.ru" />

        </div>
        `
      },
    },
    cleaning_office: {
      3: {
        html: `
        <div class="radio-group">
            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="home" checked>
                    <span class="radio__icon"></span>
                    <span class="radio__text">Повседневная уборка</span>
                </div>
                <div class="radio__right-space">от 90 ₽/м<sup>2</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="office">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Генеральная уборка</span>
                </div>
                <div class="radio__right-space">от 130 ₽/м<sup>2</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="office">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Уборка после ремонта</span>
                </div>
                <div class="radio__right-space">от 150 ₽/м<sup>2</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="office">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Уборка до/после жильцов</span>
                </div>
                <div class="radio__right-space">от 120 ₽/м<sup>2</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="office">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Уборка после праздника</span>
                </div>
                <div class="radio__right-space">от 90 ₽/м<sup>2</sup></div>
            </label>
        </div>
        `
      }
    },
    cleaning_production: {
      3: {
        html: `
        <div class="radio-group">

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="office">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Уборка после ремонта</span>
                </div>
                <div class="radio__right-space">от 160 ₽/м<sup>2</sup></div>
            </label>

            <label class="radio">
                <div class="radio_wrapped">
                    <input type="radio" name="cleaningType" value="office">
                    <span class="radio__icon"></span>
                    <span class="radio__text">Генеральная уборка</span>
                </div>
                <div class="radio__right-space">от 140 ₽/м<sup>2</sup></div>
            </label>
        </div>
        `
      }
    },
    windows: {
      2: {
        html: `<p>Шаг 2 для мойки окон</p>`
      }
    },
    dry_cleaning: {
      2: {
        html: `<p>Шаг 2 для химчистки</p>`
      }
    }
  };

  // Элементы
  const bodyEl = document.querySelector('#popup-calculator .popup__container--right .popup__body');
  const stepEl = document.querySelector('#popup-calculator .popup__container--left .popup__step');
  const btnNext = document.getElementById('btn-primary-next');
  const btnBack = document.getElementById('btn-primary-back');

  function renderStep() {
    let stepData;

    if (state.currentStep === 1) {
      stepData = stepsConfig.start[1];
    } else {
      stepData = stepsConfig[state.currentBranch]?.[state.currentStep];
    }

    if (stepData) {
      bodyEl.innerHTML = stepData.html;
      stepEl.textContent = `шаг ${state.currentStep}`;
      btnNext.disabled = false;
      btnBack.disabled = (state.currentStep === 1);
    } else {
      bodyEl.innerHTML = `<p>Конец калькулятора</p>`;
      btnNext.disabled = true;
    }
  }

  function getSelectedOption() {
    const checkedInput = bodyEl.querySelector('input[type="radio"]:checked');
    return checkedInput ? checkedInput.value : null;
  }

  btnNext.addEventListener('click', () => {
    if (state.currentStep === 1) {
      const selected = getSelectedOption();
      if (!selected) {
        alert('Выберите вариант');
        return;
      }
      state.currentBranch = selected;
      state.currentStep = 2;
    } else {
      const stepData = stepsConfig[state.currentBranch]?.[state.currentStep];
      if (stepData?.nextMap) {
        const selected = getSelectedOption();
        if (!selected) {
          alert('Выберите вариант');
          return;
        }
        state.currentBranch = stepData.nextMap[selected];
        state.currentStep++;
      } else {
        state.currentStep++;
      }
    }
    renderStep();
  });

  btnBack.addEventListener('click', () => {
    if (state.currentStep > 1) {
      state.currentStep--;
      if (state.currentStep === 1) {
        state.currentBranch = null;
      }
      renderStep();
    }
  });

  // Первый рендер
  renderStep();
}
