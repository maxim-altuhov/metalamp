import '@base/base';
import '@comp/ui-kit/logo/logo';
import './form-elements.scss';
import dropdown from './js/dropdown.js';

function contentLoaded() {
  dropdown();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
