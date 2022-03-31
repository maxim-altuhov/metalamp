import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import '@lo/ui-kit/ui-kit';
import '@comp/ui-header/ui-header';
import '@comp/card-search/card-search';
import '@comp/card-booking/card-booking';
import '@comp/card-input/card-input';
import '@comp/card-reg/card-reg';
import '@comp/card-room/card-room';
import '@comp/input-datepicker/input-datepicker';

import './cards.scss';

function initFunction() {
  checkingTabKeyPress();
}

window.addEventListener('DOMContentLoaded', initFunction);
