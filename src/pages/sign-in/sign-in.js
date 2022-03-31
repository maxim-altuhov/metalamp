import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import '@lo/page/page';
import '@comp/card-input/card-input';

import './sign-in.scss';

function initFunction() {
  checkingTabKeyPress();
}

window.addEventListener('DOMContentLoaded', initFunction);
