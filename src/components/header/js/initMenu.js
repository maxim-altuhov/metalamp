import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

function initMenu() {
  const linksWithDropdown = document.querySelectorAll('.js-header__menu-dropdown');
  const dropdownArrowsAll = document.querySelectorAll('.js-header__link-arrow');
  const blockLinksWithDropdown = document.querySelectorAll('.js-header__submenu');
  const allLinksInDropdown = document.querySelectorAll('.js-header__submenu a');
  const lastLinksInDropdown = document.querySelectorAll('.js-header__submenu .header__menu-link:last-child a');
  const menu = document.querySelector('.js-header__menu');
  const allLinkInMenu = menu.querySelectorAll('a');
  const menuOverlay = document.querySelector('.js-menu-overlay');
  const hamburger = document.querySelector('.js-ham');
  const maxWidthMenuIsActivated = 1199;

  // устанавливаем доступность при переключений TAB-ом
  const setTabindexForLink = () => {
    allLinkInMenu.forEach(elem => {
      if (window.matchMedia(`(max-width: ${maxWidthMenuIsActivated}px)`).matches && !hamburger.classList.contains('active')) {
        elem.setAttribute('tabindex', '-1');
      } else {
        elem.setAttribute('tabindex', '');
      }

      if (hamburger.classList.contains('active')) {
        allLinksInDropdown.forEach(item => {
          item.setAttribute('tabindex', '-1');
        });
      }
    });
  };

  // открытие подменю при наведении
  const showBlockmenu = (e) => {
    if (e.target.getAttribute('href') === '#') e.preventDefault();

    if (window.matchMedia(`(min-width: ${maxWidthMenuIsActivated + 1}px)`).matches) {
      const blockLinks = e.currentTarget.querySelector('.js-header__submenu');
      const currentLink = e.currentTarget.querySelector('.js-header__link-dropdown a');
      blockLinks.classList.remove('header__submenu_hided');
      currentLink.classList.add('header__menu-link_active');
    }
  };

  // закрытие подменю
  const hideBlockmenu = (e) => {
    if (e.target.getAttribute('href') === '#') e.preventDefault();

    if (window.matchMedia(`(min-width: ${maxWidthMenuIsActivated + 1}px)`).matches) {
      let blockLinks;
      let currentLink;

      if (e.type === 'focusout') {
        const topParentSubmenu = e.target.parentElement.parentElement;
        const topParentDrodownBlock = e.target.parentElement.parentElement.parentElement;
        blockLinks = topParentSubmenu;
        currentLink = topParentDrodownBlock.querySelector('a');
      } else {
        blockLinks = e.currentTarget.querySelector('.js-header__submenu');
        currentLink = e.currentTarget.querySelector('.js-header__link-dropdown a');
      }

      blockLinks.classList.add('header__submenu_hided');
      currentLink.classList.remove('header__menu-link_active');
    }
  };

  // открытие подменю при клике на мобильной версии
  const openSubmenu = (e) => {
    if (e.target.getAttribute('href') === '#') e.preventDefault();

    if (window.matchMedia(`(max-width: ${maxWidthMenuIsActivated}px)`).matches) {
      const blockLinks = e.currentTarget.querySelector('.js-header__submenu');
      const links = e.currentTarget.querySelectorAll('.js-header__submenu a');
      const blockArrow = e.currentTarget.querySelector('.js-header__link-arrow');

      if (blockLinks.classList.contains('header__submenu_hided')) {
        blockLinks.style.opacity = 1;
        blockLinks.style.maxHeight = blockLinks.scrollHeight + 'px';
        blockLinks.classList.remove('header__submenu_hided');
        blockArrow.textContent = 'expand_less';

        links.forEach(item => {
          item.setAttribute('tabindex', '');
        });
      } else {
        blockLinks.style.opacity = '';
        blockLinks.style.maxHeight = '';
        blockLinks.classList.add('header__submenu_hided');
        blockArrow.textContent = 'expand_more';

        links.forEach(item => {
          item.setAttribute('tabindex', '-1');
        });
      }
    }
  };

  // переключение необходимых классов и установка свойств меню
  const toggleClassesMenu = () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('header__menu_active');
    menuOverlay.classList.toggle('menu-overlay_active');

    dropdownArrowsAll.forEach(elem => {
      elem.textContent = 'expand_more';
    });
    blockLinksWithDropdown.forEach(elem => {
      elem.style.opacity = '';
      elem.style.maxHeight = '';
      elem.classList.add('header__submenu_hided');
    });
  };

  // выполнение группы функций при клике на бургер-меню
  const activatingHamburger = () => {
    if (hamburger.classList.contains('active')) {
      toggleClassesMenu();
      enableBodyScroll(menu);
    } else if (window.matchMedia('(max-width: 575px)').matches && !hamburger.classList.contains('active')) {
      toggleClassesMenu();
      disableBodyScroll(menu);
    } else {
      toggleClassesMenu();
    }
    setTabindexForLink();
  };

  // закрытие меню при клике вне меню
  const toggleMenuClickOut = (e) => {
    if (e.target === menuOverlay) {
      toggleClassesMenu();
      setTabindexForLink();
    }
  };

  // отслеживание ресайза и видимости меню
  const resizeChecker = () => {
    if (window.matchMedia('(min-width: 576px)').matches) {
      enableBodyScroll(menu);
    } else if (hamburger.classList.contains('active')) {
      disableBodyScroll(menu);
    }

    if (window.matchMedia(`(min-width: ${maxWidthMenuIsActivated + 1}px)`).matches && hamburger.classList.contains('active')) {
      toggleClassesMenu();
    }
    setTabindexForLink();
  };

  const activatingHamburgerWithEnter = (e) => {
    if (e.key === 'Enter') {
      activatingHamburger();
    }
  };

  // инициализация функций
  setTabindexForLink();

  // обработчики событий
  linksWithDropdown.forEach(elem => {
    elem.addEventListener('mouseover', showBlockmenu);
    elem.addEventListener('mouseout', hideBlockmenu);
    elem.addEventListener('click', openSubmenu);
    elem.addEventListener('focusin', showBlockmenu);
  });

  lastLinksInDropdown.forEach(elem => {
    elem.addEventListener('focusout', hideBlockmenu);
  });

  hamburger.addEventListener('keydown', activatingHamburgerWithEnter);
  hamburger.addEventListener('click', activatingHamburger);
  menuOverlay.addEventListener('click', toggleMenuClickOut);
  window.addEventListener('resize', resizeChecker);
}

export default initMenu;
