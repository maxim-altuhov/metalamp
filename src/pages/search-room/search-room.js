import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initFilterToggle from './js/initFilterToggle';
import '@lo/page/page';
import '@comp/input-datepicker/input-datepicker';
import '@comp/checkbox/checkbox';
import '@comp/checkbox-list/checkbox-list';
import '@comp/range-slider/range-slider';
import '@comp/dropdown/dropdown';
import '@comp/card-room/card-room';
import '@comp/pagination/pagination';

import './search-room.scss';

function initFunction() {
  checkingTabKeyPress();
  initFilterToggle();
}

window.addEventListener('DOMContentLoaded', initFunction);
