"use strict";
let sliderProductList = document.querySelector(".slider__list");
let btnUpSlider = document.querySelector(".slider__btn-up");
let btnDownSlider = document.querySelector(".slider__btn-down");
let sliderListImg = document.querySelectorAll(".slider__img");
let mainImage = document.querySelector(".main-image img");
let btnReviewAdd = document.querySelector('.review-add');
let modalComment = document.querySelector('.modal_comment');
let btnCommentClose = document.querySelector('.modal-comment-close');
let arrReviews = [
    {
        name: "Kate",
        date: "14.04.2025",
        dignity: "",
        resume: "",
    }
];
const scrollStepSlider = 80;
let isMobileView = window.innerWidth <= 480;
function updateViewState() {
    isMobileView = window.innerWidth <= 480;
    if (!sliderListImg || sliderListImg.length === 0)
        return;
    if (isMobileView) {
        sliderListImg === null || sliderListImg === void 0 ? void 0 : sliderListImg.forEach(img => img.classList.remove('active'));
    }
    else {
        const hasActive = Array.from(sliderListImg).some(img => img.classList.contains('active'));
        if (!hasActive && sliderListImg[0]) {
            sliderListImg[0].classList.add('active');
            const imgElement = sliderListImg[0].querySelector('img');
            const imgSrc = imgElement === null || imgElement === void 0 ? void 0 : imgElement.getAttribute('src');
            if (mainImage && imgSrc) {
                mainImage.setAttribute('src', imgSrc);
            }
        }
    }
}
// проверить видимость стрелок слайдера
function updateScrollBtnVisibility() {
    if (!sliderProductList || !btnUpSlider || !btnDownSlider)
        return;
    if (isMobileView) {
        const maxScroll = sliderProductList.scrollWidth - sliderProductList.clientWidth;
        const currentScroll = sliderProductList.scrollLeft;
        btnUpSlider.classList.toggle("hidden", currentScroll <= 0);
        btnDownSlider.classList.toggle("hidden", currentScroll >= maxScroll - 1);
    }
    else {
        const maxScroll = sliderProductList.scrollHeight - sliderProductList.clientHeight;
        const currentScroll = sliderProductList.scrollTop;
        btnUpSlider.classList.toggle("hidden", currentScroll <= 0);
        btnDownSlider.classList.toggle("hidden", currentScroll >= maxScroll - 1);
    }
}
// функция прокрутки слайдера
function scrollSlider(direction) {
    if (!sliderProductList)
        return;
    const offset = direction === "top" || direction === "left" ? -scrollStepSlider : scrollStepSlider;
    if (isMobileView) {
        sliderProductList.scrollBy({ left: offset, "behavior": "smooth" });
    }
    else {
        sliderProductList.scrollBy({ top: offset, "behavior": "smooth" });
    }
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
    updateViewState();
});
// Отслеживание изменений размера окна
window.addEventListener('resize', () => {
    updateViewState();
});
sliderProductList === null || sliderProductList === void 0 ? void 0 : sliderProductList.addEventListener('scroll', updateScrollBtnVisibility);
btnUpSlider === null || btnUpSlider === void 0 ? void 0 : btnUpSlider.addEventListener("click", () => scrollSlider("top"));
btnDownSlider === null || btnDownSlider === void 0 ? void 0 : btnDownSlider.addEventListener("click", () => scrollSlider("bottom"));
btnReviewAdd === null || btnReviewAdd === void 0 ? void 0 : btnReviewAdd.addEventListener('click', () => {
    modalComment === null || modalComment === void 0 ? void 0 : modalComment.classList.add('hidden-modal');
});
btnCommentClose === null || btnCommentClose === void 0 ? void 0 : btnCommentClose.addEventListener('click', () => {
    modalComment === null || modalComment === void 0 ? void 0 : modalComment.classList.remove('hidden-modal');
});
