export const commonSteps = [
  {
    stepTitle: 'Шаг 1',
    title: 'Услуга',
    fields: [
      {
        type: 'radio',
        name: 'serviceType',
        options: [
          { value: 'cleaning', label: 'Уборка помещений', wayname: 'уборка', rightText: '—', checked: true },
          { value: 'windows', label: 'Мойка окон', wayname: 'мойка окон', rate: 450, rightText: '—'},
          { value: 'dry_cleaning', label: 'Химчистка', wayname: 'химчистка', rightText: '—' }
        ]
      }
    ]
  }
];

export const thankYouStep = {
  isFinal: true,
  isThankYou: true,
  stepTitle: '',
  stepTitle: 'последний шаг',
  titleHtml: `
    <div class="popup__head">
      <div class="popup__title">
        Ваша заявка успешно отправлена, спасибо что выбрали нас!
      </div>
      <div class="popup__text">
        Узнайте стоимость уборки/химчистки прямо сейчас, ответив на несколько простых вопросов. После чего мы свяжемся с вами чтобы уточнить детали и договориться о встрече.
      </div>
      <div class="popup__btn-bar">
        <button id="popup__new-calculation" class="btn-primary">новый онлайн-расчет</button>
      </div>
    </div>
  `,
  bodyHtml: '',
  footerHtml: `
    <div id="popup__footer_help-text" class="popup__footer_help-text">
      *Стоимость услуг, указанная на&nbsp;сайте, а&nbsp;также предложение, сформированное в&nbsp;результате онлайн-расчёта, носят информационный характер и&nbsp;не&nbsp;являются публичной офертой (ст.&nbsp;437&nbsp;ГК РФ).
    </div>
    <br>
    <div id="popup__footer_help-text" class="popup__footer_help-text">
      **Окончательная стоимость услуги определяется при общении с&nbsp;менеджером и&nbsp;фиксируется при заключении договора.
    </div>
  `,
  hideNavButtons: true
};

export const finalStep = {
  isFinal: true,
  stepTitle: 'последний шаг',
  title: 'Осталось уточнить детали <br> и договориться о встрече',
  fields: [
    {
      type: 'input',
      name: 'contactName',
      inputType: 'name',
      placeholder: 'Имя'
    },
    {
      type: 'input',
      name: 'contactPhone',
      inputType: 'tel',
      placeholder: '+7 (999) 999-99-99'
    },
    {
      type: 'input',
      name: 'contactMail',
      inputType: 'Mail',
      // label: 'Телефон',
      placeholder: 'example@mail.ru'
    },
    {
      type: 'radio-inline',
      name: 'cleaningDetail',
      options: [
        { value: '#', label: 'Позвонить (в течении 5 мин)', checked: true },
        { value: '#', label: 'Whatsapp' },
        { value: '#', label: 'Telegram' }
      ]
    }
  ],
  footerHtml: `
    <div id="popup__footer_help-text" class="popup__footer_help-text">
      Нажимая на кнопку «Оставить заявку» вы соглашаетесь <br> с <a href="#" class="popup__footer_help-link">Политикой конфиденциальности</a> и соглашаетесь <br> на <a href="#" class="popup__footer_help-link">Обработку персональный данных</a>.
    </div>
  `,
   nextButtonText: 'Оставить заявку'
};

export const finalSteps = [
  finalStep,    // с инпутами и радиокнопками
  thankYouStep  // с благодарностью
];