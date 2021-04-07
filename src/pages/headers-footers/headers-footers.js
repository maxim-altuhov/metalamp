import './headers-footers.scss';

import { checkedFocus } from '@base/base';
import openingMenu from '@comp/header/header';

function contentLoaded() {
  checkedFocus();
  openingMenu();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
