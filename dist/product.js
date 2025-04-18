"use strict";
let sliderProductList = document.querySelector(".slider__list");
let btnUpSlider = document.querySelector(".slider__btn-up");
let btnDownSlider = document.querySelector(".slider__btn-down");
const scrollStepSlider = 80;
function updateScrollBtnVisibility() {
    if (!sliderProductList || !btnUpSlider || !btnDownSlider)
        return;
    const maxScroll = sliderProductList.scrollHeight - sliderProductList.clientHeight;
    const currentScroll = sliderProductList.scrollTop;
    btnUpSlider.classList.toggle("hidden", currentScroll <= 0);
    btnDownSlider.classList.toggle("hidden", currentScroll >= maxScroll - 1);
}
function scrollSlider(direction) {
    if (!sliderProductList)
        return;
    const offset = direction === "top" ? -scrollStepSlider : scrollStepSlider;
    sliderProductList.scrollBy({ top: offset, "behavior": "smooth" });
    setTimeout(updateScrollBtnVisibility, 200);
}
window.addEventListener("load", () => {
    updateScrollBtnVisibility();
});
sliderProductList === null || sliderProductList === void 0 ? void 0 : sliderProductList.addEventListener('scroll', updateScrollBtnVisibility);
btnUpSlider === null || btnUpSlider === void 0 ? void 0 : btnUpSlider.addEventListener("click", () => scrollSlider("top"));
btnDownSlider === null || btnDownSlider === void 0 ? void 0 : btnDownSlider.addEventListener("click", () => scrollSlider("bottom"));
