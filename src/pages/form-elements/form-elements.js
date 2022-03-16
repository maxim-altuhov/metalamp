import './form-elements.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import addDateMaskForInput from '@comp/input/js/addDateMaskForInput';
import addDatePicker from '@comp/input-datepicker/js/addDatePicker';
import initDropdown from '@comp/dropdown/js/initDropdown';
import switchLikes from '@comp/like/js/switchLikes';
import rangeSlider from '@comp/range-slider/js/rangeSlider';
import initPagination from '@comp/pagination/js/initPagination';
import toggleCheckboxList from '@comp/checkbox-list/js/toggleCheckboxList';

function initFunction() {
  checkingTabKeyPress();
  addDateMaskForInput();
  addDatePicker({
    selectorId: '#date-dropdown-block',
    isTwoDropdowns: true,
    finishDate: '2019-08-19',
  });
  addDatePicker({
    selectorId: '#date-filter',
    startDate: '2019-08-19',
    finishDate: '2019-08-23',
  });
  initDropdown({
    arrowToggle: false,
  });
  switchLikes();
  rangeSlider({
    selector: '#range-slider-1',
    start: [5000, 10000],
    min: 1000,
    max: 16000,
    step: 500,
  });
  initPagination({
    selector: '#pagination-1',
    maxItemPerPage: 12,
    maxPaginationElem: 5,
  });
  toggleCheckboxList();
}

window.addEventListener('DOMContentLoaded', initFunction);
