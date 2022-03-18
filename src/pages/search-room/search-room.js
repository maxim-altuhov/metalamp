import './search-room.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initMenu from '@comp/header/js/initMenu';
import initFilterToggle from './js/initFilterToggle';
import addDatePicker from '@comp/input-datepicker/js/addDatePicker';
import initDropdown from '@comp/dropdown/js/initDropdown';
import rangeSlider from '@comp/range-slider/js/rangeSlider';
import toggleCheckboxList from '@comp/checkbox-list/js/toggleCheckboxList';
import initSlider from '@comp/card-room/js/initSlider';
import convertCost from '@comp/card-booking/js/convertCost';
import convertComment from '@comp/card-room/js/convertComment';
import initPagination from '@comp/pagination/js/initPagination';

function initFunction() {
  checkingTabKeyPress();
  initMenu();
  initFilterToggle();
  addDatePicker({
    selectorId: '#date-filter',
    startDate: '2019-08-19',
    finishDate: '2019-08-23',
  });
  initDropdown();
  rangeSlider({
    selector: '#range-slider-price',
    start: [5000, 10000],
    min: 1000,
    max: 16000,
    step: 500,
  });
  toggleCheckboxList();
  initSlider();
  convertCost();
  convertComment();
  initPagination({
    selector: '#pagination',
    maxElemPerPage: 12,
    maxPages: 5,
  });
}

window.addEventListener('DOMContentLoaded', initFunction);
