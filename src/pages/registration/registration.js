import './registration.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import '@comp/input/input';

function initFunction() {
  checkingTabKeyPress();
}

window.addEventListener('DOMContentLoaded', initFunction);
