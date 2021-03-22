import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import datepicker from 'air-datepicker';

function addDatePicker({
  $selectorId,
  secondSelector = false
}) {
  const currentDatepicker = $($selectorId).datepicker().data('datepicker');
  let $secondSelector;

  if (secondSelector === true) {
    $secondSelector = `${$selectorId}-second`;
  }

  let options = {
    classes: $selectorId.substr(1),
    range: true,
    multipleDatesSeparator: ' - ',
    prevHtml: '<span class="material-icons">arrow_back</span>',
    nextHtml: '<span class="material-icons">arrow_forward</span>',
    navTitles: {
      days: 'MM <i>yyyy</i>'
    },
    offset: 5,
    minDate: new Date(),
    onSelect: (fd) => {
      if ($secondSelector) {
        $($selectorId).val(fd.split(' - ')[0]);
        $($secondSelector).val(fd.split(' - ')[1]);
      }
    },
    onShow: () => {
      $('input', $(`[data-selector = ${options.classes}]`)).next('.material-icons').addClass('active');
    },
    onHide: () => {
      $('input', $(`[data-selector = ${options.classes}]`)).next('.material-icons').removeClass('active');
    }
  };

  if (!$secondSelector) {
    options.language = {
      dateFormat: 'dd M',
      monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
    };
  }

  // инициализация календаря
  $($selectorId).datepicker(options);

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
  $('.js-datepicker__clear', $(`.${options.classes}`)).on('click', clearDatepicker);
  $('.js-datepicker__apply', $(`.${options.classes}`)).on('click', applyDatepicker);
  if ($($secondSelector) !== undefined) {
    $($secondSelector).on('click', showDatepicker);
  }
}

export default addDatePicker;
