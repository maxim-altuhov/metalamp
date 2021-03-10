import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import datepicker from 'air-datepicker';

function inputDatePicker() {
  $('.js-date-dropdown').datepicker({
    range: true,
    clearButton: true
  });
}

export default inputDatePicker;
