import './room-details.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initMenu from '@comp/header/js/initMenu';
import initSliderPreview from './js/initSliderPreview';
import initDiagramRating from '@comp/diagram/js/initDiagramRating';
import addDatePicker from '@comp/input-datepicker/js/addDatePicker';
import showTooltip from '@comp/card-booking/js/showTooltip';
import convertCost from '@comp/card-booking/js/convertCost';
import '@comp/feedback/feedback';

function initFunction() {
  checkingTabKeyPress();
  initMenu();
  initSliderPreview();
  initDiagramRating('#rating-rooms');
  addDatePicker({
    selectorId: '#card-booking-date',
    isTwoDropdowns: true,
    startDate: '2019-08-19',
    finishDate: '2019-08-23',
  });
  showTooltip();
  convertCost();
}

window.addEventListener('DOMContentLoaded', initFunction);
