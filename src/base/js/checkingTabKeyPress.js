// добавление стилизации при переключении фокуса с помощью клавиши "TAB"
function checkingTabKeyPress() {
  document.body.classList.add('using-mouse');
  const handleAddClassUsingMouse = () => document.body.classList.add('using-mouse');
  const handleCheckingTabKeyPress = (e) => {
    const CONTROL_KEY = 'Tab';
    if (e.key === CONTROL_KEY) document.body.classList.remove('using-mouse');
  };

  document.addEventListener('mousedown', handleAddClassUsingMouse);
  document.addEventListener('keydown', handleCheckingTabKeyPress);
}

export default checkingTabKeyPress;
