import SwiperCore, { Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);

// слайдер
function sliderswiper() {
  const swiper = new SwiperCore('.js-card-room__images', {
    loop: true,
    watchOverflow: true,
    pagination: {
      el: '.js-card-room__pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.js-card-room__btn_next',
      prevEl: '.js-card-room__btn_prev'
    }
  });
}

// функция меняет окончания слова в зависимости от кол-ва отзывов
function convertComment() {
  const comment = document.querySelectorAll('.js-card-room__comment');

  comment.forEach(elem => {
    const numberOfComments = +elem.querySelector('span').textContent;
    const numberRemaining = numberOfComments % 100;
    const numberRemainingAfter = numberOfComments % 10;

    if (numberRemaining > 5 && numberRemaining < 21) {
      elem.innerHTML = `<span>${numberOfComments}</span> Отзывов`;
    } else if (numberRemainingAfter > 1 && numberRemainingAfter < 5) {
      elem.innerHTML = `<span>${numberOfComments}</span> Отзыва`;
    } else if (numberRemainingAfter === 1) {
      elem.innerHTML = `<span>${numberOfComments}</span> Отзыв`;
    }
  });
}

export {
  sliderswiper,
  convertComment
};
