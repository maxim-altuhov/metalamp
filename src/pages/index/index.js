import './index.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initMenu from '@comp/header/js/initMenu';
import initDropdown from '@comp/dropdown/js/initDropdown';
import addDatePicker from '@comp/input/js/addDatePicker';

function initFunction() {
  checkingTabKeyPress();
  initMenu();
  initDropdown({
    arrowToggle: false,
  });
  addDatePicker({
    $selectorId: '#card-search-date',
    secondSelector: true,
    setMinDate: true,
  });
}

window.addEventListener('DOMContentLoaded', initFunction);
