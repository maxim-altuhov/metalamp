import SwiperCore, { Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);

// слайдер
function sliderSwiper() {
  const sliders = document.querySelectorAll('.js-card-room__images');

  sliders.forEach(elem => {
    const swiper = new SwiperCore(elem, {
      loop: true,
      watchOverflow: true,
      pagination: {
        el: '.js-card-room__pagination',
        clickable: true
      },
      navigation: {
        nextEl: elem.querySelector('.js-card-room__btn_next'),
        prevEl: elem.querySelector('.js-card-room__btn_prev')
      }
    });

    if (swiper.imagesToLoad.length === 3 || swiper.imagesToLoad.length === 1) {
      const navArrows = elem.querySelectorAll('.js-card-room__btn');

      navArrows.forEach(item => {
        item.remove();
      });
      swiper.destroy();
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
  sliderSwiper,
  convertComment
};
