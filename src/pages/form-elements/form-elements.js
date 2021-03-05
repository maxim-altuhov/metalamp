import '@base/base';
import '@comp/logo/logo';
import '@comp/input/input';
import '@comp/dropdown/dropdown';
import './form-elements.scss';

import dropdown from '@comp/dropdown/dropdown';

function contentLoaded() {
  dropdown();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
