import './form-elements.scss';

import { checkedFocus } from '@base/base';
import addMaskForInput from '@comp/input/input-mask';
import addDatePicker from '@comp/input/input-datepicker';
import initDropdown from '@comp/dropdown/dropdown';
import toggleLikes from '@comp/likebtn/likebtn';
import rangeSlider from '@comp/range-slider/range-slider';
import initPagination from '@comp/pagination/pagination';
import toggleCheckboxList from '@comp/checkbox-list/checkbox-list';

function contentLoaded() {
  checkedFocus();
  addMaskForInput();
  addDatePicker({
    $selectorId: '#date-dropdown-block',
    secondSelector: true,
    finishDate: '2019-08-19'
  });
  addDatePicker({
    $selectorId: '#date-filter',
    startDate: '2019-08-19',
    finishDate: '2019-08-23'
  });
  initDropdown({});
  toggleLikes();
  rangeSlider({
    selector: '#range-slider-1',
    start: [5000, 10000],
    min: 1000,
    max: 16000,
    step: 500
  });
  initPagination({
    selector: '#pagination-1',
    maxItemPerPage: 12,
    maxPaginationElem: 5
  });
  toggleCheckboxList();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
