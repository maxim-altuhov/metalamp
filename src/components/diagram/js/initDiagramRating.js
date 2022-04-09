function initDiagramRating(selector) {
  const diagramRatingTotal = selector.querySelector('.js-diagram__number');
  const diagramRatingLabel = selector.querySelector('.js-diagram__label');
  const diagramRatingText = selector.querySelector('.js-diagram__text');
  const diagramSegments = selector.querySelectorAll('.js-diagram__segment');
  const diagramLegends = selector.querySelectorAll('.js-diagram__legend-item');
  let currentRatingTotal;
  let ratingArray;
  let sumForDashOffset;

  try {
    ratingArray = JSON.parse(selector.dataset.rating);
  } catch {
    ratingArray = [0];
  }

  // формируем необходимые массивы данных и подсчитываем кол-во голосов исходя из введенных значений
  const diagramRatingArray = ratingArray.map((rating) => parseInt(rating, 10));
  const resultForRating = diagramRatingArray.reduce((sum, current) => sum + current);

  // определяем первый отступ с которого начинает формироваться диаграмма
  const defaultValueDashoffset = Number(diagramSegments[0].getAttribute('stroke-dashoffset').split(' ').map((offset) => parseFloat(offset)));

  // выводим кол-во голосов исходя из входных данных
  diagramRatingTotal.textContent = resultForRating;

  // меняем окончания слова "голосов" в зависимости от их итогового кол-ва
  const checkResultForRating = (startNumber, endNumber, checkTwoDigitNum = true) => {
    currentRatingTotal = Number(diagramRatingTotal.textContent);
    const checkingNumber = checkTwoDigitNum ? currentRatingTotal % 100 : currentRatingTotal % 10;

    return (checkingNumber > startNumber) && (checkingNumber < endNumber);
  };

  const checkingWordEndings = () => {
    if (checkResultForRating(5, 21)) {
      diagramRatingLabel.textContent = 'голосов';
    } else if (checkResultForRating(1, 5, false)) {
      diagramRatingLabel.textContent = 'голоса';
    } else if (currentRatingTotal % 10 === 1) {
      diagramRatingLabel.textContent = 'голос';
    } else {
      diagramRatingLabel.textContent = 'голосов';
    }
  };

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
      segment.insertAdjacentHTML('afterend', `<circle cx="17" cy="17" r="15.91549430918954" fill="transparent" stroke="#fff" stroke-width="2.5" stroke-dasharray="0.6 99.4" stroke-dashoffset=${resultValueDashoffset}></circle>`);
    }
  });

  // первичная проверка окончания слова "голосов" в зависимости от их итогового кол-ва
  checkingWordEndings();

  // выводим текущий рейтинг
  const showCurrentRating = (e) => {
    const currentRating = e.currentTarget.dataset.currentRating;
    const currentIndex = Number(e.currentTarget.dataset.index);
    diagramRatingTotal.textContent = currentRating;
    diagramRatingText.style.fill = `url(#score-${currentIndex})`;
    diagramSegments[currentIndex].setAttribute('stroke-width', '2');
    checkingWordEndings();
  };

  // выводим общий рейтинг
  const showTotalRating = () => {
    diagramRatingTotal.textContent = resultForRating;
    diagramRatingText.style.fill = '';
    diagramSegments.forEach((elem) => elem.setAttribute('stroke-width', '1.2'));
    checkingWordEndings();
  };

  // обработчики событий
  const handleLegendItemMouseOver = (e) => showCurrentRating(e);
  const handleLegendItemMouseOut = () => showTotalRating();

  diagramLegends.forEach((elem) => {
    elem.addEventListener('mouseover', handleLegendItemMouseOver);
    elem.addEventListener('mouseout', handleLegendItemMouseOut);
  });
}

export default initDiagramRating;
