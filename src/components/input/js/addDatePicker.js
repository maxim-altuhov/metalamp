import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import 'air-datepicker';

function addDatePicker({
  $selectorId,
  secondSelector = false,
  startDate,
  finishDate,
  arrowToggle = false,
  setMinDate = false,
}) {
  const currentDatepicker = $($selectorId).datepicker().data('datepicker');
  let date1 = new Date(startDate);
  let date2 = new Date(finishDate);
  let $secondSelector;

  if (secondSelector === true) {
    $secondSelector = `${$selectorId}-second`;
  }

  // установить минимальной датой, текущую дату
  const setLimitForDate = () => {
    if (setMinDate) {
      return new Date();
    }
    return '';
  };

  let options = {
    classes: `${$selectorId.substr(1)}`,
    range: true,
    multipleDatesSeparator: ' - ',
    prevHtml: '<span class="material-icons">arrow_back</span>',
    nextHtml: '<span class="material-icons">arrow_forward</span>',
    navTitles: {
      days: 'MM <i>yyyy</i>',
    },
    offset: 5,
    minDate: setLimitForDate(),
    onSelect(fd) {
      if ($secondSelector) {
        $($selectorId).val(fd.split(' - ')[0]);
        $($secondSelector).val(fd.split(' - ')[1]);
      }
    },
    onShow() {
      if (arrowToggle) $('input', $(`[data-selector = ${options.classes}]`)).next('.material-icons').addClass('active');
    },
    onHide() {
      if (arrowToggle) $('input', $(`[data-selector = ${options.classes}]`)).next('.material-icons').removeClass('active');
    },
  };

  if (!$secondSelector) {
    options.language = {
      dateFormat: 'dd M',
      monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    };
  }

  // инициализация календаря
  $($selectorId).datepicker(options);

  // функция установки даты
  const setDate = () => {
    currentDatepicker.selectedDates.push(date1, date2);
    currentDatepicker.selectDate(currentDatepicker.selectedDates);
    if ($($selectorId).val() === 'NaN.NaN.NaN') {
      $($selectorId).val('ДД.ММ.ГГГГ');
    }
    if ($($secondSelector).val() === 'NaN.NaN.NaN') {
      $($secondSelector).val('ДД.ММ.ГГГГ');
    }
  };

  // функция добавляющая кнопки управления в календарь
  const creatControlBtn = () => {
    const buttonBlock = `<div class="datepicker--control">
    <button class="button button_simple datepicker__clear js-datepicker__clear" type="button">Очистить</button>
    <button class="button button_simple datepicker__apply js-datepicker__apply" type="button">Применить</button>
    </div>`;

    $(`.${options.classes}`).append(buttonBlock);
  };

  // очистка календаря
  const clearDatepicker = () => {
    currentDatepicker.clear();
  };

  // применение значений календаря
  const applyDatepicker = () => {
    currentDatepicker.hide();
  };

  // показать календарь
  const showDatepicker = () => {
    currentDatepicker.show();
  };

  // вызов функций
  creatControlBtn();

  if (startDate || finishDate) {
    setDate();
  }

  // обработчики
  $('.js-datepicker__clear', $(`.${options.classes}`)).on('click', clearDatepicker);
  $('.js-datepicker__apply', $(`.${options.classes}`)).on('click', applyDatepicker);
  if ($($secondSelector) !== undefined) {
    $($secondSelector).on('click', showDatepicker);
    $($secondSelector).on('focus', showDatepicker);
    $($secondSelector).on('blur', applyDatepicker);
  }
}

export default addDatePicker;
