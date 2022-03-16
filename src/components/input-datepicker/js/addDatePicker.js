import $ from 'jquery';
import 'air-datepicker';

function addDatePicker({
  selectorId,
  startDate,
  finishDate,
  isTwoDropdowns = false,
  enableArrowRotation = false,
  setMinDate = false,
}) {
  const $selectorId = $(selectorId);
  const $inputDatepicker = $(`[data-selector = ${selectorId.substr(1)}]`);
  const currentDatepicker = $selectorId.datepicker().data('datepicker');
  const dateStart = new Date(startDate);
  const dateFinish = new Date(finishDate);
  let $secondSelectorId;

  if (isTwoDropdowns) $secondSelectorId = $(`${selectorId}-second`);

  // установить минимальной датой, текущую дату
  const setLimitForDate = () => {
    if (setMinDate) return new Date();

    return '';
  };

  let options = {
    classes: `${selectorId.substr(1)}`,
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
      if (isTwoDropdowns) {
        $selectorId.val(fd.split(' - ')[0]);
        $secondSelectorId.val(fd.split(' - ')[1]);
      }
    },
    onShow() {
      if (enableArrowRotation) $inputDatepicker.find('.input-datepicker__icon').addClass('input-datepicker__icon_rotated');
    },
    onHide() {
      if (enableArrowRotation) $inputDatepicker.find('.input-datepicker__icon').removeClass('input-datepicker__icon_rotated');
    },
  };

  if (!isTwoDropdowns) {
    options.language = {
      dateFormat: 'dd M',
      monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    };
  }

  // инициализация календаря
  $selectorId.datepicker(options);
  const $blockWithDatepicker = $(`.${options.classes}`);

  // функция установки даты
  const setDate = () => {
    currentDatepicker.selectedDates.push(dateStart, dateFinish);
    currentDatepicker.selectDate(currentDatepicker.selectedDates);
    const NO_DATE = 'NaN.NaN.NaN';

    if ($selectorId.val() === NO_DATE) $selectorId.val('ДД.ММ.ГГГГ');
    if ($secondSelectorId && $secondSelectorId.val() === NO_DATE) $secondSelectorId.val('ДД.ММ.ГГГГ');
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

  if (isTwoDropdowns) {
    $secondSelectorId.on('click', handleInputDateClick);
    $secondSelectorId.on('focus', handleInputDateFocus);
    $secondSelectorId.on('blur', handleButtonApplyBlur);
  }
}

export default addDatePicker;
