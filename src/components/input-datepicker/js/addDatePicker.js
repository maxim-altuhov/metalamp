import $ from 'jquery';
import 'air-datepicker';

function addDatePicker(selector) {
  let settings;

  try {
    settings = JSON.parse(selector.dataset.options);
  } catch {
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
  const $datepickerLabels = $datepicker.find('.js-input-datepicker__label');
  const $datepickerInputs = $datepicker.find('.js-input-datepicker__date');
  const $dropdownArrow = $datepicker.find('.js-input-datepicker__icon');
  const $firstInput = $datepickerInputs.eq(0);
  const $secondInput = $datepickerInputs.eq(1);
  const dateStart = new Date(startDate);
  const dateFinish = finishDate ? new Date(finishDate) : '';
  const hasTwoDropdowns = $datepickerInputs.length > 1;
  const styleClassForFilter = !hasTwoDropdowns && !$firstInput.hasClass('input-datepicker__date_inline') ? 'datepicker_style_filter' : '';

  // Установить минимальной датой, текущую дату
  const setLimitForDate = () => {
    if (setMinDate) return new Date();

    return '';
  };

  let options = {
    classes: styleClassForFilter,
    range: true,
    keyboardNav: true,
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
        $firstInput.val(fd.split(' - ')[0]);
        $secondInput.val(fd.split(' - ')[1]);
      }
      showControlBtnClear();
    },
    onShow() {
      if (enableArrowRotation) $dropdownArrow.addClass('input-datepicker__icon_rotated');

      setTimeout(() => {
        $datepickerLabels.css('pointer-events', 'none');
      }, 200);
    },
    onHide() {
      if (enableArrowRotation) $dropdownArrow.removeClass('input-datepicker__icon_rotated');

      setTimeout(() => {
        $datepickerLabels.css('pointer-events', '');
      }, 200);
    },
  };

  if (!hasTwoDropdowns) {
    options.language = {
      dateFormat: 'dd M',
      monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    };
  } else {
    $secondInput.attr('tabindex', -1);
  }

  // Инициализация календаря
  $firstInput.datepicker(options);
  const currentDatepicker = $firstInput.data('datepicker');
  const $blockWithDatepicker = currentDatepicker.$datepicker;

  // Функция установки даты
  const setDate = () => {
    const PLACEHOLDER = 'ДД.ММ.ГГГГ';
    const PLACEHOLDER_FILTER = 'дд.мм';

    currentDatepicker.selectedDates.push(dateStart, dateFinish);
    currentDatepicker.selectDate(currentDatepicker.selectedDates);

    if (hasTwoDropdowns) {
      if (startDate === '') $firstInput.val(PLACEHOLDER);
      if (finishDate === '') $secondInput.val(PLACEHOLDER);
    } else {
      if (startDate === '') {
        const inputValue = $firstInput.val().split(' - ');
        inputValue.splice(0, 1, PLACEHOLDER_FILTER);
        $firstInput.val(inputValue.join(' - '));
      }

      if (finishDate === '') {
        const inputValue = $firstInput.val().split(' - ');
        inputValue.splice(1, 1, PLACEHOLDER_FILTER);
        $firstInput.val(inputValue.join(' - '));
      }
    }
  };

  // Функция добавляющая контр.кнопки в календарь
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

  creatControlBtn();

  const $btnClear = $blockWithDatepicker.find('[data-function = "clear"]');
  const $btnApply = $blockWithDatepicker.find('[data-function = "apply"]');
  const $blockWithClearBtn = $btnClear.parent();

  if (startDate || finishDate) setDate();

  // Показать кнопку очистить при выбранных датах
  function showControlBtnClear() {
    $blockWithClearBtn.removeClass('datepicker--control-btn_hidden');
  }

  // Очистить даты
  const handleButtonClearClick = () => {
    currentDatepicker.clear();
    $blockWithClearBtn.addClass('datepicker--control-btn_hidden');
  };

  const handleInputDateClick = () => $firstInput.trigger('focus');
  const handleInputDateBlur = () => currentDatepicker.hide();
  const handleButtonApplyClick = () => currentDatepicker.hide();

  $btnClear.on('click', handleButtonClearClick);
  $btnApply.on('click', handleButtonApplyClick);

  if (hasTwoDropdowns) {
    $secondInput.on('click', handleInputDateClick);
    $secondInput.on('blur', handleInputDateBlur);
  }
}

export default addDatePicker;
