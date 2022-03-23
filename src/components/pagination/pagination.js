import initPagination from './js/initPagination';
import './pagination.scss';

const paginationBlocks = document.querySelectorAll('.js-pagination');
paginationBlocks.forEach((elem) => initPagination(elem));
