import '@lo/ui-kit/ui-kit';
import '@comp/ui-header/ui-header';
import checkingTabKeyPress from '@base/js/checkingTabKeyPress';
import initDropdown from '@comp/dropdown/js/initDropdown';
import addDatePicker from '@comp/input-datepicker/js/addDatePicker';
import initSlider from '@comp/card-room/js/initSlider';
import convertComment from '@comp/card-room/js/convertComment';
import '@comp/card-booking/card-booking';
import '@comp/card-input/card-input';

import './cards.scss';

function initFunction() {
  checkingTabKeyPress();
  // initDropdown();
  // addDatePicker({
  //   selectorId: '#card-search-date',
  //   isTwoDropdowns: true,
  // });
  // addDatePicker({
  //   selectorId: '#card-booking-date',
  //   isTwoDropdowns: true,
  //   startDate: '2019-08-19',
  //   finishDate: '2019-08-23',
  // });
  // addDatePicker({
  //   selectorId: '#date-filter-example',
  //   startDate: '2019-08-19',
  //   finishDate: '2019-08-23',
  // });
  initSlider();
  convertComment();
}

window.addEventListener('DOMContentLoaded', initFunction);
