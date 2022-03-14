import './registration.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initMenu from '@comp/header/js/initMenu';
import addMaskForInput from '@comp/input/js/addMaskForInput';

function initFunction() {
  checkingTabKeyPress();
  initMenu();
  addMaskForInput();
}

window.addEventListener('DOMContentLoaded', initFunction);
