export function renderRadioField(field, bodyEl) {
  const group = document.createElement('div');
  group.classList.add('radio-group');

  field.options.forEach(opt => {
    const label = document.createElement('label');
    label.classList.add('radio');
    label.innerHTML = `
      <div class="radio_wrapped">
        <input type="radio" name="${field.name}" value="${opt.value}" ${opt.checked ? 'checked' : ''}>
        <span class="radio__icon"></span>
        <span class="radio__text">${opt.label}</span>
      </div>
      <div class="radio__right-space">${opt.rightText || '—'}</div>
    `;
    group.appendChild(label);
  });

  bodyEl.appendChild(group);
}

export function renderInputField(field, bodyEl) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('input-wrapper');

  const body = document.createElement('div');
  body.classList.add('input-body');

  // label
  if (field.label) {
    const labelEl = document.createElement('div');
    labelEl.classList.add('input-label');
    labelEl.innerHTML = field.label;
    body.appendChild(labelEl);
  }

  // input
  const inputEl = document.createElement('input');
  inputEl.type = field.inputType || 'text';
  inputEl.classList.add('input');
  inputEl.name = field.name;
  inputEl.placeholder = field.placeholder || '';
  if (field.value != null) inputEl.value = String(field.value);
  inputEl.setAttribute('autocomplete', 'off');
  inputEl.setAttribute('aria-invalid', 'false');
  body.appendChild(inputEl);

  // helper text
  const helperEl = document.createElement('div');
  helperEl.classList.add('input-helper-text');
  helperEl.setAttribute('data-helper-for', field.name);
  helperEl.innerHTML = field.helperText || '';
  body.appendChild(helperEl);

  // error icon (скрыт стилями до состояния .input-wrapper_error)
  const errorIcon = document.createElement('div');
  errorIcon.classList.add('input-error-icon');
  errorIcon.setAttribute('aria-hidden', 'true');
  body.appendChild(errorIcon);

  // error text (пустой, показывается при .input-wrapper_error)
  const errorText = document.createElement('div');
  errorText.classList.add('input-error-text');

  wrapper.appendChild(body);
  wrapper.appendChild(errorText);

  bodyEl.appendChild(wrapper);
}

export function setInputError(wrapperEl, message) {
  if (!wrapperEl) return;
  wrapperEl.classList.add('input-wrapper_error');
  const errText = wrapperEl.querySelector('.input-error-text');
  if (errText) errText.textContent = message || 'Поле является обязательным для заполнения';
  const input = wrapperEl.querySelector('.input');
  if (input) input.setAttribute('aria-invalid', 'true');
}

export function clearInputError(wrapperEl) {
  if (!wrapperEl) return;
  wrapperEl.classList.remove('input-wrapper_error');
  const errText = wrapperEl.querySelector('.input-error-text');
  if (errText) errText.textContent = '';
  const input = wrapperEl.querySelector('.input');
  if (input) input.setAttribute('aria-invalid', 'false');
}

export function renderInlineRadioField(field, bodyEl) {
  const group = document.createElement('div');
  group.classList.add('radio-group', 'radio-group-inline');
  field.options.forEach(opt => {
    const label = document.createElement('label');
    label.classList.add('radio');
    label.innerHTML = `
      <div class="radio_wrapped">
        <input type="radio" name="${field.name}" value="${opt.value}" ${opt.checked ? 'checked' : ''}>
        <span class="radio__icon"></span>
        <span class="radio__text">${opt.label}</span>
      </div>`;
    group.appendChild(label);
  });
  bodyEl.appendChild(group);
}

export function renderCheckboxField(field, bodyEl) {
  const group = document.createElement('div');
  group.classList.add('checkbox-group');

  field.options.forEach(opt => {
    const label = document.createElement('label');
    label.classList.add('checkbox');

    label.innerHTML = `
      <div class="checkbox_wrapped">
        <input 
          type="checkbox" 
          class="checkbox-input" 
          name="${field.name}" 
          value="${opt.value}" 
          ${opt.duration ? `data-duration="${opt.duration}"` : ''}
          ${opt.checked ? 'checked' : ''}
        >
        <span class="checkbox__icon">
          <svg class="icon-default" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7.8C3 6.12 3 5.28 3.33 4.64C3.61 4.07 4.07 3.61 4.64 3.33C5.28 3 6.12 3 7.8 3H16.2C17.88 3 18.72 3 19.36 3.33C19.93 3.61 20.39 4.07 20.67 4.64C21 5.28 21 6.12 21 7.8V16.2C21 17.88 21 18.72 20.67 19.36C20.39 19.93 19.93 20.39 19.36 20.67C18.72 21 17.88 21 16.2 21H7.8C6.12 21 5.28 21 4.64 20.67C4.07 20.39 3.61 19.93 3.33 19.36C3 18.72 3 17.88 3 16.2V7.8Z" stroke="#93A0AD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg class="icon-checked" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7.8C3 6.12 3 5.28 3.33 4.64C3.61 4.07 4.07 3.61 4.64 3.33C5.28 3 6.12 3 7.8 3H16.2C17.88 3 18.72 3 19.36 3.33C19.93 3.61 20.39 4.07 20.67 4.64C21 5.28 21 6.12 21 7.8V16.2C21 17.88 21 18.72 20.67 19.36C20.39 19.93 19.93 20.39 19.36 20.67C18.72 21 17.88 21 16.2 21H7.8C6.12 21 5.28 21 4.64 20.67C4.07 20.39 3.61 19.93 3.33 19.36C3 18.72 3 17.88 3 16.2V7.8Z" fill="#0D1824" stroke="#0D1824" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.5 12L10.5 15L16.5 9" stroke="#EBEFF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="checkbox__text">${opt.label}</span>
      </div>
      <div class="checkbox__right-space">${opt.rightText || '—'}</div>
    `;

    group.appendChild(label);
  });

  bodyEl.appendChild(group);
}
