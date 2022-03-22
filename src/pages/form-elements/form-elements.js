import './form-elements.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import addDateMaskForInput from '@comp/input/js/addDateMaskForInput';
import addDatePicker from '@comp/input-datepicker/js/addDatePicker';
import initDropdown from '@comp/dropdown/js/initDropdown';
import switchLikes from '@comp/like/js/switchLikes';
import initPagination from '@comp/pagination/js/initPagination';
import '@comp/checkbox-list/checkbox-list';
import '@comp/checkbox/checkbox';
import '@comp/toggle/toggle';
import '@comp/simple-rating/simple-rating';
import '@comp/range-slider/range-slider';
import '@comp/button/button';
import '@comp/bullet-list/bullet-list';

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
  initDropdown();
  switchLikes();
  initPagination({
    selector: '#pagination-1',
    maxElemPerPage: 12,
    maxPages: 5,
  });
}

window.addEventListener('DOMContentLoaded', initFunction);
