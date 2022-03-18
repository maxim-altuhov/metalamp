function initDiagramRating(selector) {
  const diagram = document.querySelector(selector);
  const diagramRatingTotal = diagram.querySelector('.js-diagram__number');
  const diagramRatingText = diagram.querySelector('.js-diagram__label');
  const diagramSegments = diagram.querySelectorAll('.js-diagram__segment');
  let sumForDashOffset;

  // формируем необходимые массивы данных и подсчитываем кол-во голосов исходя из введенных значений
  const diagramRatingArray = diagram.dataset.rating.split(',').map((rating) => parseInt(rating, 10));
  const resultForRating = diagramRatingArray.reduce((sum, current) => sum + current);

  // определяем первый отступ с которого начинает формироваться диаграмма
  const defaultValueDashoffset = Number(diagramSegments[0].getAttribute('stroke-dashoffset').split(' ').map((offset) => parseFloat(offset)));

  // выводим кол-во голосов исходя из входных данных
  diagramRatingTotal.textContent = resultForRating;

  // меняем окончания слова "голосов" в зависимости от их итогового кол-ва
  const checkResultForRating = (startNumber, endNumber, checkTwoDigitNum = true) => {
    const checkingNumber = checkTwoDigitNum ? resultForRating % 100 : resultForRating % 10;

    return (checkingNumber > startNumber) && (checkingNumber < endNumber);
  };

  if (checkResultForRating(5, 21)) {
    diagramRatingText.textContent = 'голосов';
  } else if (checkResultForRating(1, 5, false)) {
    diagramRatingText.textContent = 'голоса';
  } else if (resultForRating % 10 === 1) {
    diagramRatingText.textContent = 'голос';
  }

  /* вычисляем длины окружностей формирующих рейтинг,
    исходя из кол-ва голосов и длины окружности равной 100 */
  const resultForDasharray = diagramRatingArray.map((ratingValue) => {
    const result = ((ratingValue * 100) / resultForRating);
    if (result < 0) return 0;

    return result;
  });

  // формируем массив в ввиде сумм длин окружностей, для задания правильных отступов в диаграмме
  const resultForDashoffset = resultForDasharray.map((result) => {
    sumForDashOffset = (sumForDashOffset || 0) + result;

    return sumForDashOffset;
  });

  // задаём значения из сформированных массивов и устанавливаем разделители для диаграммы
  diagramSegments.forEach((segment, index) => {
    const resultValueDashoffset = `${100 - ((100 - resultForDashoffset[index]) + defaultValueDashoffset)}`;

    segment.setAttribute('stroke-dasharray', `${resultForDasharray[index]} ${100 - resultForDasharray[index]}`);
    segment.setAttribute('stroke-dashoffset', resultValueDashoffset);

    // если значение одно, не выводим разделитель
    const hasОneSegment = resultForDasharray[index] !== 0 && resultForDasharray[index] !== 100;

    if (hasОneSegment) {
      segment.insertAdjacentHTML('afterend', `<circle cx="17" cy="17" r="15.91549430918954" fill="transparent" stroke="#fff" stroke-width="1.5" stroke-dasharray="0.6 99.4" stroke-dashoffset=${resultValueDashoffset}></circle>`);
    }
  });
}

export default initDiagramRating;
