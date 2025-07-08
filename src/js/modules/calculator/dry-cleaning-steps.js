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