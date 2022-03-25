function initPagination(selector) {
  const pagesBlock = selector.querySelector('.js-pagination__pages');
  const controlButtons = selector.querySelectorAll('.js-pagination__btn');
  const btnPrev = selector.querySelector('.js-pagination__btn_type_prev');
  const btnNext = selector.querySelector('.js-pagination__btn_type_next');
  const infoCurrentElemOnPage = selector.querySelector('.js-pagination__current');
  const infoTotalElem = selector.querySelector('.js-pagination__total');
  const classesForPages = {
    DEFAULT: ['pagination__page', 'js-pagination__page'],
    WITH_ELLIPSIS: ['pagination__page_with_ellipsis', 'js-pagination__page_with_ellipsis'],
    ACTIVE: ['pagination__page_active', 'js-pagination__page_active'],
    HIDDEN: ['pagination__btn_hidden'],
    TOTAL: ['pagination__page_total', 'js-pagination__page_total'],
  };
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
      const classesForLastPage = [...classesForPages.DEFAULT, ...classesForPages.TOTAL];

      for (let index = 1; index <= totalPages && index <= numPagesToShow; index++) {
        const btn = document.createElement('button');
        const isBtnWithEllipsis = (index === numPagesToShow - 1) && (totalPages > numPagesToShow);
        btn.setAttribute('type', 'button');
        btn.classList.add(...classesForPages.DEFAULT);

        if (index === numPagesToShow) {
          btn.textContent = totalPages;
        } else if (isBtnWithEllipsis) {
          btn.classList.add(...classesForPages.WITH_ELLIPSIS);
          btn.textContent = '...';
        } else {
          btn.textContent = index;
        }

        fragment.append(btn);
      }
      fragment.lastElementChild.classList.add(...classesForLastPage);
      fragment.firstElementChild.classList.add(...classesForPages.ACTIVE);
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
    pageActive = selector.querySelector(`.${classesForPages.ACTIVE[1]}`);
    pageActiveAsNumber = Number(pageActive.textContent);
    pageTotal = selector.querySelector(`.${classesForPages.TOTAL[1]}`);
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
    let pageWithEllipsis = selector.querySelector(`.${classesForPages.WITH_ELLIPSIS[1]}`);

    btn.setAttribute('type', 'button');
    btn.classList.add(...classesForPages.DEFAULT);

    if (pageWithEllipsis) {
      if (pageActive === pageTotal) {
        pageWithEllipsis.textContent = pageTotalAsNumber - 1;
        pageWithEllipsis.classList.remove(...classesForPages.WITH_ELLIPSIS);
      }

      if (pageActiveAsNumber === pageTotalAsNumber - 3) {
        pageWithEllipsis.textContent = pageTotalAsNumber - 1;
        pageWithEllipsis.classList.remove(...classesForPages.WITH_ELLIPSIS);
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
      allPages[allPages.length - 2].classList.add(...classesForPages.WITH_ELLIPSIS);
      allPages[allPages.length - 3].remove();
      btn.textContent = pageActiveAsNumber - 1;
      fragment.append(btn);
      pageActive.before(fragment);
    }

    setEventForPageButtons();
  };

  // переключение видимости кнопок переключения страниц
  const toggleActiveBtn = () => {
    pageActive = selector.querySelector(`.${classesForPages.ACTIVE[1]}`);
    const moreThanOnePage = totalPages !== 1;
    const firstPageIsActive = pageActive.textContent === '1';
    const lastPageIsActive = pageActive.textContent === pageTotal.textContent;

    if (firstPageIsActive && moreThanOnePage) {
      btnPrev.classList.add(...classesForPages.HIDDEN);
      btnNext.classList.remove(...classesForPages.HIDDEN);
    } else if (lastPageIsActive && moreThanOnePage) {
      btnNext.classList.add(...classesForPages.HIDDEN);
      btnPrev.classList.remove(...classesForPages.HIDDEN);
    } else if (totalPages === 1) {
      btnNext.classList.add(...classesForPages.HIDDEN);
      btnPrev.classList.add(...classesForPages.HIDDEN);
    } else {
      btnPrev.classList.remove(...classesForPages.HIDDEN);
      btnNext.classList.remove(...classesForPages.HIDDEN);
    }
  };

  // переключение активной страницы
  const handlePageClick = (e) => {
    if (!e.target.classList.contains(`.${classesForPages.WITH_ELLIPSIS[1]}`)) {
      allPages.forEach((page) => {
        page.classList.remove(...classesForPages.ACTIVE);
      });
      e.target.classList.add(...classesForPages.ACTIVE);
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
      pageActive.classList.remove(...classesForPages.ACTIVE);
      prevPageLink.classList.add(...classesForPages.ACTIVE);
    } else {
      pageActive.classList.remove(...classesForPages.ACTIVE);
      nextPageLink.classList.add(...classesForPages.ACTIVE);
    }
    toggleActiveBtn();
    refreshInfoCurrentElemOnPage();
    addPaginationPages();
  };

  // навешиваем обработчик на кнопки переключения страниц
  function setEventForPageButtons() {
    allPages = selector.querySelectorAll(`.${classesForPages.DEFAULT[1]}`);
    allPages.forEach((page) => {
      if (!page.classList.contains(`.${classesForPages.WITH_ELLIPSIS[1]}`)) {
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
