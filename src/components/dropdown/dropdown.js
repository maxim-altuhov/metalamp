function dropdown() {
  const dropdownInput = document.querySelector('.form__dropdown-input');
  const dropdownSelector = document.querySelector('.form__dropdown');
  const dropdownResult = document.querySelector('.form__dropdown-result');
  const dropdownArrow = document.querySelector('.form__dropdown-arrow');
  const dropdownBlock = document.querySelector('.form__dropdown-block');
  const dropdownCounterBtns = document.querySelectorAll('.form__dropdown-counter button');
  const dropdownCounters = document.querySelectorAll('.form__dropdown-counter span');
  const dropdownMinus = document.querySelectorAll('#dropdown-minus');
  const dropdownClear = document.querySelector('.form__dropdown-clear');
  const dropdownApply = document.querySelector('.form__dropdown-apply');
  let dropdownTotalResult = 0;

  // функция открытия/закрытия dropdown
  function toggleDropdown() {
    dropdownSelector.classList.toggle('form__dropdown_active');
    dropdownBlock.classList.toggle('form__dropdown-block_active');
    dropdownArrow.classList.toggle('active');

    if (dropdownArrow.classList.contains('active')) {
      dropdownArrow.textContent = 'keyboard_arrow_up';
    } else {
      dropdownArrow.textContent = 'keyboard_arrow_down';
    }
  }

  // сброс значений dropdown
  function clearDropdown() {
    dropdownTotalResult = 0;
    dropdownResult.textContent = 'Сколько гостей';
    dropdownInput.value = dropdownTotalResult;
    dropdownClear.classList.add('hidden');

    dropdownMinus.forEach(elem => {
      elem.disabled = true;
    });

    dropdownCounters.forEach(elem => {
      elem.textContent = 0;
    });
  }

  // изменение кол-ва гостей
  function changeQuantity(e) {
    let countElem;
    let btnMinus;
    dropdownClear.classList.remove('hidden');

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
      dropdownResult.textContent = `${dropdownTotalResult} гость`;
    } else if (dropdownTotalResult > 1 && dropdownTotalResult < 5) {
      dropdownResult.textContent = `${dropdownTotalResult} гостя`;
    } else if (dropdownTotalResult === 0) {
      clearDropdown();
    } else {
      dropdownResult.textContent = `${dropdownTotalResult} гостей`;
    }

    dropdownInput.value = dropdownTotalResult;
  }

  // обработчики событий
  dropdownSelector.addEventListener('click', toggleDropdown);
  dropdownApply.addEventListener('click', toggleDropdown);
  dropdownClear.addEventListener('click', clearDropdown);
  dropdownInput.addEventListener('focus', toggleDropdown);
  dropdownCounterBtns.forEach(elem => {
    elem.addEventListener('click', changeQuantity);
  });
}

export default dropdown;
