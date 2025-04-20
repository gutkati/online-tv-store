let sliderProductList = document.querySelector(".slider__list") as HTMLElement | null;
let btnUpSlider = document.querySelector(".slider__btn-up") as HTMLButtonElement | null;
let btnDownSlider = document.querySelector(".slider__btn-down") as HTMLButtonElement | null;

let sliderListImg = document.querySelectorAll(".slider__img") as NodeListOf<HTMLElement> | null;
let mainImage = document.querySelector(".main-image img") as HTMLImageElement | null;

const scrollStepSlider: number = 80
let isMobileView = window.innerWidth <= 480


function updateViewState() {
    isMobileView = window.innerWidth <= 480
    if (!sliderListImg || sliderListImg.length === 0) return;

    if (isMobileView) {
        sliderListImg?.forEach(img => img.classList.remove('active'));
    } else {

        const hasActive = Array.from(sliderListImg).some(img => img.classList.contains('active'));

        if (!hasActive && sliderListImg[0]) {
            sliderListImg[0].classList.add('active');
            const imgElement = sliderListImg[0].querySelector('img')
            const imgSrc = imgElement?.getAttribute('src');

            if (mainImage && imgSrc) {
                mainImage.setAttribute('src', imgSrc)
            }
        }
    }
}

// проверить видимость стрелок слайдера
function updateScrollBtnVisibility() {
    if (!sliderProductList || !btnUpSlider || !btnDownSlider) return;

    if (isMobileView) {
        const maxScroll = sliderProductList.scrollWidth - sliderProductList.clientWidth;
        const currentScroll = sliderProductList.scrollLeft;

        btnUpSlider.classList.toggle("hidden", currentScroll <= 0);
        btnDownSlider.classList.toggle("hidden", currentScroll >= maxScroll - 1);

    } else {
        const maxScroll = sliderProductList.scrollHeight - sliderProductList.clientHeight;
        const currentScroll = sliderProductList.scrollTop;

        btnUpSlider.classList.toggle("hidden", currentScroll <= 0);
        btnDownSlider.classList.toggle("hidden", currentScroll >= maxScroll - 1);
    }

}

// функция прокрутки слайдера
function scrollSlider(direction: "top" | "bottom" | "left" | "right") {
    if (!sliderProductList) return;

    const offset = direction === "top" || direction === "left" ? -scrollStepSlider : scrollStepSlider;

    if (isMobileView) {
        sliderProductList.scrollBy({left: offset, "behavior": "smooth"})
    } else {
        sliderProductList.scrollBy({top: offset, "behavior": "smooth"})
    }

    setTimeout(updateScrollBtnVisibility, 200)
}

// подставляет картинки из слайдера

sliderListImg?.forEach(itemImg => {
    itemImg.addEventListener("click", () => {

        sliderListImg?.forEach(img => img.classList.remove('active'));

        itemImg.classList.add('active')

        const imgElement = itemImg.querySelector('img');
        const imgSrc = imgElement?.getAttribute('src');

        if (mainImage && imgSrc) {
            mainImage.setAttribute('src', imgSrc)
        }
    })
})

// срабатывает после загрузки картинок
window.addEventListener("load", () => {
    updateScrollBtnVisibility();
    updateViewState();
});

// Отслеживание изменений размера окна
window.addEventListener('resize', () => {
    updateViewState();
});

sliderProductList?.addEventListener('scroll', updateScrollBtnVisibility);

btnUpSlider?.addEventListener("click", () => scrollSlider("top"));
btnDownSlider?.addEventListener("click", () => scrollSlider("bottom"));
