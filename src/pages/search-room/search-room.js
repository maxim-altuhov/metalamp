import './search-room.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initMenu from '@comp/header/js/initMenu';
import initFilterToggle from './js/initFilterToggle';
import addDatePicker from '@comp/input-datepicker/js/addDatePicker';
import initSlider from '@comp/card-room/js/initSlider';
import convertCost from '@comp/card-booking/js/convertCost';
import convertComment from '@comp/card-room/js/convertComment';
import '@comp/checkbox-list/checkbox-list';
import '@comp/checkbox/checkbox';
import '@comp/range-slider/range-slider';
import '@comp/pagination/pagination';
import '@comp/dropdown/dropdown';

function initFunction() {
  checkingTabKeyPress();
  initMenu();
  initFilterToggle();
  addDatePicker({
    selectorId: '#date-filter',
    startDate: '2019-08-19',
    finishDate: '2019-08-23',
  });
  initSlider();
  convertCost();
  convertComment();
}

window.addEventListener('DOMContentLoaded', initFunction);
