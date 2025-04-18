let sliderProductList = document.querySelector(".slider__list") as HTMLElement | null;
let btnUpSlider = document.querySelector(".slider__btn-up") as HTMLButtonElement | null;
let btnDownSlider = document.querySelector(".slider__btn-down") as HTMLButtonElement | null;

let sliderListImg = document.querySelectorAll(".slider__img") as NodeListOf<HTMLElement> | null;
let mainImage = document.querySelector(".main-image img") as HTMLImageElement | null;

console.log("list", sliderListImg)

const scrollStepSlider = 80

// проверить видимость стрелок слайдера
function updateScrollBtnVisibility() {
    if (!sliderProductList || !btnUpSlider || !btnDownSlider) return;

    const maxScroll = sliderProductList.scrollHeight - sliderProductList.clientHeight;
    const currentScroll = sliderProductList.scrollTop;

    btnUpSlider.classList.toggle("hidden", currentScroll <= 0);
    btnDownSlider.classList.toggle("hidden", currentScroll >= maxScroll - 1);
}

// функция прокрутки слайдера
function scrollSlider(direction: "top" | "bottom") {
    if (!sliderProductList) return;

    const offset = direction === "top" ? -scrollStepSlider : scrollStepSlider;
    sliderProductList.scrollBy({top: offset, "behavior": "smooth"})

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
});

sliderProductList?.addEventListener('scroll', updateScrollBtnVisibility);

btnUpSlider?.addEventListener("click", () => scrollSlider("top"));
btnDownSlider?.addEventListener("click", () => scrollSlider("bottom"));
