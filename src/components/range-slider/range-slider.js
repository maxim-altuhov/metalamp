import '@comp/heading/heading';

import initRangeSlider from './js/initRangeSlider';
import './range-slider.scss';

const rangeSliderElements = document.querySelectorAll('.js-range-slider');
rangeSliderElements.forEach((elem) => initRangeSlider(elem));
