import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initSliderPreview from './js/initSliderPreview';
import '@lo/page/page';
import '@comp/info-icon/info-icon';
import '@comp/card-booking/card-booking';
import '@comp/bullet-list/bullet-list';
import '@comp/diagram/diagram';
import '@comp/feedback/feedback';

import './room-details.scss';

import initDiagramRating from '@comp/diagram/js/initDiagramRating';

function initFunction() {
  checkingTabKeyPress();
  initSliderPreview();
  initDiagramRating('#rating-rooms');
}

window.addEventListener('DOMContentLoaded', initFunction);
