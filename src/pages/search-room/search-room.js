import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import '@lo/page/page';
import '@comp/heading/heading';
import '@comp/input-datepicker/input-datepicker';
import '@comp/checkbox/checkbox';
import '@comp/checkbox-list/checkbox-list';
import '@comp/range-slider/range-slider';
import '@comp/dropdown/dropdown';
import '@comp/card-room/card-room';
import '@comp/pagination/pagination';

import initFilterToggle from './js/initFilterToggle';
import './search-room.scss';

function initFunction() {
  checkingTabKeyPress();
  initFilterToggle();
}

window.addEventListener('DOMContentLoaded', initFunction);
