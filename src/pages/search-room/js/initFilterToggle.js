import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

function initFilterToggle() {
  const blockWithFilter = document.querySelector('.js-search-room__aside');
  const btnToggleFilter = document.querySelector('.js-search-room__aside-btn');
  const focusLimiter = document.querySelector('.js-search-room__limiter');
  const allElemCanToggleWithTab = blockWithFilter.querySelectorAll('input, button, [tabindex="0"]:not(input)');
  const WIDTH_WHEN_FILTER_IS_ACTIVATED = 1100;

  // устанавливаем полям tabindex
  const setTabindex = (elements) => {
    elements.forEach((elem) => {
      if (blockWithFilter.classList.contains('search-room__aside_opened')) {
        elem.setAttribute('tabindex', '0');
      } else if (window.matchMedia(`(max-width: ${WIDTH_WHEN_FILTER_IS_ACTIVATED}px)`).matches) {
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
  const handleWindowResize = () => {
    if (window.matchMedia(`(min-width: ${WIDTH_WHEN_FILTER_IS_ACTIVATED + 1}px)`).matches) {
      blockWithFilter.classList.remove('search-room__aside_opened');
      btnToggleFilter.classList.remove('search-room__aside-btn_opened');
      btnToggleFilter.textContent = 'Открыть фильтр';
      enableBodyScroll(blockWithFilter);
    }

    setTabindex(allElemCanToggleWithTab);
  };

  // закрытие фильтра при потери фокуса на последнем элементе
  const handleLimiterFocusout = () => {
    if (blockWithFilter.classList.contains('search-room__aside_opened')) toggleFilter();
  };

  const handleAsideBtnClick = () => toggleFilter();

  // вызовы функций и обработчики
  setTabindex(allElemCanToggleWithTab);
  window.addEventListener('resize', handleWindowResize);
  btnToggleFilter.addEventListener('click', handleAsideBtnClick);
  focusLimiter.addEventListener('focusout', handleLimiterFocusout);
}

export default initFilterToggle;
