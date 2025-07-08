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