import '@lo/page/page';
import './404.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';

function initFunction() {
  checkingTabKeyPress();
}

window.addEventListener('DOMContentLoaded', initFunction);
