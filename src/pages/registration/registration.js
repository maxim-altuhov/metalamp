import './registration.scss';

import { checkedFocus } from '@base/base';
import initMenu from '@comp/header/header';
import addMaskForInput from '@comp/input/input-mask';

function contentLoaded() {
  checkedFocus();
  initMenu();
  addMaskForInput();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
