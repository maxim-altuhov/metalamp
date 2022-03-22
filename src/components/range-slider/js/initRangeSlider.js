import noUiSlider from 'nouislider';
import wNumb from 'wNumb';

function initRangeSlider(selector) {
  const initSliderElem = selector.querySelector('.js-range-slider__slider');
  const sliderInfo = selector.querySelector('.js-range-slider__info');
  const sliderMin = sliderInfo.querySelector('.js-range-slider__info-min');
  const sliderMax = sliderInfo.querySelector('.js-range-slider__info-max');
  let options;

  const init = () => {
    const {
      start = [0, 100],
      step = 1,
      min = 0,
      max = 100,
      decimals = 0,
    } = options;

    noUiSlider.create(initSliderElem, {
      start: start,
      step: step,
      format: wNumb({
        thousand: ' ',
        decimals: decimals,
      }),
      connect: true,
      range: {
        min: [min],
        max: [max],
      },
    });

    const handleSliderUpdate = () => {
      const infoSlider = initSliderElem.noUiSlider.get();
      const [minValue, maxValue] = infoSlider;
      sliderMin.textContent = `${minValue}₽`;
      sliderMax.textContent = `${maxValue}₽`;
    };

    initSliderElem.noUiSlider.on('update', handleSliderUpdate);
  };

  try {
    options = JSON.parse(initSliderElem.dataset.options);
  } catch {
    // Incorrect options are passed to the slider. The slider will use the default options.
  } finally {
    init();
  }
}

export default initRangeSlider;
