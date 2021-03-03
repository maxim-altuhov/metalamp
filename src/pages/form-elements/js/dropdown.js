function dropdown() {
  const dropdownSelector = document.querySelector('.form__dropdown');
  const dropdownBlock = document.querySelector('.form__dropdown-block');
  const dropdownInput = document.querySelector('.form__dropdown-input');
  const dropdownArrow = document.querySelector('.form__dropdown-arrow');

  function openDropdown() {
    dropdownSelector.classList.toggle('form__dropdown_active');
    dropdownBlock.classList.toggle('form__dropdown-block_active');
    dropdownArrow.classList.toggle('active');

    if (dropdownArrow.classList.contains('active')) {
      dropdownArrow.textContent = 'keyboard_arrow_up';
    } else {
      dropdownArrow.textContent = 'keyboard_arrow_down';
    }
  }

  dropdownSelector.addEventListener('click', openDropdown);
}

export default dropdown;
