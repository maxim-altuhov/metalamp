// показывает подсказку при наведении на элемент
function initTooltip() {
  const tooltips = document.querySelectorAll('.js-card-booking__info-point');

  tooltips.forEach((elem) => {
    const tooltip = elem.querySelector('.js-card-booking__info-tooltip');
    const tooltipText = elem.dataset.tooltip;
    tooltip.textContent = tooltipText;

    const showTooltip = () => {
      tooltip.style.cssText = 'top: 20px; right: -50%; display: block;';
    };

    const hideTooltip = () => {
      tooltip.style.cssText = 'top: 0; right: 0; display: none';
    };

    const handleInfoPointMousemove = () => showTooltip();
    const handleInfoPointFocusin = () => showTooltip();
    const handleInfoPointMouseout = () => hideTooltip();
    const handleInfoPointFocusout = () => hideTooltip();

    elem.addEventListener('mousemove', handleInfoPointMousemove);
    elem.addEventListener('focusin', handleInfoPointFocusin);
    elem.addEventListener('mouseout', handleInfoPointMouseout);
    elem.addEventListener('focusout', handleInfoPointFocusout);
  });
}

export default initTooltip;
