import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import {
  testLog
} from '@page/test1/test.js';
import './index.css';
import './scss.scss';

function contentLoaded() {
  testLog();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
