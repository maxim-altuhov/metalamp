import './cards.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initDropdown from '@comp/dropdown/js/initDropdown';
import addDateMaskForInput from '@comp/input/js/addDateMaskForInput';
import addDatePicker from '@comp/input-datepicker/js/addDatePicker';
import showTooltip from '@comp/card-booking/js/showTooltip';
import convertCost from '@comp/card-booking/js/convertCost';
import initSlider from '@comp/card-room/js/initSlider';
import convertComment from '@comp/card-room/js/convertComment';

function initFunction() {
  checkingTabKeyPress();
  initDropdown({
    arrowToggle: false,
  });
  addDateMaskForInput();
  addDatePicker({
    selectorId: '#card-search-date',
    isTwoDropdowns: true,
  });
  addDatePicker({
    selectorId: '#card-booking-date',
    isTwoDropdowns: true,
    startDate: '2019-08-19',
    finishDate: '2019-08-23',
  });
  addDatePicker({
    selectorId: '#date-filter-example',
    startDate: '2019-08-19',
    finishDate: '2019-08-23',
  });
  showTooltip();
  convertCost();
  initSlider();
  convertComment();
}

window.addEventListener('DOMContentLoaded', initFunction);
