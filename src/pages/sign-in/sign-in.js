import './sign-in.scss';

import { checkedFocus } from '@base/base';
import initMenu from '@comp/header/header';

function contentLoaded() {
  checkedFocus();
  initMenu();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
