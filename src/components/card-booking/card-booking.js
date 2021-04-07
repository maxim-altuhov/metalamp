// функция показывает посказку при наведении на элемент
function showTooltip() {
  const tooltipsAll = document.querySelectorAll('[data-tooltip]');

  tooltipsAll.forEach(elem => {
    const tooltip = elem.querySelector('#tooltip');
    const tooltipText = elem.dataset.tooltip;

    function showBlock() {
      tooltip.textContent = tooltipText;
      tooltip.style.cssText = 'top: 20px; left: 10px; display: block';
    }

    function hideBlock() {
      tooltip.textContent = '';
      tooltip.style.cssText = 'top: 0; left: 0; display: none';
    }

    elem.addEventListener('mousemove', showBlock);
    elem.addEventListener('mouseout', hideBlock);
  });
}

// функция преобразует число к виду с разделителем (пробел)
function convertCost() {
  const selector = document.querySelectorAll('[data-cost]');

  selector.forEach(elem => {
    const numberText = elem.textContent;
    const number = +numberText.substring(0, numberText.length - 1);
    const result = number.toLocaleString('ru-RU');

    elem.textContent = `${result}₽`;
  });
}

export { showTooltip, convertCost };
