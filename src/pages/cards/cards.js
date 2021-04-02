import './cards.scss';

import { checkedFocus } from '@base/base';
import initDropdown from '@comp/dropdown/dropdown';
import addMaskForInput from '@comp/input/input-mask';
import addDatePicker from '@comp/input/input-datepicker';
import showTooltip from '@comp/card-booking/card-booking';

function contentLoaded() {
  checkedFocus();
  initDropdown({});
  addMaskForInput();
  addDatePicker({
    $selectorId: '#card-search-date',
    secondSelector: true
  });
  addDatePicker({
    $selectorId: '#card-booking-date',
    secondSelector: true,
    startDate: '2021-08-19',
    finishDate: '2021-08-23'
  });
  showTooltip();
  addDatePicker({
    $selectorId: '#date-filter-example',
    startDate: '2021-08-19',
    finishDate: '2021-08-23'
  });
}

window.addEventListener('DOMContentLoaded', contentLoaded);
