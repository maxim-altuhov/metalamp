function showTooltip() {
  const tooltipsAll = document.querySelectorAll('[data-tooltip]');

  tooltipsAll.forEach(elem => {
    const tooltip = elem.querySelector('#tooltip');
    const tooltipText = elem.dataset.tooltip;

    function showBlock(e) {
      tooltip.textContent = tooltipText;
      tooltip.style.cssText = `top: ${e.pageY + 10}px; left: ${e.pageX + 10}px; display: block`;
    }

    function hideBlock() {
      tooltip.textContent = '';
      tooltip.style.cssText = 'top: 0; left: 0; display: none';
    }

    elem.addEventListener('mousemove', showBlock);
    elem.addEventListener('mouseout', hideBlock);
  });
}

export default showTooltip;
