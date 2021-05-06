function initDropdown({ arrowToggle = false }) {
  const selector = document.querySelectorAll('.js-dropdown__group-fields');

  selector.forEach((item, index) => {
    const dropdown = item.querySelector('.js-dropdown__field');
    const input = item.querySelector('.js-dropdown__field-input');
    const result = item.querySelector('.js-dropdown__field-result');
    const arrow = item.querySelector('.js-dropdown__field-arrow');
    const elements = item.querySelectorAll('.js-dropdown__field-elem');
    const counters = item.querySelectorAll('.js-dropdown__field-counter span');
    const counterBtns = item.querySelectorAll('.js-dropdown__field-counter button');
    const buttonMinus = item.querySelectorAll('[data-dropdown-minus]');
    const buttonClear = item.querySelector('[data-function="clear"]');
    const buttonApply = item.querySelector('[data-function="apply"]');
    const focusLimiter = item.querySelector('.js-dropdown__field-limiter');
    const textInInput = result.textContent;
    let objWithResult = {};
    let counterGuests = 0;

    // функция открытия/закрытия dropdown
    const toggleDropdown = () => {
      item.classList.toggle('dropdown__group-fields_active');
      arrow.classList.toggle('active');

      if (arrowToggle && arrow.classList.contains('active')) {
        arrow.textContent = 'keyboard_arrow_up';
      } else {
        arrow.textContent = 'keyboard_arrow_down';
      }
    };

    // сброс значений dropdown
    const clearDropdown = () => {
      result.textContent = textInInput;
      counterGuests = 0;
      objWithResult = {};
      if (buttonClear) buttonClear.classList.add('elem-hidden');

      buttonMinus.forEach(elem => {
        elem.disabled = true;
      });

      counters.forEach(elem => {
        elem.textContent = 0;
      });
    };

    // вывод результата
    const showResultText = () => {
      const counterValue = Object.values(objWithResult).reduce((a, b) => a + b, 0);

      const changingWordEndings = (number, textForms) => {
        const numberRemainingBy100 = number % 100;
        const numberRemainingBy10 = numberRemainingBy100 % 10;

        if (numberRemainingBy100 > 5 && numberRemainingBy100 < 21) return textForms[2];
        if (numberRemainingBy10 > 1 && numberRemainingBy10 < 5) return textForms[1];
        if (numberRemainingBy10 === 1) return textForms[0];
        return textForms[2];
      };

      if (counterValue === 0) {
        clearDropdown();
      } else {
        let resultText = Object.entries(objWithResult).map(([key, value]) => {
          let newKey = key;

          if (key === 'гость') newKey = changingWordEndings(value, ['гость', 'гостя', 'гостей']);
          if (key === 'младенцы') newKey = changingWordEndings(value, ['младенец', 'младенца', 'младенцев']);
          if (key === 'спальни') newKey = changingWordEndings(value, ['спальня', 'спальни', 'спален']);
          if (key === 'кровати') newKey = changingWordEndings(value, ['кровать', 'кровати', 'кроватей']);
          if (key === 'ванные комнаты') newKey = changingWordEndings(value, ['ванная комната', 'ванные комнаты', 'ванных комнат']);

          return `${value} ${newKey}`;
        }).join(', ');

        result.textContent = resultText;
        input.value = resultText;
      }
    };

    // изменение кол-ва элементов
    const changeQuantity = (e) => {
      const parentElem = e.target.parentElement.parentElement;
      const elem = parentElem.firstChild.textContent.toLowerCase();
      const isGuests = elem === 'взрослые' || elem === 'дети';
      let countElem;
      let countElemTypeNumber;
      let btnMinus;

      if (buttonClear) buttonClear.classList.remove('elem-hidden');

      if (e.target.textContent === '+') {
        countElem = e.target.previousElementSibling;
        btnMinus = countElem.previousElementSibling;
        countElemTypeNumber = Number(countElem.textContent);
        countElem.textContent = countElemTypeNumber + 1;
        btnMinus.disabled = false;
        if (isGuests) counterGuests += 1;
      } else {
        countElem = e.target.nextElementSibling;
        countElemTypeNumber = Number(countElem.textContent);
        countElem.textContent = +countElem.textContent - 1;
        if (isGuests) counterGuests -= 1;
      }

      if (countElem.textContent === '0') {
        e.target.disabled = true;
      }

      if (isGuests) objWithResult['гость'] = counterGuests;
      if (counterGuests === 0) delete objWithResult['гость'];

      const num = Number(countElem.textContent);

      if (num !== 0 && !isGuests) {
        objWithResult[elem] = num;
      } else {
        delete objWithResult[elem];
      }

      showResultText();
    };

    /* инициализируем dropdown, выставляем z-index для
     перекрытия других возможных dropdown эл-тов на странице */
    const startInitDropdown = () => {
      item.style.zIndex = 100 - index;

      counters.forEach(number => {
        if (number.textContent > 0) {
          number.previousElementSibling.disabled = false;
          if (buttonClear) buttonClear.classList.remove('elem-hidden');
        }
      });

      elements.forEach(elem => {
        const name = elem.firstChild.textContent.toLowerCase();
        const value = Number(elem.querySelector('.js-dropdown__field-counter > span').textContent);
        const isGuests = name === 'взрослые' || name === 'дети';

        if (value !== 0 && !isGuests) {
          objWithResult[name] = value;
        }

        if (value !== 0 && isGuests) {
          counterGuests += value;
          objWithResult['гость'] = counterGuests;
        }

        if (arrowToggle && item.classList.contains('dropdown__group-fields_active')) {
          arrow.classList.add('active');
          arrow.textContent = 'keyboard_arrow_up';
        } else {
          arrow.textContent = 'keyboard_arrow_down';
        }
      });
      showResultText();
    };

    // функция отслеживания нажатия клавиши Enter для открытия/закрытия dropdown
    function keydownEnter(e) {
      if (e.key === 'Enter') toggleDropdown();
    }

    // функция включения обводки при переключении с помощью клавиши TAB
    function checkedUseTab() {
      if ((!document.body.classList.contains('using-mouse'))) toggleDropdown();
    }

    // обработчики событий и инициализация функций
    startInitDropdown();

    dropdown.addEventListener('click', toggleDropdown);
    dropdown.addEventListener('keydown', keydownEnter);
    dropdown.addEventListener('focus', checkedUseTab);
    focusLimiter.addEventListener('focusout', toggleDropdown);

    counterBtns.forEach(elem => {
      elem.addEventListener('click', changeQuantity);
    });

    if (buttonApply && buttonClear) {
      buttonApply.addEventListener('click', toggleDropdown);
      buttonClear.addEventListener('click', clearDropdown);
    }
  });
}

export default initDropdown;
