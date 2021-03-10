import './form-elements.scss';
import maskForInput from '@comp/input/input-date';
import inputDatePicker from '@comp/input/input-datepicker';
import dropdown from '@comp/dropdown/dropdown';

function contentLoaded() {
  maskForInput();
  inputDatePicker();
  dropdown();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
