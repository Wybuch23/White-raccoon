// cleaning-steps.js

export const cleaningSteps = [
  {
    stepTitle: 'Шаг 2 из 7',
    title: 'Вид помещения',
    fields: [
      {
        type: 'radio',
        name: 'areaType',
        options: [
          { value: 'living', label: 'Жилое помещение', rightText: '—', checked: true },
          { value: 'office', label: 'Офис/малая коммерция', rightText: '—' },
          { value: 'industrial', label: 'Производственное/складское помещение', rightText: '—' }
        ]
      }
    ]
  }
];
cleaningSteps.branchName = 'cleaning';

// Ветка — Жилое помещение
export const cleaningStepsLiving = [
  {
    stepTitle: 'Шаг 3 из 7',
    title: 'Вид уборки',
    fields: [
      {
        type: 'radio',
        name: 'cleaningType',
        options: [
          { value: 'daily', label: 'Повседневная уборка', rightText: '90 ₽/м²', checked: true },
          { value: 'general', label: 'Генеральная уборка', rightText: '130 ₽/м²' },
          { value: 'after_repair', label: 'Уборка после ремонта', rightText: '150 ₽/м²' },
          { value: 'daily2', label: 'Уборка до/после жильцов', rightText: '120 ₽/м²' },
          { value: 'general2', label: 'Уборка после праздника', rightText: '120 ₽/м²' }
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
        name: 'bathroomCount',
        options: [
          { value: 'none', label: 'Без санузла', rightText: '—', checked: true },
          { value: '1', label: '1', rightText: '1200 ₽/шт' },
          { value: '2', label: '2', rightText: '1100 ₽/шт' },
          { value: '3', label: '3', rightText: '1000 ₽/шт' },
          { value: '4', label: '4', rightText: '900 ₽/шт' },
          { value: '5+', label: '5+', rightText: '800 ₽/шт' }
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
        label: 'м²',
        placeholder: 'Введите значение',
        helperText: '90 ₽/м²'
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
          { value: 'window_cleaning', label: 'Мытье окон', rightText: '450 ₽/м²' },
          { value: 'fridge', label: 'Мытье холодильника', rightText: '800 ₽/шт' },
          { value: 'oven', label: 'Мытье духового шкафа', rightText: '800 ₽/шт' },
          { value: 'microwave', label: 'Мытье микроволновки', rightText: '500 ₽/шт' },
          { value: 'hood', label: 'Мытье вытяжки', rightText: '700 ₽/шт' },
          { value: 'stove', label: 'Мытье плиты', rightText: '400 ₽/шт' },
          { value: 'trash_removal', label: 'Вынос мусора', rightText: '1000 ₽/шт' }
        ]
      }
    ]
  }
];
cleaningStepsLiving.branchName = 'cleaningLiving';

// Ветка — Офис/малая коммерция
export const cleaningStepsOffice = [
  {
    stepTitle: 'Шаг 3 из 7',
    title: 'Вид уборки',
    fields: [
      {
        type: 'radio',
        name: 'cleaningType',
        options: [
          { value: 'daily', label: 'Повседневная уборка', rightText: '90 ₽/м²', checked: true },
          { value: 'general', label: 'Генеральная уборка', rightText: '130 ₽/м²' },
          { value: 'after_repair', label: 'Уборка после ремонта', rightText: '150 ₽/м²' },
          { value: 'general2', label: 'Уборка после праздника', rightText: '120 ₽/м²' }
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
        name: 'bathroomCount',
        options: [
          { value: 'none', label: 'Без санузла', rightText: '—', checked: true },
          { value: '1', label: '1', rightText: '1200 ₽/шт' },
          { value: '2', label: '2', rightText: '1100 ₽/шт' },
          { value: '3', label: '3', rightText: '1000 ₽/шт' },
          { value: '4', label: '4', rightText: '900 ₽/шт' },
          { value: '5+', label: '5+', rightText: '800 ₽/шт' }
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
        label: 'м²',
        placeholder: 'Введите значение',
        helperText: '90 ₽/м²'
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
          { value: 'window_cleaning', label: 'Мытье окон', rightText: '450 ₽/м²' },
          { value: 'fridge', label: 'Мытье холодильника', rightText: '800 ₽/шт' },
          { value: 'oven', label: 'Мытье духового шкафа', rightText: '800 ₽/шт' },
          { value: 'microwave', label: 'Мытье микроволновки', rightText: '500 ₽/шт' },
          { value: 'hood', label: 'Мытье вытяжки', rightText: '700 ₽/шт' },
          { value: 'stove', label: 'Мытье плиты', rightText: '400 ₽/шт' },
          { value: 'trash_removal', label: 'Вынос мусора', rightText: '1000 ₽/шт' }
        ]
      }
    ]
  }
];
cleaningStepsOffice.branchName = 'cleaningOffice';

// Ветка — Производственное/складское помещение
export const cleaningStepsIndustrial = [
  {
    stepTitle: 'Шаг 3 из 7',
    title: 'Вид уборки',
    fields: [
      {
        type: 'radio',
        name: 'cleaningType',
        options: [
          { value: 'general', label: 'Генеральная уборка', rightText: '160 ₽/м²' },
          { value: 'after_repair', label: 'Уборка после ремонта', rightText: '140 ₽/м²', checked: true },
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
        name: 'bathroomCount',
        options: [
          { value: 'none', label: 'Без санузла', rightText: '—', checked: true },
          { value: '1', label: '1', rightText: '1200 ₽/шт' },
          { value: '2', label: '2', rightText: '1100 ₽/шт' },
          { value: '3', label: '3', rightText: '1000 ₽/шт' },
          { value: '4', label: '4', rightText: '900 ₽/шт' },
          { value: '5+', label: '5+', rightText: '800 ₽/шт' }
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
        label: 'м²',
        placeholder: 'Введите значение',
        helperText: '90 ₽/м²'
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
          { value: 'window_cleaning', label: 'Мытье окон', rightText: '450 ₽/м²' },
          { value: 'fridge', label: 'Мытье холодильника', rightText: '800 ₽/шт' },
          { value: 'oven', label: 'Мытье духового шкафа', rightText: '800 ₽/шт' },
          { value: 'microwave', label: 'Мытье микроволновки', rightText: '500 ₽/шт' },
          { value: 'hood', label: 'Мытье вытяжки', rightText: '700 ₽/шт' },
          { value: 'stove', label: 'Мытье плиты', rightText: '400 ₽/шт' },
          { value: 'trash_removal', label: 'Вынос мусора', rightText: '1000 ₽/шт' }
        ]
      }
    ]
  }
];
cleaningStepsIndustrial.branchName = 'cleaningIndustrial';
