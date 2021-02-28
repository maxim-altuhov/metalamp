import '@base/base';
import '@comp/block/block';
import './index.scss';

function contentLoaded() {
  console.log('тестовый index.js');
}

window.addEventListener('DOMContentLoaded', contentLoaded);
