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
          { value: 'living', label: 'Жилое помещение', wayname: 'жилого помещения', price: 90, rightText: '—', checked: true },
          { value: 'office', label: 'Офис/малая коммерция', wayname: 'офиса', price: 90, rightText: '—' },
          { value: 'industrial', label: 'Производственное/складское помещение', wayname: 'производственного помещения', price: 140, rightText: '—' }
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
          { value: 'daily', label: 'Повседневная уборка', wayname: 'повседневная', rate: 90, price: 0, rightText: '90 ₽/м²', checked: true },
          { value: 'general', label: 'Генеральная уборка', wayname: 'генеральная', rate: 130, price: 40,rightText: '130 ₽/м²' },
          { value: 'after_repair', label: 'Уборка после ремонта', wayname: 'после ремонта', rate: 150, price: 60,rightText: '150 ₽/м²' },
          { value: 'daily2', label: 'Уборка до/после жильцов', wayname: 'до/после жильцов', rate: 120, price: 30,rightText: '120 ₽/м²' },
          { value: 'general2', label: 'Уборка после праздника', wayname: 'после праздника', rate: 120, price: 30,rightText: '120 ₽/м²' }
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
          { value: 'none', label: 'Без санузла', wayname: 'без санузла', price: 0, rightText: '—', checked: true },
          { value: '1', label: '1', wayname: 'с 1 санузлом', price: 1200, rightText: '1200 ₽/шт' },
          { value: '2', label: '2', wayname: 'с 2 санузлами', price: 2200, rightText: '1100 ₽/шт' },
          { value: '3', label: '3', wayname: 'с 3 санузлами', price: 3000, rightText: '1000 ₽/шт' },
          { value: '4', label: '4', wayname: 'с 4 санузлами', price: 3600, rightText: '900 ₽/шт' },
          { value: '5', label: '5+', wayname: 'с 5 санузлами', price: 4000, rightText: '800 ₽/шт' }
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
        helperText: ''
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
          { value: 'fridge', label: 'Мытье холодильника', wayname: 'Мытье холодильника', price: 800, duration: 20, rightText: '800 ₽/шт' },
          { value: 'oven', label: 'Мытье духового шкафа', wayname: 'Мытье духового шкафа', price: 800, duration: 20, rightText: '800 ₽/шт' },
          { value: 'microwave', label: 'Мытье микроволновки', wayname: 'Мытье микроволновки', price: 500, duration: 10, rightText: '500 ₽/шт' },
          { value: 'hood', label: 'Мытье вытяжки', wayname: 'Мытье вытяжки', price: 700, duration: 15, rightText: '700 ₽/шт' },
          { value: 'stove', label: 'Мытье плиты', wayname: 'Мытье плиты', price: 400, duration: 10, rightText: '400 ₽/шт' },
          { value: 'trash_removal', label: 'Вынос мусора', wayname: 'Вынос мусора', price: 1000, duration: 0, rightText: '1000 ₽/шт' }
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
          { value: 'daily', label: 'Повседневная уборка', wayname: 'повседневная', rate: 90, price: 0, rightText: '90 ₽/м²', checked: true },
          { value: 'general', label: 'Генеральная уборка', wayname: 'генеральная', rate: 130, price: 40, rightText: '130 ₽/м²' },
          { value: 'after_repair', label: 'Уборка после ремонта', wayname: 'после ремонта', rate: 150, price: 60, rightText: '150 ₽/м²' },
          { value: 'general2', label: 'Уборка после праздника', wayname: 'после праздника', rate: 120, price: 40, rightText: '120 ₽/м²' }
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
          { value: 'none', label: 'Без санузла', wayname: 'без санузла', price: 0, rightText: '—', checked: true },
          { value: '1', label: '1', wayname: 'с 1 санузлом', price: 1200, rightText: '1200 ₽/шт' },
          { value: '2', label: '2', wayname: 'с 2 санузлами', price: 2200, rightText: '1100 ₽/шт' },
          { value: '3', label: '3', wayname: 'с 3 санузлами', price: 3000, rightText: '1000 ₽/шт' },
          { value: '4', label: '4', wayname: 'с 4 санузлами', price: 3600, rightText: '900 ₽/шт' },
          { value: '5', label: '5+', wayname: 'с 5 санузлами', price: 4000, rightText: '800 ₽/шт' }
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
        helperText: ''
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
          { value: 'fridge', label: 'Мытье холодильника', wayname: 'Мытье холодильника', price: 800, duration: 20, rightText: '800 ₽/шт' },
          { value: 'oven', label: 'Мытье духового шкафа', wayname: 'Мытье духового шкафа', price: 800, duration: 20, rightText: '800 ₽/шт' },
          { value: 'microwave', label: 'Мытье микроволновки', wayname: 'Мытье микроволновки', price: 500, duration: 10, rightText: '500 ₽/шт' },
          { value: 'hood', label: 'Мытье вытяжки', wayname: 'Мытье вытяжки', price: 700, duration: 15, rightText: '700 ₽/шт' },
          { value: 'stove', label: 'Мытье плиты', wayname: 'Мытье плиты', price: 400, duration: 10, rightText: '400 ₽/шт' },
          { value: 'trash_removal', label: 'Вынос мусора', wayname: 'Вынос мусора', price: 1000, duration: 0, rightText: '1000 ₽/шт' }
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
          { value: 'general', label: 'Генеральная уборка', wayname: 'генеральная', rate: 160, price: 20, rightText: '160 ₽/м²', checked: true },
          { value: 'after_repair', label: 'Уборка после ремонта', wayname: 'после ремонта', rate: 140, price: 0, rightText: '140 ₽/м²' },
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
          { value: 'none', label: 'Без санузла', wayname: 'без санузла', price: 0, rightText: '—', checked: true },
          { value: '1', label: '1', wayname: 'с 1 санузлом', price: 1200, rightText: '1200 ₽/шт' },
          { value: '2', label: '2', wayname: 'с 2 санузлами', price: 2200, rightText: '1100 ₽/шт' },
          { value: '3', label: '3', wayname: 'с 3 санузлами', price: 3000, rightText: '1000 ₽/шт' },
          { value: '4', label: '4', wayname: 'с 4 санузлами', price: 3600, rightText: '900 ₽/шт' },
          { value: '5', label: '5+', wayname: 'с 5 санузлами', price: 4000, rightText: '800 ₽/шт' }
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
        helperText: ''
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
          { value: 'fridge', label: 'Мытье холодильника', wayname: 'Мытье холодильника', price: 800, duration: 20, rightText: '800 ₽/шт' },
          { value: 'oven', label: 'Мытье духового шкафа', wayname: 'Мытье духового шкафа', price: 800, duration: 20, rightText: '800 ₽/шт' },
          { value: 'microwave', label: 'Мытье микроволновки', wayname: 'Мытье микроволновки', price: 500, duration: 10, rightText: '500 ₽/шт' },
          { value: 'hood', label: 'Мытье вытяжки', wayname: 'Мытье вытяжки', price: 700, duration: 15, rightText: '700 ₽/шт' },
          { value: 'stove', label: 'Мытье плиты', wayname: 'Мытье плиты', price: 400, duration: 10, rightText: '400 ₽/шт' },
          { value: 'trash_removal', label: 'Вынос мусора', wayname: 'Вынос мусора', price: 1000, duration: 0, rightText: '1000 ₽/шт' }
        ]
      }
    ]
  }
];
cleaningStepsIndustrial.branchName = 'cleaningIndustrial';
