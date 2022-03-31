import '@comp/button/button';

import initMenu from './js/initMenu';
import './header.scss';

const headers = document.querySelectorAll('.js-header');
headers.forEach((elem) => initMenu(elem));
