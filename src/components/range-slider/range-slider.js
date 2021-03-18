import noUiSlider from 'nouislider';
import wNumb from 'wNumb';

function rangeSlider({
  selector,
  start,
  min,
  max
}) {
  const selectorSlider = document.querySelector(selector);
  const sliderInfo = selectorSlider.previousElementSibling;
  const sliderMin = sliderInfo.querySelector('[data-range-min]');
  const sliderMax = sliderInfo.querySelector('[data-range-max]');

  noUiSlider.create(selectorSlider, {
    start: start,
    step: 1000,
    format: wNumb({
      thousand: ' ',
      decimals: 0
    }),
    connect: true,
    range: {
      min: [min],
      max: [max]
    }
  });

  function updateInfo() {
    let infoSlider = selectorSlider.noUiSlider.get();
    sliderMin.textContent = `${infoSlider[0]}₽`;
    sliderMax.textContent = `${infoSlider[1]}₽`;
  }

  selectorSlider.noUiSlider.on('update', updateInfo);
}

export default rangeSlider;
