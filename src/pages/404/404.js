import './404.scss';

import checkedFocus from '@base/js/checkedFocus';
import initMenu from '@comp/header/js/initMenu';

function initFunction() {
  checkedFocus();
  initMenu();
}

window.addEventListener('DOMContentLoaded', initFunction);
