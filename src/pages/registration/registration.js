import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import '@lo/page/page';
import '@comp/card-reg/card-reg';

import './registration.scss';

function initFunction() {
  checkingTabKeyPress();
}

window.addEventListener('DOMContentLoaded', initFunction);
