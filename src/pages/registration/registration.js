import './registration.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initMenu from '@comp/header/js/initMenu';
import '@comp/input/input';

function initFunction() {
  checkingTabKeyPress();
  initMenu();
}

window.addEventListener('DOMContentLoaded', initFunction);
