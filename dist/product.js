"use strict";
let sliderProductList = document.querySelector(".slider__list");
let btnUpSlider = document.querySelector(".slider__btn-up");
let btnDownSlider = document.querySelector(".slider__btn-down");
let sliderListImg = document.querySelectorAll(".slider__img");
let mainImage = document.querySelector(".main-image img");
console.log("list", sliderListImg);
const scrollStepSlider = 80;
// проверить видимость стрелок слайдера
function updateScrollBtnVisibility() {
    if (!sliderProductList || !btnUpSlider || !btnDownSlider)
        return;
    const maxScroll = sliderProductList.scrollHeight - sliderProductList.clientHeight;
    const currentScroll = sliderProductList.scrollTop;
    btnUpSlider.classList.toggle("hidden", currentScroll <= 0);
    btnDownSlider.classList.toggle("hidden", currentScroll >= maxScroll - 1);
}
// функция прокрутки слайдера
function scrollSlider(direction) {
    if (!sliderProductList)
        return;
    const offset = direction === "top" ? -scrollStepSlider : scrollStepSlider;
    sliderProductList.scrollBy({ top: offset, "behavior": "smooth" });
    setTimeout(updateScrollBtnVisibility, 200);
}
// подставляет картинки из слайдера
sliderListImg === null || sliderListImg === void 0 ? void 0 : sliderListImg.forEach(itemImg => {
    itemImg.addEventListener("click", () => {
        sliderListImg === null || sliderListImg === void 0 ? void 0 : sliderListImg.forEach(img => img.classList.remove('active'));
        itemImg.classList.add('active');
        const imgElement = itemImg.querySelector('img');
        const imgSrc = imgElement === null || imgElement === void 0 ? void 0 : imgElement.getAttribute('src');
        if (mainImage && imgSrc) {
            mainImage.setAttribute('src', imgSrc);
        }
    });
});
// срабатывает после загрузки картинок
window.addEventListener("load", () => {
    updateScrollBtnVisibility();
});
sliderProductList === null || sliderProductList === void 0 ? void 0 : sliderProductList.addEventListener('scroll', updateScrollBtnVisibility);
btnUpSlider === null || btnUpSlider === void 0 ? void 0 : btnUpSlider.addEventListener("click", () => scrollSlider("top"));
btnDownSlider === null || btnDownSlider === void 0 ? void 0 : btnDownSlider.addEventListener("click", () => scrollSlider("bottom"));
