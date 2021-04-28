import './room-details.scss';

import { checkedFocus } from '@base/base';
import initSliderPreview from './js/slider-preview';
import initMenu from '@comp/header/header';
import initDiagramRating from '@comp/diagram/diagram';
import initDropdown from '@comp/dropdown/dropdown';
import addDatePicker from '@comp/input/input-datepicker';
import toggleLikes from '@comp/likebtn/likebtn';
import { showTooltip, convertCost } from '@comp/card-booking/card-booking';

function contentLoaded() {
  checkedFocus();
  initSliderPreview();
  initMenu();
  initDiagramRating('#rating-rooms');
  initDropdown({
    arrowToggle: false
  });
  addDatePicker({
    $selectorId: '#card-booking-date',
    secondSelector: true,
    startDate: '2019-08-19',
    finishDate: '2019-08-23'
  });
  toggleLikes();
  showTooltip();
  convertCost();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
