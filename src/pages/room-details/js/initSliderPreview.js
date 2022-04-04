import SwiperCore, { Pagination } from 'swiper/core';

SwiperCore.use([Pagination]);

function initSliderPreview() {
  const MAX_WIDTH_ACTIVATED_SLIDER = 575;
  let slider;
  let hasInitSlider = false;

  const initSwiperMode = () => {
    if (window.matchMedia(`(max-width: ${MAX_WIDTH_ACTIVATED_SLIDER}px)`).matches) {
      if (!hasInitSlider) {
        hasInitSlider = true;
        slider = new SwiperCore('.js-swiper-container', {
          loop: true,
          autoHeight: true,
          spaceBetween: 40,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
      }
    } else if (window.matchMedia(`(min-width: ${MAX_WIDTH_ACTIVATED_SLIDER + 1}px)`).matches) {
      if (hasInitSlider) slider.destroy();
      hasInitSlider = false;
    }
  };

  const handleWindowLoad = () => initSwiperMode();
  const handleWindowResize = () => initSwiperMode();
  window.addEventListener('load', handleWindowLoad);
  window.addEventListener('resize', handleWindowResize);
}

export default initSliderPreview;
