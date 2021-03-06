import Inputmask from 'inputmask';

function MaskForInput() {
  const selector = document.querySelectorAll('[data-typemask="date"]');

  Inputmask({
    mask: '99.99.9999',
    showMaskOnHover: false,
    placeholder: 'ДД.ММ.ГГГГ'
  }).mask(selector);
}

export default MaskForInput;
