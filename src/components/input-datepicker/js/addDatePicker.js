import $ from 'jquery';
import 'air-datepicker';

import createUniqueID from './createUniqueID';

function addDatePicker(selector) {
  let settings;

  try {
    settings = JSON.parse(selector.dataset.options);
  } catch {
    // Incorrect options are passed to the script. Will use the default options.
    settings = {
      startDate: '',
      finishDate: '',
      setMinDate: false,
      enableArrowRotation: true,
    };
  }

  /* beautify preserve:start */
  const {
    startDate = '',
    finishDate = '',
    setMinDate = false,
    enableArrowRotation = true,
  } = settings;
  /* beautify preserve:end */

  const $datepicker = $(selector);
  const $datepickerInputs = $datepicker.find('.js-input-datepicker__date');
  const $dropdownArrow = $datepicker.find('.input-datepicker__icon');
  const currentDatepicker = $datepickerInputs.eq(0).datepicker().data('datepicker');
  const dateStart = new Date(startDate);
  const dateFinish = finishDate ? new Date(finishDate) : '';
  const hasTwoDropdowns = $datepickerInputs.length > 1;

  // Установить минимальной датой, текущую дату
  const setLimitForDate = () => {
    if (setMinDate) return new Date();

    return '';
  };

  let options = {
    classes: createUniqueID(),
    range: true,
    multipleDatesSeparator: ' - ',
    prevHtml: '<span class="input-datepicker__icon input-datepicker__icon_position_not-fixed">arrow_back</span>',
    nextHtml: '<span class="input-datepicker__icon input-datepicker__icon_position_not-fixed">arrow_forward</span>',
    navTitles: {
      days: 'MM <i>yyyy</i>',
    },
    offset: 5,
    minDate: setLimitForDate(),
    onSelect(fd) {
      if (hasTwoDropdowns) {
        $datepickerInputs.eq(0).val(fd.split(' - ')[0]);
        $datepickerInputs.eq(1).val(fd.split(' - ')[1]);
      }
    },
    onShow() {
      if (enableArrowRotation) $dropdownArrow.addClass('input-datepicker__icon_rotated');
    },
    onHide() {
      if (enableArrowRotation) $dropdownArrow.removeClass('input-datepicker__icon_rotated');
    },
  };

  if (!hasTwoDropdowns) {
    options.language = {
      dateFormat: 'dd M',
      monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    };
  }

  // инициализация календаря
  $datepickerInputs.eq(0).datepicker(options);
  const $blockWithDatepicker = $(`.${options.classes}`);

  // функция установки даты
  const setDate = () => {
    const PLACEHOLDER = 'ДД.ММ.ГГГГ';
    const PLACEHOLDER_FILTER = 'дд.мм';

    currentDatepicker.selectedDates.push(dateStart, dateFinish);
    currentDatepicker.selectDate(currentDatepicker.selectedDates);

    if (hasTwoDropdowns) {
      if (startDate === '') $datepickerInputs.eq(0).val(PLACEHOLDER);
      if (finishDate === '') $datepickerInputs.eq(1).val(PLACEHOLDER);
    } else {
      if (startDate === '') {
        const inputValue = $datepickerInputs.eq(0).val().split(' - ');
        inputValue.splice(0, 1, PLACEHOLDER_FILTER);
        $datepickerInputs.eq(0).val(inputValue.join(' - '));
      }
      if (finishDate === '') {
        const inputValue = $datepickerInputs.eq(0).val().split(' - ');
        inputValue.splice(1, 1, PLACEHOLDER_FILTER);
        $datepickerInputs.eq(0).val(inputValue.join(' - '));
      }
    }
  };

  // функция добавляющая кнопки управления в календарь
  const creatControlBtn = () => {
    const buttonBlock = `<div class="datepicker--control">
    <button class="button button_simple" type="button" data-function="clear">Очистить</button>
    <button class="button button_simple" type="button" data-function="apply">Применить</button>
    </div>`;

    $blockWithDatepicker.append(buttonBlock);
  };

  // вызов функций и обработчики
  creatControlBtn();

  if (startDate || finishDate) setDate();

  // очистка календаря
  const handleButtonClearClick = () => currentDatepicker.clear();

  // применение значений календаря
  const handleButtonApplyClick = () => currentDatepicker.hide();
  const handleButtonApplyBlur = () => currentDatepicker.hide();

  // показать календарь
  const handleInputDateClick = () => currentDatepicker.show();
  const handleInputDateFocus = () => currentDatepicker.show();

  $blockWithDatepicker.find('[data-function = "clear"]').on('click', handleButtonClearClick);
  $blockWithDatepicker.find('[data-function = "apply"]').on('click', handleButtonApplyClick);

  if (hasTwoDropdowns) {
    $datepickerInputs.eq(1).on('click', handleInputDateClick);
    $datepickerInputs.eq(1).on('focus', handleInputDateFocus);
    $datepickerInputs.eq(1).on('blur', handleButtonApplyBlur);
  }
}

export default addDatePicker;
