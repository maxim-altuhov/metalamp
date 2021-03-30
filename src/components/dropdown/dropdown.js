function initDropdown({ arrowToggle = false }) {
  const dSelector = document.querySelectorAll('.js-form__group-dropdown');

  dSelector.forEach(item => {
    const dropdown = item.querySelector('.js-form__dropdown');
    const dInput = item.querySelector('.js-form__dropdown-input');
    const dResult = item.querySelector('.js-form__dropdown-result');
    const dArrow = item.querySelector('.js-form__dropdown-arrow');
    const dElem = item.querySelectorAll('.js-form__dropdown-elem');
    const dCounters = item.querySelectorAll('.js-form__dropdown-counter span');
    const dCounterBtns = item.querySelectorAll('.js-form__dropdown-counter button');
    const dMinus = item.querySelectorAll('[data-dropdown-minus]');
    const dClear = item.querySelector('[data-function="clear"]');
    const dApply = item.querySelector('[data-function="apply"]');
    const dFocusLimiter = item.querySelector('.js-form__dropdown-limiter');
    const textInInput = dResult.textContent;
    let resultObj = {};
    let counterGuests = 0;

    // инициализируем dropdown
    function startInitDropdown() {
      dCounters.forEach(number => {
        if (number.textContent > 0) {
          number.previousElementSibling.disabled = false;
          if (dClear) dClear.classList.remove('hidden');
        }
      });

      dElem.forEach(elem => {
        const name = elem.firstChild.textContent.toLowerCase();
        const value = +elem.querySelector('.js-form__dropdown-counter > span').textContent;
        const isGuests = name === 'взрослые' || name === 'дети';

        if (value !== 0 && !isGuests) {
          resultObj[name] = value;
        }

        if (value !== 0 && isGuests) {
          counterGuests += value;
          resultObj['гость'] = counterGuests;
        }

        if (arrowToggle && item.classList.contains('form__group-dropdown_active')) {
          dArrow.classList.add('active');
          dArrow.textContent = 'keyboard_arrow_up';
        } else {
          dArrow.textContent = 'keyboard_arrow_down';
        }
      });
      showResultText();
    }

    startInitDropdown();

    // функция открытия/закрытия dropdown
    function toggleDropdown() {
      item.classList.toggle('form__group-dropdown_active');
      dArrow.classList.toggle('active');

      if (arrowToggle && dArrow.classList.contains('active')) {
        dArrow.textContent = 'keyboard_arrow_up';
      } else {
        dArrow.textContent = 'keyboard_arrow_down';
      }
    }

    // сброс значений dropdown
    function clearDropdown() {
      dResult.textContent = textInInput;
      counterGuests = 0;
      resultObj = {};
      if (dClear) dClear.classList.add('hidden');

      dMinus.forEach(elem => {
        elem.disabled = true;
      });

      dCounters.forEach(elem => {
        elem.textContent = 0;
      });
    }

    // вывод результата
    function showResultText() {
      const counterValue = Object.values(resultObj).reduce((a, b) => a + b, 0);

      function changingWordEndings(number, textForms) {
        const NumberRemaining = number % 100;
        const NumberRemainingSecond = NumberRemaining % 10;

        if (NumberRemaining > 5) return textForms[2];
        if (NumberRemainingSecond > 1 && NumberRemainingSecond < 5) return textForms[1];
        if (NumberRemainingSecond === 1) return textForms[0];
        return textForms[2];
      }

      if (counterValue === 0) {
        clearDropdown();
      } else {
        let resultText = Object.entries(resultObj).map(([key, value]) => {
          let newKey = key;

          if (key === 'гость') newKey = changingWordEndings(value, ['гость', 'гостя', 'гостей']);
          if (key === 'младенцы') newKey = changingWordEndings(value, ['младенец', 'младенца', 'младенцев']);
          if (key === 'спальни') newKey = changingWordEndings(value, ['спальня', 'спальни', 'спален']);
          if (key === 'кровати') newKey = changingWordEndings(value, ['кровать', 'кровати', 'кроватей']);
          if (key === 'ванные комнаты') newKey = changingWordEndings(value, ['ванная комната', 'ванные комнаты', 'ванных комнат']);

          return `${value} ${newKey}`;
        }).join(', ');

        dResult.textContent = resultText;
        dInput.value = resultText;
      }
    }

    // изменение кол-ва элементов
    function changeQuantity(e) {
      let countElem;
      let btnMinus;
      const parentElem = e.target.parentElement.parentElement;
      const elem = parentElem.firstChild.textContent.toLowerCase();
      const isGuests = elem === 'взрослые' || elem === 'дети';

      if (dClear) dClear.classList.remove('hidden');

      if (e.target.textContent === '+') {
        countElem = e.target.previousElementSibling;
        btnMinus = countElem.previousElementSibling;
        countElem.textContent = +countElem.textContent + 1;
        btnMinus.disabled = false;
        if (isGuests) counterGuests += 1;
      } else {
        countElem = e.target.nextElementSibling;
        countElem.textContent = +countElem.textContent - 1;
        if (isGuests) counterGuests -= 1;
      }

      if (+countElem.textContent === 0) {
        e.target.disabled = true;
      }

      if (isGuests) resultObj['гость'] = counterGuests;
      if (counterGuests === 0) delete resultObj['гость'];

      const num = +countElem.textContent;

      if (num !== 0 && !isGuests) {
        resultObj[elem] = num;
      } else {
        delete resultObj[elem];
      }

      showResultText();
    }

    // функция отслеживания нажатия клавиши Enter для открытия/закрытия dropdown
    function keydownEnter(e) {
      if (e.key === 'Enter') toggleDropdown();
    }

    // функция включения обводки при переключении с помощью клавиши tab
    function checkedUseTab() {
      if ((!document.body.classList.contains('using-mouse'))) toggleDropdown();
    }

    // обработчики событий
    dropdown.addEventListener('click', toggleDropdown);
    dropdown.addEventListener('keydown', keydownEnter);
    dropdown.addEventListener('focus', checkedUseTab);
    dFocusLimiter.addEventListener('focusout', toggleDropdown);

    dCounterBtns.forEach(elem => {
      elem.addEventListener('click', changeQuantity);
    });

    if (dApply && dClear) {
      dApply.addEventListener('click', toggleDropdown);
      dClear.addEventListener('click', clearDropdown);
    }
  });
}

export default initDropdown;
