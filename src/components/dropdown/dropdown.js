function initDropdown({ selector }) {
  const dSelector = document.querySelector(selector);
  const dDropdown = dSelector.querySelector('.form__dropdown');
  const dInput = dSelector.querySelector('.form__dropdown-input');
  const dResult = dSelector.querySelector('.form__dropdown-result');
  const dArrow = dSelector.querySelector('.form__dropdown-arrow');
  const dBlock = dSelector.querySelector('.form__dropdown-block');
  const dCounters = dSelector.querySelectorAll('.form__dropdown-counter span');
  const dCounterBtns = dSelector.querySelectorAll('.form__dropdown-counter button');
  const dMinus = dSelector.querySelectorAll('[data-dropdown-minus]');
  const dClear = dSelector.querySelector('[data-function="clear"]');
  const dApply = dSelector.querySelector('[data-function="apply"]');
  let dropdownTotalResult = 0;

  // функция открытия/закрытия dropdown
  function toggleDropdown() {
    dDropdown.classList.toggle('form__dropdown_active');
    dBlock.classList.toggle('form__dropdown-block_active');
    dArrow.classList.toggle('active');

    if (dArrow.classList.contains('active')) {
      dArrow.textContent = 'keyboard_arrow_up';
    } else {
      dArrow.textContent = 'keyboard_arrow_down';
    }
  }

  // сброс значений dropdown
  function clearDropdown() {
    dropdownTotalResult = 0;
    dResult.textContent = 'Сколько гостей';
    dInput.value = dropdownTotalResult;
    dClear.classList.add('hidden');

    dMinus.forEach(elem => {
      elem.disabled = true;
    });

    dCounters.forEach(elem => {
      elem.textContent = 0;
    });
  }

  // изменение кол-ва гостей
  function changeQuantity(e) {
    let countElem;
    let btnMinus;
    dClear.classList.remove('hidden');

    if (e.target.textContent === '+') {
      countElem = e.target.previousElementSibling;
      btnMinus = countElem.previousElementSibling;
      countElem.textContent = +countElem.textContent + 1;
      dropdownTotalResult += 1;
      btnMinus.disabled = false;
    } else {
      countElem = e.target.nextElementSibling;
      countElem.textContent = +countElem.textContent - 1;
      dropdownTotalResult -= 1;

      if (+countElem.textContent === 0) {
        e.target.disabled = true;
      }
    }

    if (dropdownTotalResult === 1) {
      dResult.textContent = `${dropdownTotalResult} гость`;
    } else if (dropdownTotalResult > 1 && dropdownTotalResult < 5) {
      dResult.textContent = `${dropdownTotalResult} гостя`;
    } else if (dropdownTotalResult === 0) {
      clearDropdown();
    } else {
      dResult.textContent = `${dropdownTotalResult} гостей`;
    }

    dInput.value = dropdownTotalResult;
  }

  // обработчики событий
  dDropdown.addEventListener('click', toggleDropdown);
  dApply.addEventListener('click', toggleDropdown);
  dClear.addEventListener('click', clearDropdown);
  dInput.addEventListener('focus', toggleDropdown);
  dCounterBtns.forEach(elem => {
    elem.addEventListener('click', changeQuantity);
  });
}

export default initDropdown;
