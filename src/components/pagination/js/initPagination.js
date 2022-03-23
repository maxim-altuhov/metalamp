function initPagination(selector) {
  const pagesBlock = selector.querySelector('.js-pagination__pages');
  const controlButtons = selector.querySelectorAll('.js-pagination__btn');
  const btnPrev = selector.querySelector('.js-pagination__btn_type_prev');
  const btnNext = selector.querySelector('.js-pagination__btn_type_next');
  const infoCurrentElemOnPage = selector.querySelector('.js-pagination__current');
  const infoTotalElem = selector.querySelector('.js-pagination__total');
  let options;

  try {
    options = JSON.parse(selector.dataset.options);
  } catch {
    // Incorrect options are passed to the script. Will use the default options.
    options = {
      maxElemPerPage: 1,
      numPagesToShow: 1,
      totalElements: 1,
    };
  }

  /* beautify preserve:start */
  const {
    maxElemPerPage = 1,
    numPagesToShow = 1,
    totalElements = 1,
  } = options;
  /* beautify preserve:end */

  let allPages;
  let pageActive;
  let pageActiveAsNumber;
  let pageTotal;
  let pageTotalAsNumber;
  let totalPages = Math.ceil(totalElements / maxElemPerPage);

  // формирует кнопки пагинации
  const creatPaginationPages = () => {
    return new Promise((resolve) => {
      const fragment = document.createDocumentFragment();

      for (let index = 1; index <= totalPages && index <= numPagesToShow; index++) {
        const btn = document.createElement('button');
        const isBtnWithEllipsis = (index === numPagesToShow - 1) && (totalPages > numPagesToShow);
        btn.setAttribute('type', 'button');
        btn.classList.add('pagination__page', 'js-pagination__page');

        if (index === numPagesToShow) {
          btn.textContent = totalPages;
        } else if (isBtnWithEllipsis) {
          btn.classList.add('pagination__page_with_ellipsis', 'js-pagination__page_with_ellipsis');
          btn.textContent = '...';
        } else {
          btn.textContent = index;
        }

        fragment.append(btn);
      }
      fragment.lastElementChild.classList.add('pagination__page', 'js-pagination__page', 'pagination__page_total', 'js-pagination__page_total');
      fragment.firstElementChild.classList.add('pagination__page_active', 'js-pagination__page_active');
      pagesBlock.append(fragment);
      resolve();
    });
  };

  // подсчёт и вывод общего кол-ва элементов на странице
  const showInfoTotalElem = () => {
    if (totalElements > 100) {
      infoTotalElem.textContent = '100+';
    } else {
      infoTotalElem.textContent = totalElements;
    }
  };

  // обновление информации по кол-ву текущих элементов на странице
  const refreshInfoCurrentElemOnPage = () => {
    pageActive = selector.querySelector('.js-pagination__page_active');
    pageActiveAsNumber = Number(pageActive.textContent);
    pageTotal = selector.querySelector('.js-pagination__page_total');
    pageTotalAsNumber = Number(pageTotal.textContent);
    let upperLimitOfTheRange = maxElemPerPage * pageActiveAsNumber;

    if (upperLimitOfTheRange > totalElements) upperLimitOfTheRange = totalElements;

    let lowerLimitOfTheRange = upperLimitOfTheRange - maxElemPerPage + 1;
    infoCurrentElemOnPage.textContent = `${lowerLimitOfTheRange} – ${upperLimitOfTheRange}`;
  };

  // функция добавления элементов в блоке пагинации
  const addPaginationPages = () => {
    const fragment = document.createDocumentFragment();
    const btn = document.createElement('button');
    let pageWithEllipsis = selector.querySelector('.js-pagination__page_with_ellipsis');

    btn.setAttribute('type', 'button');
    btn.classList.add('pagination__page', 'js-pagination__page');

    if (pageWithEllipsis) {
      if (pageActive === pageTotal) {
        pageWithEllipsis.textContent = pageTotalAsNumber - 1;
        pageWithEllipsis.classList.remove('pagination__page_with_ellipsis', 'js-pagination__page_with_ellipsis');
      }

      if (pageActiveAsNumber === pageTotalAsNumber - 3) {
        pageWithEllipsis.textContent = pageTotalAsNumber - 1;
        pageWithEllipsis.classList.remove('pagination__page_with_ellipsis', 'js-pagination__page_with_ellipsis');
      }

      if (pageActive === allPages[allPages.length - 3]) {
        allPages[0].remove();
        btn.textContent = pageActiveAsNumber + 1;
        fragment.append(btn);
        pageActive.after(fragment);
      }

      if (pageActive === allPages[allPages.length - 1]) {
        let calcPageNum = pageTotalAsNumber - Number(allPages.length) + 1;

        for (let index = 0; index <= allPages.length - 1; index++) {
          allPages[index].textContent = calcPageNum;
          calcPageNum += 1;
        }
      }
    }

    const firstPageIsActiveAndIsNotEqualOne = pageActive === allPages[0] && allPages[0].textContent !== '1';

    if (firstPageIsActiveAndIsNotEqualOne) {
      allPages[allPages.length - 2].textContent = '...';
      allPages[allPages.length - 2].classList.add('pagination__page_with_ellipsis', 'js-pagination__page_with_ellipsis');
      allPages[allPages.length - 3].remove();
      btn.textContent = pageActiveAsNumber - 1;
      fragment.append(btn);
      pageActive.before(fragment);
    }

    // eslint-disable-next-line no-use-before-define
    setEventForPageButtons();
  };

  // переключение видимости кнопок переключения страниц
  const toggleActiveBtn = () => {
    pageActive = selector.querySelector('.js-pagination__page_active');
    const moreThanOnePage = totalPages !== 1;
    const firstPageIsActive = pageActive.textContent === '1';
    const lastPageIsActive = pageActive.textContent === pageTotal.textContent;

    if (firstPageIsActive && moreThanOnePage) {
      btnPrev.classList.add('pagination__btn_hidden');
      btnNext.classList.remove('pagination__btn_hidden');
    } else if (lastPageIsActive && moreThanOnePage) {
      btnNext.classList.add('pagination__btn_hidden');
      btnPrev.classList.remove('pagination__btn_hidden');
    } else if (totalPages === 1) {
      btnNext.classList.add('pagination__btn_hidden');
      btnPrev.classList.add('pagination__btn_hidden');
    } else {
      btnPrev.classList.remove('pagination__btn_hidden');
      btnNext.classList.remove('pagination__btn_hidden');
    }
  };

  // переключение активной страницы
  const handlePageClick = (e) => {
    if (!e.target.classList.contains('js-pagination__page_with_ellipsis')) {
      allPages.forEach((page) => {
        page.classList.remove('pagination__page_active', 'js-pagination__page_active');
      });
      e.target.classList.add('pagination__page_active', 'js-pagination__page_active');
      toggleActiveBtn();
      refreshInfoCurrentElemOnPage();
      addPaginationPages();
    }
  };

  // переключение страниц с помощью контрольных кнопок
  const handleBtnClick = (e) => {
    const nextPageLink = pageActive.nextElementSibling;
    const prevPageLink = pageActive.previousElementSibling;

    if (e.target.classList.contains('js-pagination__btn_type_prev')) {
      pageActive.classList.remove('pagination__page_active', 'js-pagination__page_active');
      prevPageLink.classList.add('pagination__page_active', 'js-pagination__page_active');
    } else {
      pageActive.classList.remove('pagination__page_active', 'js-pagination__page_active');
      nextPageLink.classList.add('pagination__page_active', 'js-pagination__page_active');
    }
    toggleActiveBtn();
    refreshInfoCurrentElemOnPage();
    addPaginationPages();
  };

  // навешиваем обработчик на кнопки переключения страниц
  function setEventForPageButtons() {
    allPages = selector.querySelectorAll('.js-pagination__page');
    allPages.forEach((page) => {
      if (!page.classList.contains('js-pagination__page_with_ellipsis')) {
        page.addEventListener('click', handlePageClick);
      }
    });
  }

  // обработчики и вызов функций
  creatPaginationPages()
    .then(refreshInfoCurrentElemOnPage)
    .then(setEventForPageButtons)
    .then(toggleActiveBtn);
  showInfoTotalElem();

  controlButtons.forEach((btn) => btn.addEventListener('click', handleBtnClick));
}

export default initPagination;
