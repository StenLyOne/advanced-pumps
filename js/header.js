document.querySelectorAll("#desktop-menu > [data-menu]").forEach((group) => {
  const submenu = group.querySelector(".submenu");
  const btn = group.querySelector("button");
  let timeout;

  group.addEventListener("mouseover", () => {
    btn.classList.add("text-accent");
    clearTimeout(timeout);
    submenu.classList.add("open");
  });

  group.addEventListener("mouseout", (e) => {
    if (group.contains(e.relatedTarget)) return;
    timeout = setTimeout(() => submenu.classList.remove("open"), 100);

    btn.classList.remove("text-accent");
  });
});

const items = document.querySelectorAll("#categories [data-sub]");
const submenus = document.querySelectorAll("[data-target]");
const secondItems = document.querySelectorAll("[data-sub-second]");

function showSubmenu(target) {
  // Находим подменю, если есть
  const currentSubmenu = [...submenus].find(
    (el) => el.dataset.target === target
  );

  // Если сабменю нет — ищем контейнер по item'у
  const fallbackItem = [...items].find((el) => el.dataset.sub === target);
  const container =
    currentSubmenu?.closest("[data-menu-container]") ||
    fallbackItem?.closest("[data-menu-container]");

  if (!container) return; // вообще ничего не нашли — выходим

  // Закрываем соседние подменю
  const siblings = container.querySelectorAll("[data-target]");
  siblings.forEach((el) => {
    if (el !== currentSubmenu) {
      el.classList.remove("open");
    }
  });

  // Открываем текущее подменю, если есть
  if (currentSubmenu) {
    currentSubmenu.classList.add("open");
  }

  // Обновляем подсветку айтемов только в пределах container
  const itemsButtons = container.querySelectorAll("[data-sub]");
  itemsButtons.forEach((el) => {
    el.classList.remove("bg-gray-200", "font-semibold");
    if (el.getAttribute("data-sub") === target) {
      el.classList.add("bg-gray-200", "font-semibold");
    }
  });
}

function setSecondActive(activeItem) {
  secondItems.forEach((el) => {
    const svg = el.querySelector("svg");

    // Сброс всех
    el.classList.remove("bg-gray-200", "font-medium");
    if (svg) {
      svg.classList.remove("opacity-100");
      svg.classList.add("opacity-0");
    }

    // Применить активному
    if (el === activeItem) {
      el.classList.add("bg-gray-200", "font-medium");
      if (svg) {
        svg.classList.remove("opacity-0");
        svg.classList.add("opacity-100");
      }
    }
  });
}

secondItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const target = item.getAttribute("data-sub-second");
    setSecondActive(item);
  });
});

items.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const target = item.getAttribute("data-sub");
    showSubmenu(target);
  });
});

showSubmenu("air");
showSubmenu("Pump Brands");

// MOB MENU

const mobileMenu = document.getElementById("mobile-menu-overlay");
const mobileMenuToggle = document.getElementById("mobile-toggle");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const productsMenu = document.querySelectorAll("[data-toggle]");
const allSubmenus = document.querySelectorAll("[data-submenu]");
const burgerIcon = document.getElementById("nav-icon4");

mobileMenuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("-translate-y-0");

  // Анимация бургера
  burgerIcon.classList.toggle("open");

  if (isOpen) {
    // Закрываем
    mobileMenu.classList.remove("-translate-y-0");
    mobileMenu.classList.add("-translate-y-full");
  } else {
    // Открываем
    mobileMenu.classList.remove("-translate-y-full");
    mobileMenu.classList.add("-translate-y-0");
  }

  // Сброс сабменю при закрытии
  if (isOpen) {
    allSubmenus.forEach((m) => m.classList.remove("open", "mt-6"));
    productsMenu.forEach((btn) => {
      const icon = btn.querySelector("svg[data-icon]");
      icon?.classList.remove("rotate-180");
    });
  }
});

// Тогглы первого уровня (Products, Brands и т.п.)
productsMenu.forEach((ele) => {
  ele.addEventListener("click", () => {
    const target = ele.getAttribute("data-toggle");
    const menu = document.querySelector(`[data-submenu="${target}"]`);

    if (!menu) return;

    const isOpen = menu.classList.contains("open");

    // Закрываем все подменю
    allSubmenus.forEach((m) => m.classList.remove("open", "mt-6"));
    // Сбрасываем иконки
    productsMenu.forEach((btn) => {
      const icon = btn.querySelector("svg[data-icon]");
      icon?.classList.remove("rotate-180");
    });

    // Если это меню было закрыто — открываем
    if (!isOpen) {
      menu.classList.add("open", "mt-6");
      const icon = ele.querySelector("svg[data-icon]");
      icon?.classList.add("rotate-180");
    }
  });
});

// Тогглы второй вложенности (Air, Pumps, etc.)
document.querySelectorAll("[data-inner-toggle]").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const target = toggle.getAttribute("data-inner-toggle");
    const submenu = document.querySelector(`[data-inner-submenu="${target}"]`);
    const isOpen = submenu.classList.contains("open");

    // Закрываем все сабменю и иконки
    document
      .querySelectorAll("[data-inner-submenu]")
      .forEach((el) => el.classList.remove("open"));
    document
      .querySelectorAll("[data-inner-toggle] svg[data-icon]")
      .forEach((icon) => icon.classList.remove("rotate-180"));

    // Если клик был по уже открытой — не открываем снова
    if (!isOpen) {
      submenu.classList.add("open");
      const icon = toggle.querySelector("svg[data-icon]");
      icon?.classList.add("rotate-180");
    }
  });
});
