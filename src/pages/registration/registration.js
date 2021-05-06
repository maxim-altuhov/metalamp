import './registration.scss';

import checkedFocus from '@base/js/checkedFocus';
import initMenu from '@comp/header/js/initMenu';
import addMaskForInput from '@comp/input/js/addMaskForInput';

function initFunction() {
  checkedFocus();
  initMenu();
  addMaskForInput();
}

window.addEventListener('DOMContentLoaded', initFunction);
