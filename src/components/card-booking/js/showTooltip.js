// показывает подсказку при наведении на элемент
function showTooltip() {
  const tooltips = document.querySelectorAll('.js-card-booking__info-point');

  tooltips.forEach((elem) => {
    const tooltip = elem.querySelector('.js-card-booking__info-tooltip');
    const tooltipText = elem.dataset.tooltip;

    const handleInfoPointMousemove = () => {
      tooltip.textContent = tooltipText;
      tooltip.style.cssText = 'top: 20px; left: 10px; display: block';
    };

    const handleInfoPointMouseout = () => {
      tooltip.textContent = '';
      tooltip.style.cssText = 'top: 0; left: 0; display: none';
    };

    elem.addEventListener('mousemove', handleInfoPointMousemove);
    elem.addEventListener('mouseout', handleInfoPointMouseout);
  });
}

export default showTooltip;
