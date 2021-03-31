import './cards.scss';

import { checkedFocus } from '@base/base';
import initDropdown from '@comp/dropdown/dropdown';

function contentLoaded() {
  checkedFocus();
  initDropdown({});
}

window.addEventListener('DOMContentLoaded', contentLoaded);
