function initDiagramRating(selector) {
  const diagram = document.querySelector(selector);
  const diagramRatingTotal = diagram.querySelector('.js-diagram__number');
  const diagramRatingText = diagram.querySelector('.js-diagram__label');
  const diagramSegments = diagram.querySelectorAll('.js-diagram__segment');
  let sumForDashoffset;

  // формируем необходимые массивы данных и подсчитываем кол-во голосов исходя из введенных значений
  const diagramRatingArray = diagram.dataset.rating.split(',').map(item => parseInt(item, 10));
  const resultForRating = diagramRatingArray.reduce((sum, current) => sum + current);

  // определяем первый отступ с которого начинает формироваться диаграмма
  const defaultValueDashoffset = Number(diagramSegments[0].getAttribute('stroke-dashoffset').split(' ').map(item => parseFloat(item)));

  // выводим кол-во голосов исходя из входных данных
  diagramRatingTotal.textContent = resultForRating;

  // меняем окончания слова "голосов" в зависимости от их итогового кол-ва
  const numberRemainingBy100 = resultForRating % 100;
  const numberRemainingBy10 = resultForRating % 10;

  if (numberRemainingBy100 > 5 && numberRemainingBy100 < 21) {
    diagramRatingText.textContent = 'голосов';
  } else if (numberRemainingBy10 > 1 && numberRemainingBy10 < 5) {
    diagramRatingText.textContent = 'голоса';
  } else if (numberRemainingBy10 === 1) {
    diagramRatingText.textContent = 'голос';
  }

  /* вычисляем длины окружностей формирующих рейтинг,
    исходя из кол-ва голосов и длины окружности равной 100 */
  const resultArrayForDasharray = diagramRatingArray.map(item => {
    const result = ((item * 100) / resultForRating);
    if (result < 0) return 0;
    return result;
  });

  // формируем массив в ввиде сумм длин окружностей, для задания правильных отступов в диаграмме
  const resultArrayForDashoffset = resultArrayForDasharray.map(item => {
    sumForDashoffset = (sumForDashoffset || 0) + item;
    return sumForDashoffset;
  });

  // задаём значения из сформированных массивов и устанавливаем разделители для диаграммы
  diagramSegments.forEach((elem, i) => {
    let resultValueDashoffset = `${100 - ((100 - resultArrayForDashoffset[i]) + defaultValueDashoffset)}`;

    elem.setAttribute('stroke-dasharray', `${resultArrayForDasharray[i]} ${100 - resultArrayForDasharray[i]}`);
    elem.setAttribute('stroke-dashoffset', resultValueDashoffset);

    // если значение одно, не выводим разделитель
    if (resultArrayForDasharray[i] !== 0 && resultArrayForDasharray[i] !== 100) {
      elem.insertAdjacentHTML('afterend', `<circle cx="17" cy="17" r="15.91549430918954" fill="transparent" stroke="#fff" stroke-width="1.5" stroke-dasharray="0.6 99.4" stroke-dashoffset=${resultValueDashoffset}></circle>`);
    }
  });
}

export default initDiagramRating;
