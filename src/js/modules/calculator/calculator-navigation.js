export function setupNavigation({ container, state, renderStep, steps }) {
  const btnNext = state.btnNext;
  const btnBack = state.btnBack;

  function getSelectedRadioValue(name) {
    const bodyEl = container.querySelector('#popup__body_content');
    const radios = bodyEl.querySelectorAll(`input[name="${name}"]`);
    for (const radio of radios) {
      if (radio.checked) return radio.value;
    }
    return null;
  }

  btnNext.addEventListener('click', () => {
    const branch = state.currentBranchSteps.branchName;

    if (branch === 'commonSteps') {
      const selected = getSelectedRadioValue('serviceType');
      state.selectedBranch = selected;

      if (selected === 'cleaning') {
        state.currentBranchSteps = [...steps.cleaning, ...steps.final];
        state.currentBranchSteps.branchName = 'cleaning';
      } else if (selected === 'windows') {
        state.currentBranchSteps = [...steps.windowCleaning, ...steps.final];
        state.currentBranchSteps.branchName = 'windows';
      } else if (selected === 'dry_cleaning') {
        state.currentBranchSteps = [...steps.dryCleaning, ...steps.final];
        state.currentBranchSteps.branchName = 'dry_cleaning';
      } else {
        alert('Выберите услугу');
        return;
      }

      state.currentStep = 0;
      renderStep(state);
      return;
    }

    // Подветка: уборка
    if (branch === 'cleaning') {
      const type = getSelectedRadioValue('areaType');

      if (type === 'living') {
        state.currentBranchSteps = [...steps.cleaningLiving, ...steps.final];
        state.currentBranchSteps.branchName = 'cleaningLiving';
      } else if (type === 'office') {
        state.currentBranchSteps = [...steps.cleaningOffice, ...steps.final];
        state.currentBranchSteps.branchName = 'cleaningOffice';
      } else if (type === 'industrial') {
        state.currentBranchSteps = [...steps.cleaningIndustrial, ...steps.final];
        state.currentBranchSteps.branchName = 'cleaningIndustrial';
      } else {
        alert('Выберите тип помещения');
        return;
      }

      state.currentStep = 0;
      renderStep(state);
      return;
    }

    // Подветка: химчистка
    if (branch === 'dry_cleaning') {
      const type = getSelectedRadioValue('variables');

      const map = {
        sofa: 'dryCleaningSofa',
        armchair: 'dryCleaningArmchair',
        chair: 'dryCleaningChair',
        carpet: 'dryCleaningCarpet',
        curtains: 'dryCleaningCurtains',
        mattress: 'dryCleaningMattress',
        pillow: 'dryCleaningPillow'
      };

      const stepName = map[type];
      if (!stepName) {
        alert('Выберите, что нужно почистить');
        return;
      }

      state.currentBranchSteps = [...steps[stepName], ...steps.final];
      state.currentBranchSteps.branchName = stepName;
      state.currentStep = 0;
      renderStep(state);
      return;
    }

    if (state.currentStep < state.currentBranchSteps.length - 1) {
      state.currentStep++;
      renderStep(state);
    } else {
      alert('Калькулятор завершён');
    }
  });

  btnBack.addEventListener('click', () => {
    if (state.currentStep > 0) {
      state.currentStep--;
      renderStep(state);
      return;
    }

    const branch = state.currentBranchSteps.branchName;

    if ([
      'cleaningLiving',
      'cleaningOffice',
      'cleaningIndustrial'
    ].includes(branch)) {
      state.currentBranchSteps = [...steps.cleaning];
      state.currentBranchSteps.branchName = 'cleaning';
      state.currentStep = 0;
      renderStep(state);
      return;
    }

    if ([
      'dryCleaningSofa',
      'dryCleaningArmchair',
      'dryCleaningChair',
      'dryCleaningCarpet',
      'dryCleaningCurtains',
      'dryCleaningMattress',
      'dryCleaningPillow'
    ].includes(branch)) {
      state.currentBranchSteps = [...steps.dryCleaning];
      state.currentBranchSteps.branchName = 'dry_cleaning';
      state.currentStep = 0;
      renderStep(state);
      return;
    }

    if (['cleaning', 'dry_cleaning', 'windows'].includes(branch)) {
      state.currentBranchSteps = [...steps.common];
      state.currentBranchSteps.branchName = 'commonSteps';
      state.currentStep = 0;
      renderStep(state);
      return;
    }

    if (branch === 'commonSteps') {
      container.classList.remove('active');
      document.getElementById('popup')?.classList.add('active');
    }
  });
}
