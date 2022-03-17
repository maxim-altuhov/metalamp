import './index.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initMenu from '@comp/header/js/initMenu';
import initDropdown from '@comp/dropdown/js/initDropdown';
import addDatePicker from '@comp/input-datepicker/js/addDatePicker';

function initFunction() {
  checkingTabKeyPress();
  initMenu();
  initDropdown();
  addDatePicker({
    selectorId: '#card-search-date',
    isTwoDropdowns: true,
    setMinDate: true,
  });
}

window.addEventListener('DOMContentLoaded', initFunction);
