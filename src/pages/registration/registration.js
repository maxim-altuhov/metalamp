import './registration.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initMenu from '@comp/header/js/initMenu';
import addDateMaskForInput from '@comp/input/js/addDateMaskForInput';

function initFunction() {
  checkingTabKeyPress();
  initMenu();
  addDateMaskForInput();
}

window.addEventListener('DOMContentLoaded', initFunction);
