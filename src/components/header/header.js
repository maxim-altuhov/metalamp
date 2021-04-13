import {
  disableBodyScroll,
  enableBodyScroll
} from 'body-scroll-lock';

function initMenu() {
  const linksWithDropdown = document.querySelectorAll('.js-header__menu-dropdown');
  const dropdownArrowsAll = document.querySelectorAll('.js-header__link-arrow');
  const blockLinksAll = document.querySelectorAll('.js-header__submenu');
  const menu = document.querySelector('.js-header__menu');
  const menuOverlay = document.querySelector('.js-menu__overlay');
  const hamburger = document.querySelector('.js-ham');

  // открытие подменю при наведении
  function showBlockmenu(e) {
    e.preventDefault();

    if (window.matchMedia('(min-width: 992px)').matches) {
      const blockLinks = e.currentTarget.querySelector('.js-header__submenu');
      const currentLink = e.currentTarget.querySelector('.js-header__menu-dropdown span a');
      blockLinks.classList.remove('header__submenu_hide');
      currentLink.classList.add('header__menu-link_active');
    }
  }
  // закрытие подменю
  function hideBlockmenu(e) {
    e.preventDefault();

    if (window.matchMedia('(min-width: 992px)').matches) {
      const blockLinks = e.currentTarget.querySelector('.js-header__submenu');
      const currentLink = e.currentTarget.querySelector('.js-header__menu-dropdown span a');
      blockLinks.classList.add('header__submenu_hide');
      currentLink.classList.remove('header__menu-link_active');
    }
  }

  // открытие подменю при клике на мобильной версии
  function openSubmenu(e) {
    e.preventDefault();
    if (window.matchMedia('(max-width: 991px)').matches) {
      const blockLinks = e.currentTarget.querySelector('.js-header__submenu');
      const blockArrow = e.currentTarget.querySelector('.js-header__link-arrow');

      if (blockLinks.classList.contains('header__submenu_hide')) {
        blockLinks.style.opacity = 1;
        blockLinks.style.maxHeight = blockLinks.scrollHeight + 'px';
        blockLinks.classList.remove('header__submenu_hide');
        blockArrow.textContent = 'expand_less';
      } else {
        blockLinks.style.opacity = '';
        blockLinks.style.maxHeight = '';
        blockLinks.classList.add('header__submenu_hide');
        blockArrow.textContent = 'expand_more';
      }
    }
  }

  // переключение необходимых классов и установка свойств
  function toggleClassesMenu() {
    hamburger.classList.toggle('active');
    menu.classList.toggle('header__menu_active');
    menuOverlay.classList.toggle('menu__overlay_active');

    dropdownArrowsAll.forEach(elem => {
      elem.textContent = 'expand_more';
    });
    blockLinksAll.forEach(elem => {
      elem.style.opacity = '';
      elem.style.maxHeight = '';
      elem.classList.add('header__submenu_hide');
    });
  }

  // выполнение группы функций при клике на бургер-меню
  function activatingHamburger() {
    if (hamburger.classList.contains('active')) {
      toggleClassesMenu();
      enableBodyScroll(menu);
    } else if (window.matchMedia('(max-width: 575px)').matches && !hamburger.classList.contains('active')) {
      toggleClassesMenu();
      disableBodyScroll(menu);
    } else {
      toggleClassesMenu();
    }
  }

  // закрытие меню при клике вне меню
  function toogleMenuClickOut(e) {
    if (e.target === menuOverlay) {
      toggleClassesMenu();
    }
  }

  // отслеживание ресайза и видимости меню
  function resizeChecker() {
    if (window.matchMedia('(min-width: 576px)').matches) {
      enableBodyScroll(menu);
    } else if (hamburger.classList.contains('active')) {
      disableBodyScroll(menu);
    }

    if (window.matchMedia('(min-width: 992px)').matches && hamburger.classList.contains('active')) {
      toggleClassesMenu();
    }
  }

  // обработчики событий
  linksWithDropdown.forEach(elem => {
    elem.addEventListener('mouseover', showBlockmenu);
    elem.addEventListener('mouseout', hideBlockmenu);
    elem.addEventListener('click', openSubmenu);
  });

  hamburger.addEventListener('click', activatingHamburger);
  menuOverlay.addEventListener('click', toogleMenuClickOut);
  window.addEventListener('resize', resizeChecker);
}

export default initMenu;
