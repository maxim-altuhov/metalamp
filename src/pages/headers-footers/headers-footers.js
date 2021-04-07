import './headers-footers.scss';

import openingMenu from '@comp/header/header';

function contentLoaded() {
  openingMenu();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
