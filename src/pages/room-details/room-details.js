import './room-details.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initSliderPreview from './js/initSliderPreview';
import initDiagramRating from '@comp/diagram/js/initDiagramRating';
import addDatePicker from '@comp/input-datepicker/js/addDatePicker';
import '@comp/feedback/feedback';

function initFunction() {
  checkingTabKeyPress();
  initSliderPreview();
  initDiagramRating('#rating-rooms');
  addDatePicker({
    selectorId: '#card-booking-date',
    isTwoDropdowns: true,
    startDate: '2019-08-19',
    finishDate: '2019-08-23',
  });
}

window.addEventListener('DOMContentLoaded', initFunction);
