function initPagination({ selector, maxItemPerPage, maxPaginationElem }) {
  const mainSelector = document.querySelector(selector);
  const pagesBlock = mainSelector.querySelector('.js-pagination__pages');
  const buttons = mainSelector.querySelectorAll('.js-pagination__btn');
  const btnPrev = mainSelector.querySelector('.js-pagination__btn_prev');
  const btnNext = mainSelector.querySelector('.js-pagination__btn_next');
  const infoCurrentPages = mainSelector.querySelector('.js-pagination__current');
  const infoTotalPages = mainSelector.querySelector('.js-pagination__total');
  let pagesAllArray;
  let pageActive;
  let pageActiveTypeNumber;
  let pageTotal;
  let pageTotalTypeNumber;
  let maxElemenetsPerPage = maxItemPerPage;
  let visiblePaginationElem = maxPaginationElem;
  let totalElements = 180;
  let howManyPages = Math.ceil(totalElements / maxElemenetsPerPage);

  // формирует кнопки пагинации
  const creatPaginationPages = () => {
    return new Promise((resolve) => {
      const fragment = document.createDocumentFragment();

      for (let i = 1; i <= howManyPages && i <= visiblePaginationElem; i++) {
        const item = document.createElement('button');
        item.setAttribute('type', 'button');
        item.classList.add('pagination__page', 'js-pagination__page');

        if (i === visiblePaginationElem) {
          item.textContent = howManyPages;
        } else if (i === visiblePaginationElem - 1 && howManyPages > visiblePaginationElem) {
          item.classList.add('pagination__page_disabled', 'js-pagination__page_disabled');
          item.textContent = '...';
        } else {
          item.textContent = i;
        }

        fragment.append(item);
      }
      fragment.lastElementChild.classList.add('pagination__page', 'js-pagination__page', 'pagination__page_total', 'js-pagination__page_total');
      fragment.firstElementChild.classList.add('pagination__page_active', 'js-pagination__page_active');
      pagesBlock.append(fragment);
      resolve();
    });
  };

  // подсчёт и вывод общего кол-ва элементов на странице
  const refreshInfoPagesTotal = () => {
    if (totalElements > 100) {
      infoTotalPages.textContent = '100+';
    } else {
      infoTotalPages.textContent = totalElements;
    }
  };

  // обновление информации по кол-ву текущих элементов на странице
  const refreshInfoPages = () => {
    pageActive = mainSelector.querySelector('.js-pagination__page_active');
    pageActiveTypeNumber = Number(pageActive.textContent);
    pageTotal = mainSelector.querySelector('.js-pagination__page_total');
    pageTotalTypeNumber = Number(pageTotal.textContent);
    let upperLimitOfTheRange = maxElemenetsPerPage * pageActiveTypeNumber;

    if (upperLimitOfTheRange > totalElements) {
      upperLimitOfTheRange = totalElements;
    }

    let lowerLimitOfTheRange = upperLimitOfTheRange - maxElemenetsPerPage + 1;
    infoCurrentPages.textContent = `${lowerLimitOfTheRange} – ${upperLimitOfTheRange}`;
  };

  // функция добавления элементов в блоке пагинации
  const addPaginationPages = () => {
    const fragment = document.createDocumentFragment();
    const item = document.createElement('button');
    let pageDisabled = mainSelector.querySelector('.js-pagination__page_disabled');

    item.setAttribute('type', 'button');
    item.classList.add('pagination__page', 'js-pagination__page');

    if (pageDisabled && pageActive === pageTotal) {
      pageDisabled.textContent = pageTotalTypeNumber - 1;
      pageDisabled.classList.remove('pagination__page_disabled', 'js-pagination__page_disabled');
    }

    if (pageDisabled && pageActiveTypeNumber === pageTotalTypeNumber - 3) {
      pageDisabled.textContent = pageTotalTypeNumber - 1;
      pageDisabled.classList.remove('pagination__page_disabled', 'js-pagination__page_disabled');
    }

    if (pageDisabled && pageActive === pagesAllArray[pagesAllArray.length - 3]) {
      pagesAllArray[0].remove();
      item.textContent = pageActiveTypeNumber + 1;
      fragment.append(item);
      pageActive.after(fragment);
    }

    if (pageActive === pagesAllArray[0] && pagesAllArray[0].textContent !== '1') {
      pagesAllArray[pagesAllArray.length - 2].textContent = '...';
      pagesAllArray[pagesAllArray.length - 2].classList.add('pagination__page_disabled', 'js-pagination__page_disabled');
      pagesAllArray[pagesAllArray.length - 3].remove();
      item.textContent = pageActiveTypeNumber - 1;
      fragment.append(item);
      pageActive.before(fragment);
    }

    if (pageDisabled && pageActive === pagesAllArray[pagesAllArray.length - 1]) {
      let n = pageTotalTypeNumber - Number(pagesAllArray.length) + 1;
      for (let i = 0; i <= pagesAllArray.length - 1; i++) {
        pagesAllArray[i].textContent = n;
        n += 1;
      }
    }

    addEventForPages();
  };

  // переключение видимости кнопок переключения страниц
  const toggleActiveBtn = () => {
    pageActive = mainSelector.querySelector('.js-pagination__page_active');

    if (pageActive.textContent === '1') {
      btnPrev.classList.add('pagination__btn_hidden');
      btnNext.classList.remove('pagination__btn_hidden');
    } else if (pageActive.textContent === pageTotal.textContent) {
      btnNext.classList.add('pagination__btn_hidden');
      btnPrev.classList.remove('pagination__btn_hidden');
    } else {
      btnPrev.classList.remove('pagination__btn_hidden');
      btnNext.classList.remove('pagination__btn_hidden');
    }
  };

  // переключение активной страницы
  const changeActivePage = (e) => {
    if (!e.target.classList.contains('js-pagination__page_disabled')) {
      pagesAllArray.forEach(elem => {
        elem.classList.remove('pagination__page_active', 'js-pagination__page_active');
      });
      e.target.classList.add('pagination__page_active', 'js-pagination__page_active');
      toggleActiveBtn();
      refreshInfoPages();
      addPaginationPages();
    }
  };

  // переключение страниц с помощью кнопок
  const changePageUsingTheBtn = (e) => {
    const nextPageLink = pageActive.nextElementSibling;
    const prevPageLink = pageActive.previousElementSibling;

    if (e.target.classList.contains('js-pagination__btn_prev')) {
      pageActive.classList.remove('pagination__page_active', 'js-pagination__page_active');
      prevPageLink.classList.add('pagination__page_active', 'js-pagination__page_active');
    } else {
      pageActive.classList.remove('pagination__page_active', 'js-pagination__page_active');
      nextPageLink.classList.add('pagination__page_active', 'js-pagination__page_active');
    }
    toggleActiveBtn();
    refreshInfoPages();
    addPaginationPages();
  };

  // навешиваем обработчик на кнопки
  function addEventForPages() {
    pagesAllArray = mainSelector.querySelectorAll('.js-pagination__page');
    pagesAllArray.forEach(elem => {
      if (!elem.classList.contains('js-pagination__page_disabled')) {
        elem.addEventListener('click', changeActivePage);
      }
    });
  }

  // обработчики и вызов функций
  creatPaginationPages()
    .then(refreshInfoPages)
    .then(addEventForPages);
  refreshInfoPagesTotal();

  buttons.forEach(elem => {
    elem.addEventListener('click', changePageUsingTheBtn);
  });
}

export default initPagination;
