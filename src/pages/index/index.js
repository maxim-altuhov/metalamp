import './index.scss';

import checkedFocus from '@base/js/checkedFocus';
import initMenu from '@comp/header/js/initMenu';
import initDropdown from '@comp/dropdown/js/initDropdown';
import addDatePicker from '@comp/input/js/addDatePicker';

function initFunction() {
  checkedFocus();
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
