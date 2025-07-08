export const dryCleaningSteps = [
  {
    stepTitle: 'шаг 2',
    title: 'Что нужно почистить?',
    fields: [
      {
        type: 'radio',
        name: 'variables',
        options: [
          { value: 'sofa', label: 'Диван', rightText: 'от 1800 ₽', checked: true },
          { value: 'armchair', label: 'Кресло', rightText: 'от 500 ₽' },
          { value: 'chair', label: 'Стул', rightText: 'от 500 ₽' },
          { value: 'carpet', label: 'Ковер', rightText: 'от 500 ₽' },
          { value: 'curtains', label: 'Шторы/тюль', rightText: 'от 100 ₽' },
          { value: 'mattress', label: 'Матрас', rightText: 'от 1000 ₽' },
          { value: 'pillow', label: 'Подушки', rightText: 'от ??? ₽' }
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
    stepTitle: 'шаг 4 из 6',
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
    stepTitle: 'шаг 5 из 6',
    title: 'Размер подушек',
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