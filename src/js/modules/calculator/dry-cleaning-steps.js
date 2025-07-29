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
          { value: 'carpet', label: 'Ковер', price: 500, rightText: 'от 500 ₽' },
          { value: 'curtains', label: 'Шторы/тюль', price: 100, rightText: 'от 100 ₽' },
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
          { value: '2', label: '2-местный', price: 0, rightText: '1800 ₽/шт', checked: true },
          { value: '3', label: '3-местный', price: 900, rightText: '2700 ₽/шт' },
          { value: '4', label: '4-местный', price: 1800, rightText: '3600 ₽/шт' },
          { value: 'angle_3', label: 'Угловой стандартный (3 посадочных места)', price: 1200, rightText: '3000 ₽/шт' },
          { value: 'angle_4', label: 'Угловой большой (4 и более посадочных мест)', price: 2600, rightText: '4400 ₽/шт' }
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
        name: 'sofaExtension',
        options: [
          { value: 'no', label: 'Не раздвижной', price: 0, rightText: '-', checked: true },
          { value: 'yes', label: 'Раздвижной', price: 900, rightText: '900 ₽/шт' }
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
          { value: 'none', label: 'Без подушек', price: 0, rightText: '—', checked: true },
          { value: '1', label: '1', price: 300, rightText: 'от 300 ₽/шт' },
          { value: '2', label: '2', price: 600, rightText: 'от 600 ₽/шт' },
          { value: '3', label: '3', price: 900, rightText: 'от 900 ₽/шт' },
          { value: '4', label: '4+', price: 1200, rightText: 'от 1200 ₽/шт' }
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
          { value: 'small', label: 'Маленькие', priceMultiplier: 1, rightText: 'от 300 ₽/шт', checked: true },
          { value: 'large', label: 'Большие', priceMultiplier: 1.6667, rightText: 'от 500 ₽/шт' }
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
        name: 'size',
        options: [
          { value: 'light', label: 'Стандартное', rightText: '1200 ₽/шт', checked: true },
          { value: 'hard', label: 'Раздвижное', rightText: '1500 ₽/шт' },
          { value: 'hard', label: 'Офисное', rightText: '500 ₽/шт' }
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
        name: 'size',
        options: [
          { value: 'light', label: 'С мягкой спинкой', rightText: '600 ₽/шт', checked: true },
          { value: 'hard', label: 'Офисный', rightText: '700 ₽/шт' },
          { value: 'hard', label: 'Пуф', rightText: '500 ₽/шт' }
        ]
      }
    ]
  }
];
dryCleaningStepsChair.branchName = 'dryCleaningChair';

export const dryCleaningStepsCarpet = [
  {
    stepTitle: 'Шаг 3 из 4',
    title: 'Длина ворса',
    fields: [
      {
        type: 'radio',
        name: 'size',
        options: [
          { value: 'light', label: 'Низкий ворс', rightText: '500 ₽/м²', checked: true },
          { value: 'hard', label: 'Средний ворс', rightText: '650 ₽/м²' },
          { value: 'hard', label: 'Высокий ворс', rightText: '700 ₽/м²' }
        ]
      }
    ]
  }
  // Можешь добавить еще шаги
];
dryCleaningStepsCarpet.branchName = 'dryCleaningCarpet';

export const dryCleaningStepsCurtains = [
  {
    stepTitle: 'Шаг 3 из 4',
    title: 'Площадь штор с тюлью',
    fields: [
      {
        type: 'radio',
        name: 'size',
        options: [
          { value: 'light', label: '<4м2', rightText: '400 ₽/шт', checked: true },
          { value: 'hard', label: '4-8м2', rightText: '800 ₽/шт' },
          { value: 'hard', label: '8-16м2', rightText: '1600 ₽/шт' },
          { value: 'hard', label: '>16м2', rightText: '3200 ₽/шт' }
        ]
      }
    ]
  }
  // Можешь добавить еще шаги
];
dryCleaningStepsCurtains.branchName = 'dryCleaningCurtains';

export const dryCleaningStepsMattress = [
  {
    stepTitle: 'Шаг 3 из 4',
    title: 'Размер матраса',
    fields: [
      {
        type: 'radio',
        name: 'size',
        options: [
          { value: 'light', label: 'Детский', rightText: '1000 ₽/шт', checked: true },
          { value: 'hard', label: 'Односпальный', rightText: '2000 ₽/шт' },
          { value: 'hard', label: 'Полутороспальный', rightText: '2500 ₽/шт' },
          { value: 'hard', label: 'Двуспальный', rightText: '3000 ₽/шт' }
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
    stepTitle: 'Шаг 4 из 5',
    title: 'Размер подушек',
    fields: [
      {
        type: 'radio',
        name: 'size',
        options: [
          { value: 'light', label: 'Большой', rightText: '500 ₽/шт', checked: true },
          { value: 'hard', label: 'Маленький', rightText: '300 ₽/шт' }
        ]
      }
    ]
  }
];
dryCleaningStepsPillow.branchName = 'dryCleaningPillow';