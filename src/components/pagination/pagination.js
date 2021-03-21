function initPagination({ selector, maxItemPerPage, maxPaginationElem }) {
  const pBlock = document.querySelector(selector);
  const pPagesBlock = pBlock.querySelector('.pagination__pages');
  const pBtn = pBlock.querySelectorAll('.pagination__btn');
  const pBtnPrev = pBlock.querySelector('.pagination__btn_prev');
  const pBtnNext = pBlock.querySelector('.pagination__btn_next');
  const pInfoCurrent = pBlock.querySelector('.pagination__current');
  const pInfoTotal = pBlock.querySelector('.pagination__total');
  let pPages;
  let pageActive;
  let pageTotal;
  let maxElemenetsPerPage = maxItemPerPage;
  let visiblePaginationElem = maxPaginationElem;
  let totalElements = 180;
  const howManyPages = Math.ceil(totalElements / maxElemenetsPerPage);

  // формирует кнопки пагинации
  function creatPaginationPages() {
    return new Promise((resolve) => {
      const fragment = document.createDocumentFragment();

      for (let i = 1; i <= howManyPages && i <= visiblePaginationElem; i++) {
        const item = document.createElement('span');
        item.classList.add('pagination__page');

        if (i === visiblePaginationElem) {
          item.textContent = howManyPages;
        } else if (i === visiblePaginationElem - 1 && howManyPages > visiblePaginationElem) {
          item.classList.add('pagination__page_off');
          item.textContent = '...';
        } else {
          item.textContent = i;
        }

        fragment.append(item);
      }
      fragment.lastElementChild.classList.add('pagination__page', 'pagination__page_total');
      fragment.firstElementChild.classList.add('pagination__page_active');
      pPagesBlock.append(fragment);
      resolve();
    });
  }

  // подсчёт и вывод общего кол-ва элементов
  function refreshInfoPagesTotal() {
    if (totalElements > 100) {
      pInfoTotal.textContent = '100+';
    } else {
      pInfoTotal.textContent = totalElements;
    }
  }

  // обновление информации по кол-ву текущих элементов
  function refreshInfoPages() {
    pageActive = pBlock.querySelector('.pagination__page_active');
    pageTotal = pBlock.querySelector('.pagination__page_total');
    let maxNum = maxElemenetsPerPage * +pageActive.textContent;

    if (maxNum > totalElements) {
      maxNum = totalElements;
    }

    let minNum = maxNum - maxElemenetsPerPage + 1;
    pInfoCurrent.textContent = `${minNum} – ${maxNum}`;
  }

  // функция добавления нужных кнопок пагинации при переключении страниц
  function addPaginationPages() {
    let pageNoNumber = pBlock.querySelector('.pagination__page_off');
    const fragment = document.createDocumentFragment();
    const item = document.createElement('span');
    item.classList.add('pagination__page');

    if (pageNoNumber && pageActive === pageTotal) {
      pageNoNumber.textContent = +pageTotal.textContent - 1;
      pageNoNumber.classList.remove('pagination__page_off');
    }

    if (pageNoNumber && +pageActive.textContent === +pageTotal.textContent - 3) {
      pageNoNumber.textContent = +pageTotal.textContent - 1;
      pageNoNumber.classList.remove('pagination__page_off');
    }

    if (pageNoNumber && pageActive === pPages[pPages.length - 3]) {
      pPages[0].remove();
      item.textContent = +pageActive.textContent + 1;
      fragment.append(item);
      pageActive.after(fragment);
    }

    if (pageActive === pPages[0] && pPages[0].textContent !== '1') {
      pPages[pPages.length - 2].textContent = '...';
      pPages[pPages.length - 2].classList.add('pagination__page_off');
      pPages[pPages.length - 3].remove();
      item.textContent = +pageActive.textContent - 1;
      fragment.append(item);
      pageActive.before(fragment);
    }

    if (pageNoNumber && pageActive === pPages[pPages.length - 1]) {
      let n = +pageTotal.textContent - +pPages.length + 1;
      for (let i = 0; i <= pPages.length - 1; i++) {
        pPages[i].textContent = n;
        n += 1;
      }
    }

    addEvent();
  }

  // переключение видимости кнопок переключения страниц
  function toggleActiveBtn() {
    pageActive = pBlock.querySelector('.pagination__page_active');

    if (pageActive.textContent === '1') {
      pBtnPrev.classList.add('none');
      pBtnNext.classList.remove('none');
    } else if (pageActive.textContent === pageTotal.textContent) {
      pBtnNext.classList.add('none');
      pBtnPrev.classList.remove('none');
    } else {
      pBtnPrev.classList.remove('none');
      pBtnNext.classList.remove('none');
    }
  }

  // переключение активной страницы
  function changeActivePage(e) {
    if (!e.target.classList.contains('pagination__page_off')) {
      pPages.forEach(elem => {
        elem.classList.remove('pagination__page_active');
      });
      e.target.classList.add('pagination__page_active');
      toggleActiveBtn();
      refreshInfoPages();
      addPaginationPages();
    }
  }

  // переключение страниц с помощью кнопок
  function changePageUsingTheBtn(e) {
    const nextPageLink = pageActive.nextElementSibling;
    const prevPageLink = pageActive.previousElementSibling;

    if (e.target.classList.contains('pagination__btn_prev')) {
      pageActive.classList.remove('pagination__page_active');
      prevPageLink.classList.add('pagination__page_active');
    } else {
      pageActive.classList.remove('pagination__page_active');
      nextPageLink.classList.add('pagination__page_active');
    }
    toggleActiveBtn();
    refreshInfoPages();
    addPaginationPages();
  }

  // навешиваем обработчик на кнопки
  function addEvent() {
    pPages = pBlock.querySelectorAll('.pagination__page');
    pPages.forEach(elem => {
      if (!elem.classList.contains('pagination__page_off')) {
        elem.addEventListener('click', changeActivePage);
      }
    });
  }

  // обработчики и функции
  creatPaginationPages()
    .then(refreshInfoPages)
    .then(addEvent);
  refreshInfoPagesTotal();

  pBtn.forEach(elem => {
    elem.addEventListener('click', changePageUsingTheBtn);
  });
}

export default initPagination;
