import './form-elements.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import addMaskForInput from '@comp/input/js/addMaskForInput';
import addDatePicker from '@comp/input/js/addDatePicker';
import initDropdown from '@comp/dropdown/js/initDropdown';
import toggleLikes from '@comp/like/js/toggleLikes';
import rangeSlider from '@comp/range-slider/js/rangeSlider';
import initPagination from '@comp/pagination/js/initPagination';
import toggleCheckboxList from '@comp/checkbox-list/js/toggleCheckboxList';

function initFunction() {
  checkingTabKeyPress();
  addMaskForInput();
  addDatePicker({
    $selectorId: '#date-dropdown-block',
    secondSelector: true,
    finishDate: '2019-08-19',
  });
  addDatePicker({
    $selectorId: '#date-filter',
    startDate: '2019-08-19',
    finishDate: '2019-08-23',
  });
  initDropdown({
    arrowToggle: false,
  });
  toggleLikes();
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
