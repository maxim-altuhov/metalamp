import './index.scss';

import { checkedFocus } from '@base/base';
import initDropdown from '@comp/dropdown/dropdown';
import addDatePicker from '@comp/input/input-datepicker';

function contentLoaded() {
  checkedFocus();
  initDropdown({});
  addDatePicker({
    $selectorId: '#card-search-date',
    secondSelector: true
  });
}

window.addEventListener('DOMContentLoaded', contentLoaded);
