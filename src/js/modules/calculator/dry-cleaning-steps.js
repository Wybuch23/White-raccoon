export const dryCleaningSteps = [
  {
    stepTitle: 'шаг 2',
    title: 'Что нужно почистить?',
    fields: [
      {
        type: 'radio',
        name: 'variables',
        options: [
          { value: 'sofa', label: 'Диван', wayname: 'дивана', price: 1800, rightText: 'от 1800 ₽', checked: true },
          { value: 'armchair', label: 'Кресло', wayname: 'кресла', price: 500, rightText: 'от 500 ₽' },
          { value: 'chair', label: 'Стул', wayname: 'стула', price: 500, rightText: 'от 500 ₽' },
          { value: 'carpet', label: 'Ковер', wayname: 'ковра', rate: 500, price: 500, rightText: 'от 500 ₽' },
          { value: 'curtains', label: 'Шторы/тюль', wayname: 'штор/тюли', rate: 100, price: 100, rightText: 'от 100 ₽' },
          { value: 'mattress', label: 'Матрас', wayname: 'матраса', price: 1000, rightText: 'от 1000 ₽' },
          { value: 'pillow', label: 'Подушки', wayname: 'подушек', price: 300, rightText: 'от 300 ₽' }
        ]
      }
    ]
  },
];
dryCleaningSteps.branchName = 'dry_cleaning';

export const dryCleaningStepsSofa = [
  {
    stepTitle: 'шаг 3 из 6',
    title: 'Размер дивана',
    fields: [
      {
        type: 'radio',
        name: 'sofaSize',
        options: [
          { value: '2', label: '2-местный', wayname: '2-местного', price: 0, duration: 100, rightText: '1800 ₽/шт', checked: true },
          { value: '3', label: '3-местный', wayname: '3-местного', price: 900, duration: 120, rightText: '2700 ₽/шт' },
          { value: '4', label: '4-местный', wayname: '4-местного', price: 1800, duration: 140, rightText: '3600 ₽/шт' },
          { value: 'angle_3', label: 'Угловой стандартный (3 посадочных места)', wayname: 'стандартного углового', duration: 120, price: 1200, rightText: '3000 ₽/шт' },
          { value: 'angle_4', label: 'Угловой большой (4 и более посадочных мест)', wayname: 'большого углового', duration: 140, price: 2600, rightText: '4400 ₽/шт' }
        ]
      }
    ]
  },
  {
    stepTitle: 'шаг 4 из 6',
    title: 'Раздвижной',
    fields: [
      {
        type: 'radio',
        name: 'sofaPull-out',
        options: [
          { value: 'no', label: 'Не раздвижной', wayname: '', price: 0, duration: 0, rightText: '-', checked: true },
          { value: 'yes', label: 'Раздвижной', wayname: 'раздвижного', price: 900, duration: 20, rightText: '900 ₽/шт' }
        ]
      }
    ]
  },
  {
    stepTitle: 'шаг 5 из 6',
    title: 'Количество подушек',
    fields: [
      {
        type: 'radio',
        name: 'pillowCount',
        options: [
          { value: 'none', label: 'Без подушек', wayname: '', price: 0, duration: 0, rightText: '—', checked: true },
          { value: '1', label: '1', wayname: 'с 1 подушкой', price: 300, duration: 5, rightText: 'от 300 ₽/шт' },
          { value: '2', label: '2', wayname: 'с 2 подушками', price: 600, duration: 10, rightText: 'от 600 ₽/шт' },
          { value: '3', label: '3', wayname: 'с 3 подушками', price: 900, duration: 15, rightText: 'от 900 ₽/шт' },
          { value: '4', label: '4', wayname: 'с 4 подушками', price: 1200, duration: 20, rightText: 'от 1200 ₽/шт' }
        ]
      }
    ]
  },
  {
    stepTitle: 'шаг 6 из 7',
    title: 'Размер подушек',
    fields: [
      {
        type: 'radio',
        name: 'pillowSize',
        options: [
          { value: 'small', label: 'Маленькие', wayname: 'маленького размера', priceMultiplier: 1, rightText: '300 ₽/шт', checked: true },
          { value: 'large', label: 'Большие', wayname: 'большого размера', priceMultiplier: 1.5, rightText: '500 ₽/шт' }
        ]
      }
    ]
  }
];
dryCleaningStepsSofa.branchName = 'dryCleaningSofa';

export const dryCleaningStepsArmchair = [
  {
    stepTitle: 'Шаг 3 из 4',
    title: 'Вид кресла',
    fields: [
      {
        type: 'radio',
        name: 'armchairSize',
        options: [
          { value: 'standart', label: 'Стандартное', wayname: 'стандартного', price: 700, duration: 40, rightText: '1200 ₽/шт', checked: true },
          { value: 'pull-out', label: 'Раздвижное', wayname: 'раздвижного', price: 1000, duration: 50, rightText: '1500 ₽/шт' },
          { value: 'office', label: 'Офисное', wayname: 'офисного', price: 0, duration: 30, rightText: '500 ₽/шт' }
        ]
      }
    ]
  }
];
dryCleaningStepsArmchair.branchName = 'dryCleaningArmchair';

export const dryCleaningStepsChair = [
  {
    stepTitle: 'Шаг 3 из 4',
    title: 'Вид стула',
    fields: [
      {
        type: 'radio',
        name: 'chairSize',
        options: [
          { value: 'soft', label: 'С мягкой спинкой', wayname: 'с мягкой спинкой', price: 100, duration: 30, rightText: '600 ₽/шт', checked: true },
          { value: 'office', label: 'Офисный', wayname: 'офисного', price: 200, duration: 30, rightText: '700 ₽/шт' },
          { value: 'pouf', label: 'Пуф', wayname: '"пуф"', price: 0, duration: 40, rightText: '500 ₽/шт' }
        ]
      }
    ]
  }
];
dryCleaningStepsChair.branchName = 'dryCleaningChair';

export const dryCleaningStepsCarpet = [
  {
    stepTitle: 'Шаг 3 из 5',
    title: 'Общая площадь ковра',
    fields: [
      {
        type: 'input',
        name: 'area',
        inputType: 'number',
        label: 'м²',
        placeholder: 'Введите значение',
        helperText: ''
      }
    ]
  },
  {
    stepTitle: 'Шаг 4 из 5',
    title: 'Длина ворса',
    fields: [
      {
        type: 'radio',
        name: 'carpetSize',
        options: [
          { value: 'low', label: 'Низкий ворс', wayname: 'с низким ворсом', price: -500, priceMultiplier: 1, rightText: '500 ₽/м²', checked: true },
          { value: 'medium', label: 'Средний ворс', wayname: 'с средним ворсом', priceMultiplier: 1.3, rightText: '650 ₽/м²' },
          { value: 'tall', label: 'Высокий ворс', wayname: 'с высоким ворсом', priceMultiplier: 1.4, rightText: '700 ₽/м²' }
        ]
      }
    ]
  }
];
dryCleaningStepsCarpet.branchName = 'dryCleaningCarpet';

export const dryCleaningStepsCurtains = [
  {
    stepTitle: 'Шаг 3 из 4',
    title: 'Площадь штор с тюлью',
    fields: [
      {
        type: 'input',
        name: 'area',
        inputType: 'number',
        label: 'м²',
        placeholder: 'Введите значение',
        helperText: '',
      }
    ]
  }

];
dryCleaningStepsCurtains.branchName = 'dryCleaningCurtains';

export const dryCleaningStepsMattress = [
  {
    stepTitle: 'Шаг 3 из 4',
    title: 'Размер матраса',
    fields: [
      {
        type: 'radio',
        name: 'mattressSize',
        options: [
          { value: 'children', label: 'Детский', wayname: 'детского', price: 0, duration: 40, rightText: '1000 ₽/шт', checked: true },
          { value: '1_place', label: 'Односпальный', wayname: 'односпального', price: 1000, duration: 50, rightText: '2000 ₽/шт' },
          { value: '1.5_place', label: 'Полутороспальный', wayname: 'полутороспального', price: 1500, duration: 80, rightText: '2500 ₽/шт' },
          { value: '2_place', label: 'Двуспальный', wayname: 'двуспального', price: 2000, duration: 120, rightText: '3000 ₽/шт' }
        ]
      }
    ]
  }
];
dryCleaningStepsMattress.branchName = 'dryCleaningMattress';

export const dryCleaningStepsPillow = [
  {
    stepTitle: 'шаг 3 из 5',
    title: 'Количество подушек',
    fields: [
      {
        type: 'radio',
        name: 'pillowCount',
        options: [
          { value: '1', label: '1', wayname: '(кол-во: 1)', price: 300, duration: 5, rightText: 'от 300 ₽/шт', checked: true },
          { value: '2', label: '2', wayname: '(кол-во: 2)', price: 600, duration: 10, rightText: 'от 600 ₽/шт' },
          { value: '3', label: '3', wayname: '(кол-во: 3)', price: 900, duration: 15, rightText: 'от 900 ₽/шт' },
          { value: '4', label: '4', wayname: '(кол-во: 4)', price: 1200, duration: 20, rightText: 'от 1200 ₽/шт' }
        ]
      }
    ]
  },
  {
    stepTitle: 'шаг 6 из 7',
    title: 'Размер подушек',
    fields: [
      { 
        type: 'radio',
        name: 'pillowSize',
        options: [
          { value: 'small', label: 'Маленькие', wayname: 'маленького размера', priceMultiplier: 1, rightText: '300 ₽/шт', checked: true },
          { value: 'large', label: 'Большие', wayname: 'большого размера', priceMultiplier: 1.6667, rightText: '500 ₽/шт' }
        ]
      }
    ]
  }
];
dryCleaningStepsPillow.branchName = 'dryCleaningPillow';