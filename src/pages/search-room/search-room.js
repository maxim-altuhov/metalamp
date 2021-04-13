import './search-room.scss';

import { checkedFocus } from '@base/base';
import addDatePicker from '@comp/input/input-datepicker';
import initDropdown from '@comp/dropdown/dropdown';
import rangeSlider from '@comp/range-slider/range-slider';
import toggleCheckboxList from '@comp/checkbox-list/checkbox-list';
import { convertCost } from '@comp/card-booking/card-booking';
import { sliderSwiper, convertComment } from '@comp/card-room/card-room';
import initPagination from '@comp/pagination/pagination';

function contentLoaded() {
  checkedFocus();
  addDatePicker({
    $selectorId: '#date-filter',
    startDate: '2025-08-19',
    finishDate: '2025-08-23'
  });
  initDropdown({});
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
