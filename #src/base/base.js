import './base.scss';
import webp from './libs/webp';

function contentLoaded() {
  webp();
  console.log('базовый base.js');
}

window.addEventListener('DOMContentLoaded', contentLoaded);
