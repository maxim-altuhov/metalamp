import $ from 'jquery';
window.jQuery = $;
window.$ = $;

function toggleCheckboxList() {
  const $selector = $('.js-checkbox-list__block');

  function toggleBlock(e) {
    const target = e.currentTarget;
    const $arrow = $(target).find('span');
    const $checkboxBlock = $(target).next();

    $checkboxBlock.toggleClass('checkbox-list__wrapper_active');

    if ($checkboxBlock.hasClass('checkbox-list__wrapper_active')) {
      $arrow.text('keyboard_arrow_up');
      $checkboxBlock.slideDown('slow');
    } else {
      $arrow.text('keyboard_arrow_down');
      $checkboxBlock.slideUp('slow');
    }
  }

  function toggleBlockWithEnter(e) {
    if (e.key === 'Enter') {
      toggleBlock(e);
    }
  }

  $selector.on('click', toggleBlock);
  $selector.on('keydown', toggleBlockWithEnter);
}

export default toggleCheckboxList;
