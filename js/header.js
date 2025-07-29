document.querySelectorAll("#desktop-menu > .group").forEach((group) => {
  const submenu = group.querySelector(".submenu");
  let timeout;

  group.addEventListener("mouseover", () => {
    clearTimeout(timeout);
    submenu.classList.add("open");
  });

  group.addEventListener("mouseout", (e) => {
    if (group.contains(e.relatedTarget)) return;
    timeout = setTimeout(() => submenu.classList.remove("open"), 100);
  });
});

const items = document.querySelectorAll("#categories [data-sub]");

const submenus = document.querySelectorAll("[data-target]");

const secondItems = document.querySelectorAll("[data-sub-second]");

function showSubmenu(target) {
  submenus.forEach((el) => {
    el.classList.remove("open");
    if (el.dataset.target === target) {
      el.classList.add("open");
    }
  });

  items.forEach((el) => {
    el.classList.remove("bg-gray-200", "font-semibold");
    const svg = el.querySelector("svg");
    if (svg) {
      //   svg.classList.remove("text-accent");
    }

    if (el.getAttribute("data-sub") === target) {
      el.classList.add("bg-gray-200", "font-semibold");
      //   if (svg) svg.classList.add("text-accent");
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

showSubmenu("Pump Brands");
setSecondActive();

// MOB MENU

// Тогглы первого уровня (Products, Brands и т.п.)
const mobileMenu = document.getElementById("mobile-menu-overlay");
const mobileMenuOpen = document.getElementById("mobile-toggle");
const mobileMenuClose = document.getElementById("mobile-menu-close");

mobileMenuOpen.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");

  // Открываем секцию Products
  const productsMenu = document.querySelectorAll("[data-toggle]");

  productsMenu.forEach((ele) => {
    ele.addEventListener("click", () => {
      const target = ele.getAttribute("data-toggle");
      const menu = document.querySelector(`[data-submenu="${target}"]`);

      if (menu) {
        const isOpen = menu.classList.contains("open"); // проверяем состояние
        const allMenu = document.querySelectorAll("[data-submenu]");
        allMenu.forEach((m) => m.classList.remove("open", "mt-6"));

        // Сбрасываем ротацию иконок у всех
        productsMenu.forEach((btn) => {
          const icon = btn.querySelector("svg[data-icon]");
          icon?.classList.remove("rotate-180");
        });

        // Если оно было закрыто — открываем и вращаем иконку
        if (!isOpen) {
          menu.classList.add("open", "mt-6");
          const icon = ele.querySelector("svg[data-icon]");
          icon?.classList.add("rotate-180");
        }
      }
    });
  });
});

mobileMenuClose.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});

// Тогглы первой вложенности (Air, Pumps, etc.)
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

    // Если клик был по уже открытой — не открываем снова (т.е. просто закрыли всё)
    if (!isOpen) {
      submenu.classList.add("open");
      const icon = toggle.querySelector("svg[data-icon]");
      icon?.classList.add("rotate-180");
    }
  });
});
