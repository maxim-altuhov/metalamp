import $ from 'jquery';

// Плавное открытие/закрытие блока c чекбоксами
function toggleCheckboxList() {
  const $selector = $('.js-checkbox-list__block');

  const handleBlockClick = (e) => {
    const target = e.currentTarget;
    const $arrow = $(target).find('.checkbox-list__arrow');
    const $checkboxBlock = $(target).next();

    $checkboxBlock.toggleClass('checkbox-list__wrapper_active');

    if ($checkboxBlock.hasClass('checkbox-list__wrapper_active')) {
      $arrow.text('keyboard_arrow_up');
      $checkboxBlock.slideDown('slow');
    } else {
      $arrow.text('keyboard_arrow_down');
      $checkboxBlock.slideUp('slow');
    }
  };

  const handleBlockKeydownEnter = (e) => {
    const CONTROL_KEY = 'Enter';
    if (e.key === CONTROL_KEY) handleBlockClick(e);
  };

  $selector.on('click', handleBlockClick);
  $selector.on('keydown', handleBlockKeydownEnter);
}

export default toggleCheckboxList;
