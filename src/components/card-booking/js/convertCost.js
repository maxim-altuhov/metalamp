// функция преобразует число из обычного вида к виду с разделителем (пробел)
function convertCost() {
  const selector = document.querySelectorAll('[data-cost]');

  selector.forEach((elem) => {
    const costInFormatText = elem.textContent;
    const costInFormatNumber = Number(costInFormatText.substring(0, costInFormatText.length - 1));
    const result = costInFormatNumber.toLocaleString('ru-RU');

    elem.textContent = `${result}₽`;
  });
}

export default convertCost;
