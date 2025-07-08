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