import noUiSlider from 'nouislider';
import wNumb from 'wNumb';

function rangeSlider({
  selector,
  start = [50, 70],
  min = 0,
  max = 100,
  step = 10,
}) {
  const selectorSlider = document.querySelector(selector);
  const sliderInfo = selectorSlider.previousElementSibling;
  const sliderMin = sliderInfo.querySelector('[data-range-min]');
  const sliderMax = sliderInfo.querySelector('[data-range-max]');

  noUiSlider.create(selectorSlider, {
    start: start,
    step: step,
    format: wNumb({
      thousand: ' ',
      decimals: 0,
    }),
    connect: true,
    range: {
      min: [min],
      max: [max],
    },
  });

  const updateInfo = () => {
    const infoSlider = selectorSlider.noUiSlider.get();
    sliderMin.textContent = `${infoSlider[0]}₽`;
    sliderMax.textContent = `${infoSlider[1]}₽`;
  };

  selectorSlider.noUiSlider.on('update', updateInfo);
}

export default rangeSlider;
