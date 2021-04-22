import './index.scss';

import { checkedFocus } from '@base/base';
import initDropdown from '@comp/dropdown/dropdown';
import addDatePicker from '@comp/input/input-datepicker';
import initMenu from '@comp/header/header';

function contentLoaded() {
  checkedFocus();
  initMenu();
  initDropdown({
    arrowToggle: false
  });
  addDatePicker({
    $selectorId: '#card-search-date',
    secondSelector: true,
    setMinDate: true
  });
}

window.addEventListener('DOMContentLoaded', contentLoaded);
