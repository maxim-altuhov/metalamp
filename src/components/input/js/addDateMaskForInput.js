import Inputmask from 'inputmask';

function addDateMaskForInput() {
  const selector = document.querySelectorAll('[data-mask-date]');

  Inputmask({
    mask: '99.99.9999',
    showMaskOnHover: false,
    placeholder: 'ДД.ММ.ГГГГ',
  }).mask(selector);
}

export default addDateMaskForInput;
