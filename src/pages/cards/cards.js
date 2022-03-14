import './cards.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initDropdown from '@comp/dropdown/js/initDropdown';
import addMaskForInput from '@comp/input/js/addMaskForInput';
import addDatePicker from '@comp/input/js/addDatePicker';
import showTooltip from '@comp/card-booking/js/showTooltip';
import convertCost from '@comp/card-booking/js/convertCost';
import initSlider from '@comp/card-room/js/initSlider';
import convertComment from '@comp/card-room/js/convertComment';

function initFunction() {
  checkingTabKeyPress();
  initDropdown({
    arrowToggle: false,
  });
  addMaskForInput();
  addDatePicker({
    $selectorId: '#card-search-date',
    secondSelector: true,
  });
  addDatePicker({
    $selectorId: '#card-booking-date',
    secondSelector: true,
    startDate: '2019-08-19',
    finishDate: '2019-08-23',
  });
  addDatePicker({
    $selectorId: '#date-filter-example',
    startDate: '2019-08-19',
    finishDate: '2019-08-23',
  });
  showTooltip();
  convertCost();
  initSlider();
  convertComment();
}

window.addEventListener('DOMContentLoaded', initFunction);
