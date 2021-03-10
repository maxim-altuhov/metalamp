import Inputmask from 'inputmask';

function maskForInput() {
  const selector = document.querySelectorAll('[data-typemask="date"]');

  Inputmask({
    mask: '99.99.9999',
    showMaskOnHover: false,
    placeholder: 'ДД.ММ.ГГГГ'
  }).mask(selector);
}

export default maskForInput;
