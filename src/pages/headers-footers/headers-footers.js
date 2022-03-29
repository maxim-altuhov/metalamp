import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import '@lo/ui-kit/ui-kit';
import '@comp/ui-header/ui-header';
import '@comp/header/header';
import '@comp/footer/footer';
import '@comp/footer-copyright/footer-copyright';

import './headers-footers.scss';

function initFunction() {
  checkingTabKeyPress();
}

window.addEventListener('DOMContentLoaded', initFunction);
