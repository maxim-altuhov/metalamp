import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

function initFilterToggle() {
  const blockWithFilter = document.querySelector('.js-search-room__aside');
  const btnToggleFilter = document.querySelector('.js-search-room__aside-btn');
  const focusLimiter = document.querySelector('.js-search-room__limiter');
  const allElemCanToggleWithTab = blockWithFilter.querySelectorAll('input, button, [tabindex="0"]:not(input)');
  const maxWidthFilterIsActivated = 1100;

  // устанавливаем полям tabindex
  const setTabindex = (selector) => {
    selector.forEach(elem => {
      if (blockWithFilter.classList.contains('search-room__aside_opened')) {
        elem.setAttribute('tabindex', '0');
      } else if (window.matchMedia(`(max-width: ${maxWidthFilterIsActivated}px)`).matches) {
        elem.setAttribute('tabindex', '-1');
      } else {
        elem.setAttribute('tabindex', '0');
      }
    });
  };

  // открытие/закрытие фильтра
  const toggleFilter = () => {
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
  };

  // отслеживание ресайза и видимости фильтра
  const resizeChecker = () => {
    if (window.matchMedia(`(min-width: ${maxWidthFilterIsActivated + 1}px)`).matches) {
      blockWithFilter.classList.remove('search-room__aside_opened');
      btnToggleFilter.classList.remove('search-room__aside-btn_opened');
      btnToggleFilter.textContent = 'Открыть фильтр';
      enableBodyScroll(blockWithFilter);
    }
    setTabindex(allElemCanToggleWithTab);
  };

  // закрытие фильтра при потери фокуса на последнем элементе
  const setLimiterForFocus = () => {
    if (blockWithFilter.classList.contains('search-room__aside_opened')) toggleFilter();
  };

  // вызовы функций и обработчики
  setTabindex(allElemCanToggleWithTab);
  window.addEventListener('resize', resizeChecker);
  btnToggleFilter.addEventListener('click', toggleFilter);
  focusLimiter.addEventListener('focusout', setLimiterForFocus);
}

export default initFilterToggle;
