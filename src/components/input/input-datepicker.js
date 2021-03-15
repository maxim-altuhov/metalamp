import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import datepicker from 'air-datepicker';

function addDatePicker({
  $selector,
  $secondSelector,
  options
}) {
  const currentDatepicker = $selector.datepicker().data('datepicker');

  // инициализация календаря
  $selector.datepicker(options);

  // функция добавляющая кнопки управления в календарь
  function creatControlBtn() {
    const buttonBlock = `<div class="datepicker--control">
    <button class="button button_simple datepicker__clear js-datepicker__clear" type="button">Очистить</button>
    <button class="button button_simple datepicker__apply js-datepicker__apply" type="button">Применить</button>
    </div>`;

    $(`.${options.classes}`).append(buttonBlock);
  }

  // очистка календаря
  function clearDatepicker() {
    currentDatepicker.clear();
  }

  // применение значений календаря
  function applyDatepicker() {
    currentDatepicker.hide();
  }

  // показать календарь
  function showDatepicker() {
    currentDatepicker.show();
  }

  // вызов функций
  creatControlBtn();

  // обработчики
  $('.js-datepicker__clear').on('click', clearDatepicker);
  $('.js-datepicker__apply').on('click', applyDatepicker);
  if ($secondSelector !== undefined) {
    $secondSelector.on('click', showDatepicker);
  }
}

export default addDatePicker;
