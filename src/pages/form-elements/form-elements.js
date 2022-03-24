import './form-elements.scss';

import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import '@comp/checkbox-list/checkbox-list';
import '@comp/checkbox/checkbox';
import '@comp/toggle/toggle';
import '@comp/simple-rating/simple-rating';
import '@comp/range-slider/range-slider';
import '@comp/button/button';
import '@comp/bullet-list/bullet-list';
import '@comp/like/like';
import '@comp/radio-btn/radio-btn';
import '@comp/input/input';
import '@comp/pagination/pagination';
import '@comp/info-icon/info-icon';
import '@comp/feedback/feedback';
import '@comp/dropdown/dropdown';
import '@comp/input-datepicker/input-datepicker';

function initFunction() {
  checkingTabKeyPress();
}

window.addEventListener('DOMContentLoaded', initFunction);
