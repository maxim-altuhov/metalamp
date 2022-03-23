function initDropdown() {
  const blocksWithDropdown = document.querySelectorAll('.js-dropdown__group');
  const typeGuests = {
    ADULT: 'взрослые',
    CHILDREN: 'дети',
    BABY: 'младенцы',
  };

  blocksWithDropdown.forEach((block, index) => {
    let options;

    try {
      options = JSON.parse(block.dataset.options);
    } catch {
      // Incorrect options are passed to the script. Will use the default options.
      options = {
        enableArrowRotation: true,
        variantsWordsObj: {},
      };
    }

    /* beautify preserve:start */
    const {
      enableArrowRotation = true,
      variantsWordsObj = {},
    } = options;
    /* beautify preserve:end */

    const dropdown = block.querySelector('.js-dropdown__field');
    const input = block.querySelector('.js-dropdown__input');
    const arrow = block.querySelector('.js-dropdown__arrow');
    const counters = block.querySelectorAll('[data-dropdown-counter]');
    const counterBtns = block.querySelectorAll('.js-dropdown__counter-btn');
    const buttonMinus = block.querySelectorAll('[data-dropdown-minus]');
    const buttonClear = block.querySelector('[data-function="clear"]');
    const buttonApply = block.querySelector('[data-function="apply"]');
    const focusLimiter = block.querySelector('.js-dropdown__limiter');
    const textInInputElem = block.querySelector('.js-dropdown__result');
    const dropdownElements = block.querySelectorAll('.js-dropdown__elem');
    const textInInput = textInInputElem.textContent;
    let objWithResult = {};
    let counterGuests = 0;

    // функция открытия/закрытия dropdown
    const toggleDropdown = () => {
      block.classList.toggle('dropdown__group_opened');
      arrow.classList.toggle('dropdown__arrow_rotated');

      if (enableArrowRotation && arrow.classList.contains('dropdown__arrow_rotated')) {
        arrow.textContent = 'keyboard_arrow_up';
      } else {
        arrow.textContent = 'keyboard_arrow_down';
      }
    };

    // сброс значений dropdown
    const clearDropdown = () => {
      textInInputElem.textContent = textInInput;
      counterGuests = 0;
      objWithResult = {};

      if (buttonClear) buttonClear.parentElement.classList.add('dropdown__control-item_hidden');

      buttonMinus.forEach((elem) => {
        elem.disabled = true;
      });

      counters.forEach((elem) => {
        elem.textContent = 0;
      });
    };

    // вывод результата
    const showResultText = () => {
      const counterValue = Object.values(objWithResult).reduce((a, b) => a + b, 0);

      const changingWordEndings = (numberOfGuest, variantWordsArray) => {
        const checkNumberOfGuest = (startNumber, endNumber, checkTwoDigitNum = true) => {
          const checkingNumber = checkTwoDigitNum ? numberOfGuest % 100 : numberOfGuest % 10;

          return (checkingNumber > startNumber) && (checkingNumber < endNumber);
        };

        if (checkNumberOfGuest(5, 21)) return variantWordsArray[2];
        if (checkNumberOfGuest(1, 5, false)) return variantWordsArray[1];
        if ((numberOfGuest % 10) === 1) return variantWordsArray[0];

        return variantWordsArray[2];
      };

      if (counterValue === 0) {
        clearDropdown();
      } else {
        const resultText = Object.entries(objWithResult).map(([inputText, numberOfGuest]) => {
          let newText = '';

          if (inputText in variantsWordsObj) {
            newText = changingWordEndings(numberOfGuest, variantsWordsObj[inputText]);
          }

          return `${numberOfGuest} ${newText}`;
        }).join(', ');

        textInInputElem.textContent = resultText;
        input.value = resultText;
      }
    };

    // изменение кол-ва элементов
    const handleFieldCounterBtnClick = (e) => {
      const dropdownField = e.target.closest('.js-dropdown__elem');
      const elemName = dropdownField.firstChild.textContent.toLowerCase();
      const isGuests = elemName === typeGuests.ADULT || elemName === typeGuests.CHILDREN;
      let counterElem;
      let counter;
      let btnMinus;

      if (buttonClear) buttonClear.parentElement.classList.remove('dropdown__control-item_hidden');

      if (e.target.textContent === '+') {
        counterElem = e.target.previousElementSibling;
        btnMinus = counterElem.previousElementSibling;
        counter = Number(counterElem.textContent);
        counterElem.textContent = counter + 1;
        btnMinus.disabled = false;

        if (isGuests) counterGuests += 1;
      } else {
        counterElem = e.target.nextElementSibling;
        counter = Number(counterElem.textContent);
        counterElem.textContent = counter - 1;

        if (isGuests) counterGuests -= 1;
      }

      if (counterElem.textContent === '0') e.target.disabled = true;
      if (isGuests) objWithResult['гость'] = counterGuests;
      if (counterGuests === 0) delete objWithResult['гость'];

      const totalValueInCounter = Number(counterElem.textContent);
      const totalValueInCounterNotNull = totalValueInCounter !== 0;

      if (totalValueInCounterNotNull && !isGuests) {
        objWithResult[elemName] = totalValueInCounter;
      } else {
        delete objWithResult[elemName];
      }

      showResultText();
    };

    /* инициализируем dropdown, выставляем z-index для
     перекрытия других возможных dropdown эл-тов на странице */
    const startInitDropdown = () => {
      block.style.zIndex = 100 - index;

      counters.forEach((counter) => {
        if (counter.textContent > 0) {
          counter.previousElementSibling.disabled = false;
          if (buttonClear) buttonClear.parentElement.classList.remove('dropdown__control-item_hidden');
        }
      });

      dropdownElements.forEach((elemWithDropdown) => {
        const elemName = elemWithDropdown.firstChild.textContent.toLowerCase();
        const counter = Number(elemWithDropdown.querySelector('[data-dropdown-counter]').textContent);
        const isGuests = elemName === typeGuests.ADULT || elemName === typeGuests.CHILDREN;
        const counterIsNotNull = counter !== 0;

        if (counterIsNotNull && !isGuests) {
          objWithResult[elemName] = counter;
        }

        if (counterIsNotNull && isGuests) {
          counterGuests += counter;
          objWithResult['гость'] = counterGuests;
        }

        if (enableArrowRotation && block.classList.contains('dropdown__group_opened')) {
          arrow.classList.add('dropdown__arrow_rotated');
          arrow.textContent = 'keyboard_arrow_up';
        } else {
          arrow.textContent = 'keyboard_arrow_down';
        }
      });
      showResultText();
    };

    // обработчики событий и инициализация функций
    startInitDropdown();

    // функция отслеживания нажатия клавиши Enter для открытия/закрытия dropdown
    const handleFieldKeydownEnter = (e) => {
      if (e.key === 'Enter') toggleDropdown();
    };

    // функция включения обводки при переключении с помощью клавиши TAB
    const handleFieldFocus = () => {
      if ((!document.body.classList.contains('using-mouse'))) toggleDropdown();
    };

    const handleButtonClearClick = () => clearDropdown();
    const handleButtonApplyClick = () => toggleDropdown();
    const handleFieldClick = () => toggleDropdown();
    const handleFieldFocusout = () => toggleDropdown();

    dropdown.addEventListener('click', handleFieldClick);
    dropdown.addEventListener('keydown', handleFieldKeydownEnter);
    dropdown.addEventListener('focus', handleFieldFocus);
    focusLimiter.addEventListener('focusout', handleFieldFocusout);

    counterBtns.forEach((btn) => {
      btn.addEventListener('click', handleFieldCounterBtnClick);
    });

    if (buttonApply && buttonClear) {
      buttonApply.addEventListener('click', handleButtonApplyClick);
      buttonClear.addEventListener('click', handleButtonClearClick);
    }
  });

  const handleDocumentClick = (e) => {
    if (!e.target.closest('.js-dropdown__group')) {
      blocksWithDropdown.forEach((block) => {
        const dropdownArrows = block.querySelector('.js-dropdown__arrow');

        block.classList.remove('dropdown__group_opened');
        dropdownArrows.classList.remove('dropdown__arrow_rotated');
        dropdownArrows.textContent = 'keyboard_arrow_down';
      });
    }
  };

  document.addEventListener('click', handleDocumentClick);
}

export default initDropdown;
