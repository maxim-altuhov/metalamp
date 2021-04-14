import './room-details.scss';

import { checkedFocus } from '@base/base';
import initMenu from '@comp/header/header';
import initDropdown from '@comp/dropdown/dropdown';
import addDatePicker from '@comp/input/input-datepicker';
import toggleLikes from '@comp/likebtn/likebtn';
import { showTooltip, convertCost } from '@comp/card-booking/card-booking';

function contentLoaded() {
  checkedFocus();
  initMenu();
  initDropdown({});
  addDatePicker({
    $selectorId: '#card-booking-date',
    secondSelector: true,
    startDate: '2025-08-19',
    finishDate: '2025-08-23'
  });
  toggleLikes();
  showTooltip();
  convertCost();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
