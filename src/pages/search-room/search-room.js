import './search-room.scss';

import { checkedFocus } from '@base/base';
import initMenu from '@comp/header/header';
import initFilterToggle from './js/filter';
import addDatePicker from '@comp/input/input-datepicker';
import initDropdown from '@comp/dropdown/dropdown';
import rangeSlider from '@comp/range-slider/range-slider';
import toggleCheckboxList from '@comp/checkbox-list/checkbox-list';
import { convertCost } from '@comp/card-booking/card-booking';
import { sliderSwiper, convertComment } from '@comp/card-room/card-room';
import initPagination from '@comp/pagination/pagination';

function contentLoaded() {
  checkedFocus();
  initMenu();
  initFilterToggle();
  addDatePicker({
    $selectorId: '#date-filter',
    startDate: '2019-08-19',
    finishDate: '2019-08-23'
  });
  initDropdown({
    arrowToggle: false
  });
  rangeSlider({
    selector: '#range-slider-price',
    start: [5000, 10000],
    min: 1000,
    max: 16000,
    step: 500
  });
  toggleCheckboxList();
  sliderSwiper();
  convertCost();
  convertComment();
  initPagination({
    selector: '#pagination',
    maxItemPerPage: 12,
    maxPaginationElem: 5
  });
}

window.addEventListener('DOMContentLoaded', contentLoaded);
