import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import '@lo/page/page';
import '@comp/heading/heading';
import '@comp/info-icon/info-icon';
import '@comp/card-booking/card-booking';
import '@comp/bullet-list/bullet-list';
import '@comp/diagram/diagram';
import '@comp/feedback/feedback';

import initSliderPreview from './js/initSliderPreview';
import './room-details.scss';

function initFunction() {
  checkingTabKeyPress();
  initSliderPreview();
}

window.addEventListener('DOMContentLoaded', initFunction);
