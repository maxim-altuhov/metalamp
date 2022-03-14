import './headers-footers.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initMenu from '@comp/header/js/initMenu';

function initFunction() {
  checkingTabKeyPress();
  initMenu();
}

window.addEventListener('DOMContentLoaded', initFunction);
