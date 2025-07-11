document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item, index) => {
    const btn = item.querySelector("button");
    const p = item.querySelector("p");
    const line = item.querySelector(".accordion-line");
    const spanWithRotate = btn.querySelector("span.absolute");

    if (index === 0) {
      p.classList.add("accordion-paragraph-active");
      p.style.height = "auto"; // или p.scrollHeight + "px";
      line?.classList.add("fill");
      spanWithRotate?.classList.remove("rotate-90");
    }

    item.addEventListener("click", () => {
      const isActive = p.classList.contains("accordion-paragraph-active");

      accordionItems.forEach((otherItem) => {
        const otherP = otherItem.querySelector("p");
        const otherLine = otherItem.querySelector(".accordion-line");
        const otherSpan = otherItem.querySelector("button span.absolute");

        if (otherItem === item) return; // 👈 пропускаем текущий

        if (otherP.classList.contains("accordion-paragraph-active")) {
          otherP.style.height = otherP.scrollHeight + "px";
          requestAnimationFrame(() => {
            otherP.style.height = "0px";
          });
          otherP.classList.remove("accordion-paragraph-active");
          otherLine?.classList.remove("fill");
          otherSpan?.classList.add("rotate-90");
        }
      });

      if (!isActive) {
        p.classList.add("accordion-paragraph-active");
        p.style.height = p.scrollHeight + "px";
        line?.classList.add("fill");
        spanWithRotate?.classList.remove("rotate-90");

        p.addEventListener(
          "transitionend",
          () => {
            if (p.classList.contains("accordion-paragraph-active")) {
              p.style.height = "auto";
            }
          },
          { once: true }
        );
      } else {
        // если клик по уже открытому элементу — закрыть его и убрать rotate
        p.style.height = p.scrollHeight + "px";
        requestAnimationFrame(() => {
          p.style.height = "0px";
        });
        p.classList.remove("accordion-paragraph-active");
        line?.classList.remove("fill");
        spanWithRotate?.classList.add("rotate-90");
      }
    });
  });
});
