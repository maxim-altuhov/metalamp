import SwiperCore, { Pagination } from 'swiper/core';

SwiperCore.use([Pagination]);

function initSliderPreview() {
  let swiper = SwiperCore;
  let init = false;

  function initSwiperMode() {
    let mobile = window.matchMedia('(max-width: 575px)');
    let another = window.matchMedia('(min-width: 576px)');

    if (mobile.matches) {
      if (!init) {
        init = true;
        swiper = new SwiperCore('.js-room-details__photos-block', {
          loop: true,
          autoHeight: true,
          spaceBetween: 40,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        });
      }
    } else if (another.matches) {
      if (init) {
        swiper.destroy();
      }
      init = false;
    }
  }

  window.addEventListener('load', initSwiperMode);
  window.addEventListener('resize', initSwiperMode);
}

export default initSliderPreview;
