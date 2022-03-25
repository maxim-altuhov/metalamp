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
  const $dropdownArrow = $datepicker.find('.js-input-datepicker__icon');
  const currentDatepicker = $datepickerInputs.eq(0).datepicker().data('datepicker');
  const dateStart = new Date(startDate);
  const dateFinish = finishDate ? new Date(finishDate) : '';
  const hasTwoDropdowns = $datepickerInputs.length > 1;
  const styleClassForFilter = !hasTwoDropdowns ? 'datepicker_style_filter' : '';

  // Установить минимальной датой, текущую дату
  const setLimitForDate = () => {
    if (setMinDate) return new Date();

    return '';
  };

  let options = {
    classes: `${createUniqueID()} ${styleClassForFilter}`,
    range: true,
    multipleDatesSeparator: ' - ',
    prevHtml: '<span class="datepicker--nav-action-arrow">arrow_back</span>',
    nextHtml: '<span class="datepicker--nav-action-arrow">arrow_forward</span>',
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

      showControlBtnClear();
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
  const uniqueClass = options.classes.split(' ');
  const $blockWithDatepicker = $(`.${uniqueClass[0]}`);

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
      <div class="datepicker--control-btn datepicker--control-btn_hidden">
        <button class="button button_simple" type="button" data-function="clear">Очистить</button>
      </div>
      <div class="datepicker--control-btn">  
        <button class="button button_simple" type="button" data-function="apply">Применить</button>
      </div> 
    </div>`;

    $blockWithDatepicker.append(buttonBlock);
  };

  // вызов функций и обработчики
  creatControlBtn();

  const $btnClear = $blockWithDatepicker.find('[data-function = "clear"]');
  const $btnApply = $blockWithDatepicker.find('[data-function = "apply"]');
  const $blockWithClearBtn = $btnClear.parent();

  if (startDate || finishDate) setDate();

  // показать кнопку очистить для календаря
  function showControlBtnClear() {
    $blockWithClearBtn.removeClass('datepicker--control-btn_hidden');
  }

  // очистка календаря
  const handleButtonClearClick = () => {
    currentDatepicker.clear();
    $blockWithClearBtn.addClass('datepicker--control-btn_hidden');
  };

  // применение значений календаря
  const handleButtonApplyClick = () => currentDatepicker.hide();
  const handleButtonApplyBlur = () => currentDatepicker.hide();

  // показать календарь
  const handleInputDateClick = () => currentDatepicker.show();
  const handleInputDateFocus = () => currentDatepicker.show();

  $btnClear.on('click', handleButtonClearClick);
  $btnApply.on('click', handleButtonApplyClick);

  if (hasTwoDropdowns) {
    $datepickerInputs.eq(1).on('click', handleInputDateClick);
    $datepickerInputs.eq(1).on('focus', handleInputDateFocus);
    $datepickerInputs.eq(1).on('blur', handleButtonApplyBlur);
  }
}

export default addDatePicker;
