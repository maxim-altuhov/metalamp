function initPagination(selector) {
  const pagBlock = document.querySelector(selector);
  const pagPages = pagBlock.querySelectorAll('.pagination__page');
  const pagBtn = pagBlock.querySelectorAll('.pagination__btn');
  const pagBtnPrev = pagBlock.querySelector('.pagination__btn_prev');
  const pagBtnNext = pagBlock.querySelector('.pagination__btn_next');
  const pagTotal = pagBlock.querySelector('.pagination__page_total');
  let pageActive = pagBlock.querySelector('.pagination__page_active');

  // переключение видимости кнопок
  function toggleActiveBtn() {
    pageActive = pagBlock.querySelector('.pagination__page_active');
    if (pageActive.textContent === '1') {
      pagBtnPrev.classList.add('none');
      pagBtnNext.classList.remove('none');
    } else if (pageActive.textContent === pagTotal.textContent) {
      pagBtnNext.classList.add('none');
      pagBtnPrev.classList.remove('none');
    } else {
      pagBtnPrev.classList.remove('none');
      pagBtnNext.classList.remove('none');
    }
  }

  // переключение страниц
  function changeSelectPage(e) {
    pagPages.forEach((elem) => {
      elem.classList.remove('pagination__page_active');
    });
    e.target.classList.add('pagination__page_active');
    toggleActiveBtn();
  }

  // переключение страниц с помощью кнопок
  function changePageUsingTheBtn(e) {
    if (e.target.classList.contains('pagination__btn_prev')) {
      pageActive.classList.remove('pagination__page_active');
      pageActive.previousElementSibling.classList.add('pagination__page_active');
    } else {
      pageActive.classList.remove('pagination__page_active');
      pageActive.nextElementSibling.classList.add('pagination__page_active');
    }
    toggleActiveBtn();
  }

  pagBtn.forEach((elem) => {
    elem.addEventListener('click', changePageUsingTheBtn);
  });

  pagPages.forEach((elem) => {
    if (!elem.classList.contains('pagination__page_off')) {
      elem.addEventListener('click', changeSelectPage);
    }
  });
}

export default initPagination;
