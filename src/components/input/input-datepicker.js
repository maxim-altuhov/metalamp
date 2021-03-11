import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import datepicker from 'air-datepicker';

function addDatePicker() {
  $('#id').datepicker({
    range: true,
    inline: true,
    prevHtml: '<span class="material-icons">arrow_back</span>',
    nextHtml: '<span class="material-icons">arrow_forward</span>',
    navTitles: {
      days: 'MM <i>yyyy</i>'
    },
    minDate: new Date()
  });

  const $datepickerBlock = document.querySelector('.datepicker');
  const res = `
  <div class="datepicker__control">
  <button class="button button_simple datepicker__clear js-datepicker__clear" type="button">Очистить</button>
  <button class="button button_simple datepicker__apply js-datepicker__apply" type="button">Применить</button>
  </div>`;
  $datepickerBlock.insertAdjacentHTML('beforeend', res);
}

export default addDatePicker;
