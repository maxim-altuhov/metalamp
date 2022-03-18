import SwiperCore, { Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);

// инициализация слайдера
function initSlider() {
  const sliders = document.querySelectorAll('.js-card-room__images');

  sliders.forEach((elem) => {
    const swiper = new SwiperCore(elem, {
      loop: true,
      watchOverflow: true,
      spaceBetween: 20,
      pagination: {
        el: '.js-card-room__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: elem.querySelector('.js-card-room__btn_type_next'),
        prevEl: elem.querySelector('.js-card-room__btn_type_prev'),
      },
    });

    const oneImageInSlider = swiper.imagesToLoad.length === 3 || swiper.imagesToLoad.length === 1;

    if (oneImageInSlider) {
      const navArrows = elem.querySelectorAll('.js-card-room__btn');

      navArrows.forEach((item) => item.remove());
      swiper.destroy();
    }
  });
}

export default initSlider;
