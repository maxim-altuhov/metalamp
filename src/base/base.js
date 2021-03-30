function checkedFocus() {
  document.body.classList.add('using-mouse');

  function addClassUsingMouse() {
    document.body.classList.add('using-mouse');
  }

  function checkedPressTab(e) {
    if (e.key === 'Tab') document.body.classList.remove('using-mouse');
  }

  document.body.addEventListener('mousedown', addClassUsingMouse);
  document.body.addEventListener('keydown', checkedPressTab);
}

export { checkedFocus };
