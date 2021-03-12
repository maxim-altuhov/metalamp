import './form-elements.scss';
import addMaskForInput from '@comp/input/input-mask';
import addDatePicker from '@comp/input/input-datepicker';
import initDropdown from '@comp/dropdown/dropdown';

function contentLoaded() {
  addMaskForInput();
  addDatePicker({
    selector: '.js-date-dropdown'
  });
  initDropdown();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
