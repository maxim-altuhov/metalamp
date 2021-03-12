import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import datepicker from 'air-datepicker';

function addDatePicker({ selector }) {
  const $selector = $(selector);
  const myDatepicker = $selector.datepicker().data('datepicker');

  // инициализация календаря
  $selector.datepicker({
    range: true,
    inline: true,
    multipleDatesSeparator: '-',
    prevHtml: '<span class="material-icons">arrow_back</span>',
    nextHtml: '<span class="material-icons">arrow_forward</span>',
    navTitles: {
      days: 'MM <i>yyyy</i>'
    },
    offset: 5,
    onSelect: (fd) => {
      $('#start_datepicker').val(fd.split('-')[0]);
      $('#end_datepicker').val(fd.split('-')[1]);
    },
    minDate: new Date()
  });

  // функция добавляющая кнопки управления в календарь
  function creatControlBtn() {
    const datepickerBlock = document.querySelector('.datepicker');
    const buttonBlock = `<div class="datepicker__control">
    <button class="button button_simple datepicker__clear js-datepicker__clear" type="button">Очистить</button>
    <button class="button button_simple datepicker__apply js-datepicker__apply" type="button">Применить</button>
    </div>`;
    datepickerBlock.insertAdjacentHTML('beforeend', buttonBlock);
  }

  // функция очистки календаря
  function clearDatepicker() {
    myDatepicker.clear();
  }

  // функция применения значений календаря
  function applyDatepicker() {
    myDatepicker.hide();
  }

  // показать календарь
  function showDatepicker() {
    myDatepicker.show();
  }

  // обработчики
  creatControlBtn();
  $('.js-datepicker__clear').on('click', clearDatepicker);
  $('.js-datepicker__apply').on('click', applyDatepicker);
  $('#end_datepicker').on('click', showDatepicker);
}

export default addDatePicker;
