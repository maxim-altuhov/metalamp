import './form-elements.scss';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import addMaskForInput from '@comp/input/input-mask';
import addDatePicker from '@comp/input/input-datepicker';
import initDropdown from '@comp/dropdown/dropdown';
import toggleLikes from '@comp/likebtn/likebtn';
import setRating from '@comp/rating/rating';
import rangeSlider from '@comp/range-slider/range-slider';
import initPagination from '@comp/pagination/pagination';

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
  toggleLikes();
  setRating();
  rangeSlider({
    selector: '#range-slider-1',
    start: [5000, 10000],
    min: 1000,
    max: 16000
  });
  initPagination({
    selector: '#pagination-1',
    maxItemPerPage: 12,
    maxPaginationElem: 5
  });
}

window.addEventListener('DOMContentLoaded', contentLoaded);
