// открытие подменю при наведении
function openingMenu() {
  const links = document.querySelectorAll('.header__menu-dropdown');

  function showBlockmenu(e) {
    const blockLinks = e.currentTarget.querySelector('.header__submenu');
    blockLinks.classList.remove('none');
  }

  function hideBlockmenu(e) {
    const blockLinks = e.currentTarget.querySelector('.header__submenu');
    blockLinks.classList.add('none');
  }

  links.forEach(elem => {
    elem.addEventListener('mouseover', showBlockmenu);
    elem.addEventListener('mouseout', hideBlockmenu);
  });
}

export default openingMenu;
