import '../button/button';
import addDatePicker from './js/addDatePicker';
import './datepicker.scss';
import './input-datepicker.scss';

const datepickerInputs = document.querySelectorAll('.js-input-datepicker');
datepickerInputs.forEach((elem) => addDatePicker(elem));
