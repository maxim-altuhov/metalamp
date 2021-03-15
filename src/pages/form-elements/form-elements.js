import './form-elements.scss';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import addMaskForInput from '@comp/input/input-mask';
import addDatePicker from '@comp/input/input-datepicker';
import initDropdown from '@comp/dropdown/dropdown';

function contentLoaded() {
  addMaskForInput();
  addDatePicker({
    $selector: $('.js-date-dropdown'),
    $secondSelector: $('.js-date-dropdown_second'),
    options: {
      classes: 'js-datepicker-1',
      range: true,
      multipleDatesSeparator: '-',
      prevHtml: '<span class="material-icons">arrow_back</span>',
      nextHtml: '<span class="material-icons">arrow_forward</span>',
      navTitles: {
        days: 'MM <i>yyyy</i>'
      },
      offset: 5,
      minDate: new Date(),
      onSelect: (fd) => {
        $('#start_datepicker').val(fd.split('-')[0]);
        $('#end_datepicker').val(fd.split('-')[1]);
      },
      onShow: () => {
        $('.js-date-dropdown__calendar').next('.material-icons').addClass('active');
      },
      onHide: () => {
        $('.js-date-dropdown__calendar').next('.material-icons').removeClass('active');
      }
    }
  });
  addDatePicker({
    $selector: $('.js-date-dropdown__filter'),
    options: {
      classes: 'js-datepicker-2',
      range: true,
      multipleDatesSeparator: ' - ',
      prevHtml: '<span class="material-icons">arrow_back</span>',
      nextHtml: '<span class="material-icons">arrow_forward</span>',
      navTitles: {
        days: 'MM <i>yyyy</i>'
      },
      offset: 5,
      language: {
        dateFormat: 'dd M',
        monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
      },
      minDate: new Date(),
      onShow: () => {
        $('.js-date-dropdown__filter').next('.material-icons').addClass('active');
      },
      onHide: () => {
        $('.js-date-dropdown__filter').next('.material-icons').removeClass('active');
      }
    }
  });
  initDropdown();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
