// функция показывает подсказку при наведении на элемент
function showTooltip() {
  const tooltipsAll = document.querySelectorAll('[data-tooltip]');

  tooltipsAll.forEach(elem => {
    const tooltip = elem.querySelector('.card-booking__info-tooltip');
    const tooltipText = elem.dataset.tooltip;

    const showBlock = () => {
      tooltip.textContent = tooltipText;
      tooltip.style.cssText = 'top: 20px; left: 10px; display: block';
    };

    const hideBlock = () => {
      tooltip.textContent = '';
      tooltip.style.cssText = 'top: 0; left: 0; display: none';
    };

    elem.addEventListener('mousemove', showBlock);
    elem.addEventListener('mouseout', hideBlock);
  });
}

export default showTooltip;
