let sliderProductList = document.querySelector(".slider__list") as HTMLElement | null;
let btnUpSlider = document.querySelector(".slider__btn-up") as HTMLButtonElement | null;
let btnDownSlider = document.querySelector(".slider__btn-down") as HTMLButtonElement | null;

const scrollStepSlider = 80

function updateScrollBtnVisibility() {
    if (!sliderProductList || !btnUpSlider || !btnDownSlider) return;

    const maxScroll = sliderProductList.scrollHeight - sliderProductList.clientHeight;
    const currentScroll = sliderProductList.scrollTop;

    btnUpSlider.classList.toggle("hidden", currentScroll <= 0);
    btnDownSlider.classList.toggle("hidden", currentScroll >= maxScroll - 1);
}

function scrollSlider(direction: "top" | "bottom") {
    if (!sliderProductList) return;

    const offset = direction === "top" ? -scrollStepSlider : scrollStepSlider;
    sliderProductList.scrollBy({top: offset, "behavior": "smooth"})


    setTimeout(updateScrollBtnVisibility, 200)
}

window.addEventListener("load", () => {
  updateScrollBtnVisibility();
});

sliderProductList?.addEventListener('scroll', updateScrollBtnVisibility);

btnUpSlider?.addEventListener("click", () => scrollSlider("top"));
btnDownSlider?.addEventListener("click", () => scrollSlider("bottom"));