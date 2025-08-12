document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider-container");

  sliders.forEach((container) => {
    const slider = container.querySelector(".slider-track");
    const prevBtn = container.querySelector(".slider-prev");
    const nextBtn = container.querySelector(".slider-next");
    const cardWith = container.getElementsByTagName("a")[0].offsetWidth || 322
    if (!slider || !prevBtn || !nextBtn) return;

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: -cardWith - 30, // ширина видимой области
        behavior: "smooth",
      });
    });

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: cardWith + 30,
        behavior: "smooth",
      });
    });
  });
});
