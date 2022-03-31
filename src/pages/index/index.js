import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import '@lo/page/page';
import '@comp/card-search/card-search';

import './index.scss';

function initFunction() {
  checkingTabKeyPress();
}

window.addEventListener('DOMContentLoaded', initFunction);
