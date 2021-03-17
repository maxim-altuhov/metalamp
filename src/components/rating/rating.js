import './json/rating.json';

function setRating() {
  const ratings = document.querySelectorAll('.rating');
  let activeRating;
  let valueRating;

  // основная функция
  function initRatings() {
    // инициализация переменных
    function initRatingVars(currentRating) {
      activeRating = currentRating.querySelector('.rating__active');
      valueRating = currentRating.querySelector('.rating__value');
    }

    // изменение кол-ва звезд
    function setValueRating(value = valueRating.innerHTML) {
      let result = value / 0.05;
      activeRating.style.width = `${result}%`;
    }

    // возможность самому указывать оценку
    function setCurrentRating(currentRating) {
      const ratingElem = currentRating.querySelectorAll('.rating__elem');

      ratingElem.forEach((elem, index) => {
        // обновление данных
        function refreshRating() {
          initRatingVars(currentRating);
          setValueRating(elem.value);
        }

        // показать рейтинг по умолчанию
        function resetRating() {
          setValueRating();
        }

        // отправка/получение даныых рейтинга
        async function getValueRating(value, rating) {
          if (!rating.classList.contains('rating_sending')) {
            rating.classList.add('rating_sending');

            // отправка данных на сервер
            let response = await fetch('./json/rating.json', {
              method: 'GET'
              // ,
              // body: JSON.stringify({
              //   UserRating: value
              // }),
              // headers: {
              //   'content-type': 'application/json'
              // }
            });
            if (response.ok) {
              const result = await response.json();

              // получаем новое значение рейтинга
              const newRating = result.newRating;

              // выводим новый результат
              valueRating.innerHTML = newRating;

              // обновляем кол-во звезд
              setValueRating();

              rating.classList.remove('rating_sending');
            } else {
              const ratingInfo = rating.querySelector('.rating__info');
              ratingInfo.textContent = 'Ошибка!';
              rating.classList.remove('rating_sending');
            }
          }
        }

        // вывод нового значения рейтинга
        function setNewRating() {
          initRatingVars(currentRating);

          if (currentRating.dataset.ajax) {
            getValueRating(elem.value, currentRating);
          } else {
            valueRating.innerHTML = index + 1;
            getValueRating();
          }
        }

        // обработчики
        elem.addEventListener('mouseenter', refreshRating);
        elem.addEventListener('mouseleave', resetRating);
        elem.addEventListener('click', setNewRating);
      });
    }

    // инициализация конкретного рейтинга
    function initCurrentRating(currentRating) {
      initRatingVars(currentRating);
      setValueRating();

      if (currentRating.classList.contains('rating_set')) {
        setCurrentRating(currentRating);
      }
    }

    for (let index = 0; index < ratings.length; index++) {
      const currentRating = ratings[index];
      initCurrentRating(currentRating);
    }
  }

  if (ratings.length > 0) {
    initRatings();
  }
}

export default setRating;
