import noUiSlider from 'nouislider';
import wNumb from 'wNumb';

function initRangeSlider(selector) {
  const initSliderElem = selector.querySelector('.js-range-slider__slider');
  const sliderInfo = selector.querySelector('.js-range-slider__info');
  const sliderMin = sliderInfo.querySelector('.js-range-slider__info-min');
  const sliderMax = sliderInfo.querySelector('.js-range-slider__info-max');
  let options;

  try {
    options = JSON.parse(initSliderElem.dataset.options);
  } catch {
    options = {
      start: [0, 100],
      step: 1,
      min: 0,
      max: 100,
      decimals: 0,
    };
  }

  /* beautify preserve:start */
  const {
    start = [0, 100],
    step = 1,
    min = 0,
    max = 100,
    decimals = 0,
  } = options;
  /* beautify preserve:end */

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
}

export default initRangeSlider;
