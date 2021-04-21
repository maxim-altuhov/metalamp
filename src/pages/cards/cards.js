import './cards.scss';

import { checkedFocus } from '@base/base';
import initDropdown from '@comp/dropdown/dropdown';
import addMaskForInput from '@comp/input/input-mask';
import addDatePicker from '@comp/input/input-datepicker';
import { showTooltip, convertCost } from '@comp/card-booking/card-booking';
import { sliderSwiper, convertComment } from '@comp/card-room/card-room';

function contentLoaded() {
  checkedFocus();
  initDropdown({
    arrowToggle: false
  });
  addMaskForInput();
  addDatePicker({
    $selectorId: '#card-search-date',
    secondSelector: true
  });
  addDatePicker({
    $selectorId: '#card-booking-date',
    secondSelector: true,
    startDate: '2019-08-19',
    finishDate: '2019-08-23'
  });
  showTooltip();
  addDatePicker({
    $selectorId: '#date-filter-example',
    startDate: '2019-08-19',
    finishDate: '2019-08-23'
  });
  convertCost();
  convertComment();
  sliderSwiper();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
