import './room-details.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initMenu from '@comp/header/js/initMenu';
import initSliderPreview from './js/initSliderPreview';
import initDiagramRating from '@comp/diagram/js/initDiagramRating';
import initDropdown from '@comp/dropdown/js/initDropdown';
import addDatePicker from '@comp/input/js/addDatePicker';
import toggleLikes from '@comp/like/js/toggleLikes';
import showTooltip from '@comp/card-booking/js/showTooltip';
import convertCost from '@comp/card-booking/js/convertCost';

function initFunction() {
  checkingTabKeyPress();
  initMenu();
  initSliderPreview();
  initDiagramRating('#rating-rooms');
  initDropdown({
    arrowToggle: false,
  });
  addDatePicker({
    $selectorId: '#card-booking-date',
    secondSelector: true,
    startDate: '2019-08-19',
    finishDate: '2019-08-23',
  });
  toggleLikes();
  showTooltip();
  convertCost();
}

window.addEventListener('DOMContentLoaded', initFunction);
