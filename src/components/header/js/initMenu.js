import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

function initMenu() {
  const linksWithDropdown = document.querySelectorAll('.js-header__menu-link_with_dropdown');
  const dropdownArrows = document.querySelectorAll('.js-header__link-arrow');
  const submenuBlocks = document.querySelectorAll('.js-header__submenu');
  const allLinksInSubmenu = document.querySelectorAll('.js-header__submenu a');
  const lastLinksInSubmenu = document.querySelectorAll('.js-header__submenu .header__menu-link:last-child a');
  const menu = document.querySelector('.js-header__menu');
  const allLinksInMenu = menu.querySelectorAll('a');
  const menuOverlay = document.querySelector('.js-menu-overlay');
  const hamburger = document.querySelector('.js-hamburger');
  const MAX_WIDTH_WHEN_MENU_IS_ACTIVATED = 1199;
  const NO_LINK = '#';

  // Устанавливаем доступность при переключений TAB-ом
  const setTabindexForLinks = () => {
    allLinksInMenu.forEach((linkInMenu) => {
      if (window.matchMedia(`(max-width: ${MAX_WIDTH_WHEN_MENU_IS_ACTIVATED}px)`).matches && !hamburger.classList.contains('hamburger_active')) {
        linkInMenu.setAttribute('tabindex', '-1');
      } else {
        linkInMenu.setAttribute('tabindex', '');
      }

      if (hamburger.classList.contains('hamburger_active')) {
        allLinksInSubmenu.forEach((linkInSubmenu) => {
          linkInSubmenu.setAttribute('tabindex', '-1');
        });
      }
    });
  };

  // Открытие подменю при наведении
  const openSubmenu = (e) => {
    if (e.target.getAttribute('href') === NO_LINK) e.preventDefault();

    if (window.matchMedia(`(min-width: ${MAX_WIDTH_WHEN_MENU_IS_ACTIVATED + 1}px)`).matches) {
      const currentSubmenuBlock = e.currentTarget.querySelector('.js-header__submenu');
      const currentActiveLink = e.currentTarget.querySelector('.js-header__link-dropdown a');
      currentSubmenuBlock.classList.remove('header__submenu_hidden');
      currentActiveLink.classList.add('header__menu-link_active');
    }
  };

  // Закрытие подменю
  const closeSubmenu = (e) => {
    if (e.target.getAttribute('href') === NO_LINK) e.preventDefault();

    if (window.matchMedia(`(min-width: ${MAX_WIDTH_WHEN_MENU_IS_ACTIVATED + 1}px)`).matches) {
      let currentSubmenuBlock;
      let currentActiveLink;

      if (e.type === 'focusout') {
        const topParentSubmenu = e.target.parentElement.parentElement;
        const topParentDrodownBlock = e.target.parentElement.parentElement.parentElement;
        currentSubmenuBlock = topParentSubmenu;
        currentActiveLink = topParentDrodownBlock.querySelector('a');
      } else {
        currentSubmenuBlock = e.currentTarget.querySelector('.js-header__submenu');
        currentActiveLink = e.currentTarget.querySelector('.js-header__link-dropdown a');
      }

      currentSubmenuBlock.classList.add('header__submenu_hidden');
      currentActiveLink.classList.remove('header__menu-link_active');
    }
  };

  // Открытие подменю при клике на мобильной версии
  const handleMenuLinkClick = (e) => {
    if (e.target.getAttribute('href') === NO_LINK) e.preventDefault();

    if (window.matchMedia(`(max-width: ${MAX_WIDTH_WHEN_MENU_IS_ACTIVATED}px)`).matches) {
      const currentSubmenuBlock = e.currentTarget.querySelector('.js-header__submenu');
      const currentActiveLink = e.currentTarget.querySelectorAll('.js-header__submenu a');
      const currentBlockWithArrow = e.currentTarget.querySelector('.js-header__link-arrow');

      if (currentSubmenuBlock.classList.contains('header__submenu_hidden')) {
        currentSubmenuBlock.style.opacity = 1;
        currentSubmenuBlock.style.maxHeight = currentSubmenuBlock.scrollHeight + 'px';
        currentSubmenuBlock.classList.remove('header__submenu_hidden');
        currentBlockWithArrow.textContent = 'expand_less';

        currentActiveLink.forEach((link) => {
          link.setAttribute('tabindex', '');
        });
      } else {
        currentSubmenuBlock.style.opacity = '';
        currentSubmenuBlock.style.maxHeight = '';
        currentSubmenuBlock.classList.add('header__submenu_hidden');
        currentBlockWithArrow.textContent = 'expand_more';

        currentActiveLink.forEach((link) => {
          link.setAttribute('tabindex', '-1');
        });
      }
    }
  };

  // Переключение необходимых классов и установка свойств меню
  const changeMenuProp = () => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('header__menu_active');
    menuOverlay.classList.toggle('menu-overlay_active');

    dropdownArrows.forEach((elemWithArrow) => {
      elemWithArrow.textContent = 'expand_more';
    });
    submenuBlocks.forEach((block) => {
      block.style.opacity = '';
      block.style.maxHeight = '';
      block.classList.add('header__submenu_hidden');
    });
  };

  // Выполнение группы функций при клике на бургер-меню
  const handleHamburgerClick = () => {
    if (hamburger.classList.contains('hamburger_active')) {
      changeMenuProp();
      enableBodyScroll(menu);
    } else if (window.matchMedia('(max-width: 575px)').matches && !hamburger.classList.contains('hamburger_active')) {
      changeMenuProp();
      disableBodyScroll(menu);
    } else {
      changeMenuProp();
    }

    setTabindexForLinks();
  };

  // Закрытие меню при клике вне меню
  const handleMenuOverlayClick = (e) => {
    if (e.target === menuOverlay) {
      changeMenuProp();
      setTabindexForLinks();
    }
  };

  // Отслеживание ресайза и видимости меню
  const handleWindowResize = () => {
    if (window.matchMedia('(min-width: 576px)').matches) {
      enableBodyScroll(menu);
    } else if (hamburger.classList.contains('hamburger_active')) {
      disableBodyScroll(menu);
    }

    if (window.matchMedia(`(min-width: ${MAX_WIDTH_WHEN_MENU_IS_ACTIVATED + 1}px)`).matches && hamburger.classList.contains('hamburger_active')) {
      changeMenuProp();
    }
    setTabindexForLinks();
  };

  const handleHamburgerKeydownEnter = (e) => {
    if (e.key === 'Enter') handleHamburgerClick();
  };

  // Инициализация функций
  setTabindexForLinks();

  // Обработчики событий
  const handleMenuLinkFocusout = (e) => closeSubmenu(e);
  const handleMenuLinkMouseout = (e) => closeSubmenu(e);
  const handleMenuLinkMouseover = (e) => openSubmenu(e);
  const handleMenuLinkFocusin = (e) => openSubmenu(e);

  linksWithDropdown.forEach((link) => {
    link.addEventListener('mouseover', handleMenuLinkMouseover);
    link.addEventListener('mouseout', handleMenuLinkMouseout);
    link.addEventListener('click', handleMenuLinkClick);
    link.addEventListener('focusin', handleMenuLinkFocusin);
  });

  lastLinksInSubmenu.forEach((lastLinkInSubmenu) => {
    lastLinkInSubmenu.addEventListener('focusout', handleMenuLinkFocusout);
  });

  hamburger.addEventListener('keydown', handleHamburgerKeydownEnter);
  hamburger.addEventListener('click', handleHamburgerClick);
  menuOverlay.addEventListener('click', handleMenuOverlayClick);
  window.addEventListener('resize', handleWindowResize);
}

export default initMenu;
