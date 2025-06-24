export const commonSteps = [
  {
    stepTitle: 'Шаг 1',
    title: 'Услуга',
    fields: [
      {
        type: 'radio',
        name: 'serviceType',
        options: [
          { value: 'cleaning', label: 'Уборка помещений', rightText: '—', checked: true },
          { value: 'windows', label: 'Мойка окон', rightText: '—'},
          { value: 'dry_cleaning', label: 'Химчистка', rightText: '—' }
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

// Ветка cleaning (после выбора уборки)
export const cleaningSteps = [
  {
    stepTitle: 'Шаг 2 из 7',
    title: 'Вид помещения',
    fields: [
      {
        type: 'radio',
        name: 'areaType',
        options: [
          { value: 'daily', label: 'Жилое помещение', rightText: '—', checked: true },
          { value: 'general', label: 'Офис/малая коммерция', rightText: '—' },
          { value: 'after_repair', label: 'Производственное/складское помещение', rightText: '—' }
        ]
      }
    ]
  },
  {
    stepTitle: 'Шаг 3 из 7',
    title: 'Вид уборки',
    fields: [
      {
        type: 'radio',
        name: 'cleaningType',
        options: [
          { value: 'daily', label: 'Повседневная уборка', rightText: '90 ₽/м<sup>2</sup>', checked: true },
          { value: 'general', label: 'Генеральная уборка', rightText: '130 ₽/м<sup>2</sup>' },
          { value: 'after_repair', label: 'Уборка после ремонта', rightText: '150 ₽/м<sup>2</sup>' },
          { value: 'daily', label: 'Уборка до/после жильцов', rightText: '120 ₽/м<sup>2</sup>' },
          { value: 'general', label: 'Уборка после праздника', rightText: '120 ₽/м<sup>2</sup>' }
        ]
      }
    ]
  },
  {
    stepTitle: 'Шаг 4 из 7',
    title: 'Количество санузлов',
    fields: [
      {
        type: 'radio',
        name: 'cleaningType',
        options: [
          { value: 'bathroom-none', label: 'Без санузла', rightText: '—', checked: true },
          { value: 'bathroom-1', label: '1', rightText: '1200 ₽/шт' },
          { value: 'bathroom-2', label: '2', rightText: '1100 ₽/шт' },
          { value: 'bathroom-3', label: '3', rightText: '1000 ₽/шт' },
          { value: 'bathroom-4', label: '4', rightText: '900 ₽/шт' },
          { value: 'bathroom-5', label: '5+', rightText: '800 ₽/шт' }
        ]
      }
    ]
  },
  {
    stepTitle: 'Шаг 5 из 7',
    title: 'Общая площадь уборки',
    fields: [
      {
        type: 'input',
        name: 'area',
        inputType: 'number',
        label: 'M<sup>2</sup>',
        placeholder: 'Введите значение',
        helperText: '90 ₽/м<sup>2</sup>'
      }
    ]
  },
  {
    stepTitle: 'Шаг 6 из 7',
    title: 'Дополнительные услуги',
    fields: [
      {
        type: 'checkbox',
        name: 'extraServices',
        options: [
          { value: 'carpet_cleaning', label: 'Мытье окон', rightText: '450 ₽/м<sup>2</sup>', checked: false },
          { value: 'window_washing', label: 'Мытье холодильника', rightText: '800 ₽/шт', checked: false },
          { value: 'window_washing', label: 'Мытье духового шкафа', rightText: '800 ₽/шт', checked: false },
          { value: 'window_washing', label: 'Мытье микроволновой печи', rightText: '500 ₽/шт', checked: false },
          { value: 'window_washing', label: 'Мытье вытяжки', rightText: '700 ₽/шт', checked: false },
          { value: 'window_washing', label: 'Мытье кухонной плиты', rightText: '400 ₽/шт', checked: false },
          { value: 'window_washing', label: 'Вынос мусора (большой объем)', rightText: '1000 ₽/шт', checked: false }
          
        ]
      }
    ]
  }
];

export const windowCleaningSteps = [
  {
    stepTitle: 'шаг 2 из 4',
    title: 'Общая площадь окон',
    fields: [
      {
        type: 'input',
        name: 'area',
        inputType: 'number',
        label: 'M<sup>2</sup>',
        placeholder: 'Введите значение',
        helperText: 'от 450 ₽/м<sup>2</sup>'
      }
    ]
  },
  {
    stepTitle: 'шаг 3 из 4',
    title: 'Тяжесть загрязнений',
    fields: [
      {
        type: 'radio',
        name: 'urgency',
        options: [
          { value: 'light', label: 'Легкие (пыль, грязь)', checked: true },
          { value: 'hard', label: 'Тяжелые (следы от скотча, после ремонта)' }
        ]
      }
    ]
  }
];

export const dryCleaningSteps = [
  {
    stepTitle: 'шаг 2 из 4',
    title: 'Что нужно почистить?',
    fields: [
      {
        type: 'radio',
        name: 'variables',
        options: [
          { value: 'light', label: 'Диван', rightText: 'от 1800 ₽', checked: true },
          { value: 'hard', label: 'Кресло', rightText: 'от 500 ₽' },
          { value: 'light', label: 'Стул', rightText: 'от 500 ₽' },
          { value: 'hard', label: 'Ковер', rightText: 'от 500 ₽' },
          { value: 'light', label: 'Шторы/тюль', rightText: 'от 100 ₽' },
          { value: 'hard', label: 'Матрас', rightText: 'от 1000 ₽' },
          { value: 'hard', label: 'Подушки', rightText: 'от ??? ₽' }
        ]
      }
    ]
  },
  {
    stepTitle: 'шаг 3 из 4',
    title: 'Размер дивана',
    fields: [
      {
        type: 'radio',
        name: 'size',
        options: [
          { value: 'light', label: '2-местный', rightText: '1800 ₽/шт', checked: true },
          { value: 'hard', label: '3-местный', rightText: '2700 ₽/шт' },
          { value: 'hard', label: '4-местный', rightText: '3600 ₽/шт' },
          { value: 'light', label: 'Угловой стандартный (3 посадочных места)', rightText: '3000 ₽/шт' },
          { value: 'hard', label: 'Угловой большой (4 и более посадочных мест)', rightText: '4400 ₽/шт' }
        ]
      }
    ]
  },
  {
    stepTitle: 'шаг 3 из 4',
    title: 'Количество подушек',
    fields: [
      {
        type: 'radio',
        name: 'size',
        options: [
          { value: 'light', label: 'Без подушек', rightText: '—', checked: true },
          { value: 'hard', label: '1-2', rightText: 'от ??? ₽/шт' },
          { value: 'hard', label: '3-4', rightText: 'от ??? ₽/шт' },
          { value: 'light', label: '4-6', rightText: 'от ??? ₽/шт' },
          { value: 'hard', label: '6-8', rightText: 'от ??? ₽/шт' },
          { value: 'hard', label: '8+', rightText: 'от ??? ₽/шт' }
        ]
      }
    ]
  },
  {
    stepTitle: 'шаг 3 из 4',
    title: 'Количество подушек',
    fields: [
      {
        type: 'radio',
        name: 'size',
        options: [
          { value: 'light', label: 'Маленькие', rightText: 'от ??? ₽/шт', checked: true },
          { value: 'hard', label: 'Большие', rightText: 'от ??? ₽/шт' }
        ]
      }
    ]
  }
];