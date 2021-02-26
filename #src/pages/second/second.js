import {
  testLog
} from './test.js.js';
import './index.css';
import './index.scss';

function contentLoaded() {
  testLog();
  // комментарий
}

window.addEventListener('DOMContentLoaded', contentLoaded);
