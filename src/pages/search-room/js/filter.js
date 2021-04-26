import {
  disableBodyScroll,
  enableBodyScroll
} from 'body-scroll-lock';

function initFilterToggle() {
  const blockWithFilter = document.querySelector('.js-search-room__aside');
  const btnToggleFilter = document.querySelector('.js-search-room__aside-btn');
  const focusLimiter = document.querySelector('.js-search-room__limiter');
  const allElemCanToggleWithTab = blockWithFilter.querySelectorAll('input, button, [tabindex="0"]:not(input)');

  // устанавливаем полям tabindex
  function setTabindex(selector) {
    selector.forEach(elem => {
      if (blockWithFilter.classList.contains('search-room__aside_opened')) {
        elem.setAttribute('tabindex', '0');
      } else if (window.matchMedia('(max-width: 1100px)').matches) {
        elem.setAttribute('tabindex', '-1');
      } else {
        elem.setAttribute('tabindex', '0');
      }
    });
  }

  // открытие/закрытие фильтра
  function toggleFilter() {
    blockWithFilter.classList.toggle('search-room__aside_opened');
    btnToggleFilter.classList.toggle('search-room__aside-btn_opened');

    if (btnToggleFilter.classList.contains('search-room__aside-btn_opened')) {
      btnToggleFilter.textContent = 'Закрыть фильтр';
      disableBodyScroll(blockWithFilter);
    } else {
      btnToggleFilter.textContent = 'Открыть фильтр';
      enableBodyScroll(blockWithFilter);
    }
    setTabindex(allElemCanToggleWithTab);
  }

  // отслеживание ресайза и видимости фильтра
  function resizeChecker() {
    if (window.matchMedia('(min-width: 1101px)').matches) {
      blockWithFilter.classList.remove('search-room__aside_opened');
      btnToggleFilter.classList.remove('search-room__aside-btn_opened');
      btnToggleFilter.textContent = 'Открыть фильтр';
      enableBodyScroll(blockWithFilter);
    }
    setTabindex(allElemCanToggleWithTab);
  }

  function setLimiterForFocus() {
    if (blockWithFilter.classList.contains('search-room__aside_opened')) toggleFilter();
  }

  setTabindex(allElemCanToggleWithTab);
  window.addEventListener('resize', resizeChecker);
  btnToggleFilter.addEventListener('click', toggleFilter);
  focusLimiter.addEventListener('focusout', setLimiterForFocus);
}

export default initFilterToggle;
