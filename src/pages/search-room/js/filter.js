import {
  disableBodyScroll,
  enableBodyScroll
} from 'body-scroll-lock';

function initFilterToggle() {
  const blockFilter = document.querySelector('.js-search-room__aside');
  const btnToogleFilter = document.querySelector('.js-search-room__aside-btn');

  // открытие/закрытие фильтра
  function toggleFilter() {
    blockFilter.classList.toggle('search-room__aside_opened');
    btnToogleFilter.classList.toggle('search-room__aside-btn_opened');

    if (btnToogleFilter.classList.contains('search-room__aside-btn_opened')) {
      btnToogleFilter.textContent = 'Закрыть фильтр';
      disableBodyScroll(blockFilter);
    } else {
      btnToogleFilter.textContent = 'Открыть фильтр';
      enableBodyScroll(blockFilter);
    }
  }

  // отслеживание ресайза и видимости фильтра
  function resizeChecker() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      blockFilter.classList.remove('search-room__aside_opened');
      btnToogleFilter.classList.remove('search-room__aside-btn_opened');
      btnToogleFilter.textContent = 'Открыть фильтр';
      enableBodyScroll(blockFilter);
    }
  }

  window.addEventListener('resize', resizeChecker);
  btnToogleFilter.addEventListener('click', toggleFilter);
}

export default initFilterToggle;
