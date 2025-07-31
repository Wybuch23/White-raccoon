export const dryCleaningSteps = [
  {
    stepTitle: 'шаг 2',
    title: 'Что нужно почистить?',
    fields: [
      {
        type: 'radio',
        name: 'variables',
        options: [
          { value: 'sofa', label: 'Диван', price: 1800, rightText: 'от 1800 ₽', checked: true },
          { value: 'armchair', label: 'Кресло', price: 500, rightText: 'от 500 ₽' },
          { value: 'chair', label: 'Стул', price: 500, rightText: 'от 500 ₽' },
          { value: 'carpet', label: 'Ковер', rate: 500, price: 500, rightText: 'от 500 ₽' },
          { value: 'curtains', label: 'Шторы/тюль', rate: 100, price: 100, rightText: 'от 100 ₽' },
          { value: 'mattress', label: 'Матрас', price: 1000, rightText: 'от 1000 ₽' },
          { value: 'pillow', label: 'Подушки', price: 300, rightText: 'от 300 ₽' }
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
          { value: '2', label: '2-местный', price: 0, duration: 100, rightText: '1800 ₽/шт', checked: true },
          { value: '3', label: '3-местный', price: 900, duration: 120, rightText: '2700 ₽/шт' },
          { value: '4', label: '4-местный', price: 1800, duration: 140, rightText: '3600 ₽/шт' },
          { value: 'angle_3', label: 'Угловой стандартный (3 посадочных места)', duration: 120, price: 1200, rightText: '3000 ₽/шт' },
          { value: 'angle_4', label: 'Угловой большой (4 и более посадочных мест)', duration: 140, price: 2600, rightText: '4400 ₽/шт' }
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
          { value: 'no', label: 'Не раздвижной', price: 0, duration: 0, rightText: '-', checked: true },
          { value: 'yes', label: 'Раздвижной', price: 900, duration: 20, rightText: '900 ₽/шт' }
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
          { value: 'none', label: 'Без подушек', price: 0, duration: 0, rightText: '—', checked: true },
          { value: '1', label: '1', price: 300, duration: 5, rightText: 'от 300 ₽/шт' },
          { value: '2', label: '2', price: 600, duration: 10, rightText: 'от 600 ₽/шт' },
          { value: '3', label: '3', price: 900, duration: 15, rightText: 'от 900 ₽/шт' },
          { value: '4', label: '4', price: 1200, duration: 20, rightText: 'от 1200 ₽/шт' }
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
          { value: 'small', label: 'Маленькие', priceMultiplier: 1, rightText: '300 ₽/шт', checked: true },
          { value: 'large', label: 'Большие', priceMultiplier: 1.6667, rightText: '500 ₽/шт' }
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
          { value: 'standart', label: 'Стандартное', price: 700, duration: 40, rightText: '1200 ₽/шт', checked: true },
          { value: 'pull-out', label: 'Раздвижное', price: 1000, duration: 50, rightText: '1500 ₽/шт' },
          { value: 'office', label: 'Офисное', price: 0, duration: 30, rightText: '500 ₽/шт' }
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
          { value: 'soft', label: 'С мягкой спинкой', price: 100, duration: 30, rightText: '600 ₽/шт', checked: true },
          { value: 'office', label: 'Офисный', price: 200, duration: 30, rightText: '700 ₽/шт' },
          { value: 'pouf', label: 'Пуф', price: 0, duration: 40, rightText: '500 ₽/шт' }
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
          { value: 'low', label: 'Низкий ворс', price: -500, priceMultiplier: 1, rightText: '500 ₽/м²', checked: true },
          { value: 'medium', label: 'Средний ворс', priceMultiplier: 1.3, rightText: '650 ₽/м²' },
          { value: 'tall', label: 'Высокий ворс', priceMultiplier: 1.4, rightText: '700 ₽/м²' }
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
          { value: 'children', label: 'Детский', price: 0, duration: 40, rightText: '1000 ₽/шт', checked: true },
          { value: '1_place', label: 'Односпальный', price: 1000, duration: 50, rightText: '2000 ₽/шт' },
          { value: '1.5_place', label: 'Полутороспальный', price: 1500, duration: 80, rightText: '2500 ₽/шт' },
          { value: '2_place', label: 'Двуспальный', price: 2000, duration: 120, rightText: '3000 ₽/шт' }
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
          { value: '1', label: '1', price: 0, rightText: 'от 300 ₽/шт', checked: true },
          { value: '2', label: '2', price: 300, rightText: 'от 600 ₽/шт' },
          { value: '3', label: '3', price: 600, rightText: 'от 900 ₽/шт' },
          { value: '4', label: '4+', price: 900, rightText: 'от 1200 ₽/шт' }
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
          { value: 'small', label: 'Маленькие', priceMultiplier: 1, rightText: '300 ₽/шт', checked: true },
          { value: 'large', label: 'Большие', priceMultiplier: 1.6667, rightText: '500 ₽/шт' }
        ]
      }
    ]
  }
];
dryCleaningStepsPillow.branchName = 'dryCleaningPillow';