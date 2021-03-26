import './form-elements.scss';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import { checkedFocus } from '@base/base';
import addMaskForInput from '@comp/input/input-mask';
import addDatePicker from '@comp/input/input-datepicker';
import initDropdown from '@comp/dropdown/dropdown';
import toggleLikes from '@comp/likebtn/likebtn';
import setRating from '@comp/rating/rating';
import rangeSlider from '@comp/range-slider/range-slider';
import initPagination from '@comp/pagination/pagination';

function contentLoaded() {
  checkedFocus();
  addMaskForInput();
  addDatePicker({
    $selectorId: '#date-dropdown-block',
    secondSelector: true
  });
  addDatePicker({
    $selectorId: '#date-filter',
    startDate: '2021-08-19',
    finishDate: '2021-08-23'
  });
  initDropdown();
  toggleLikes();
  setRating();
  rangeSlider({
    selector: '#range-slider-1',
    start: [5000, 10000],
    min: 1000,
    max: 16000
  });
  initPagination({
    selector: '#pagination-1',
    maxItemPerPage: 12,
    maxPaginationElem: 5
  });
}

window.addEventListener('DOMContentLoaded', contentLoaded);
