"use strict";
let navList = document.querySelector(".nav__list");
let btnLeft = document.querySelector(".nav__btn-left");
let btnRight = document.querySelector(".nav__btn-right");
let footerYear = document.querySelector(".footer__year");
const scrollStep = 300;
// проверка видимости стрелок
function updateArrowsVisibility() {
    if (!navList || !btnLeft || !btnRight)
        return;
    const maxScroll = navList.scrollWidth - navList.clientWidth;
    btnLeft.classList.toggle("hidden", navList.scrollLeft <= 0);
    btnRight.classList.toggle("hidden", navList.scrollLeft >= maxScroll - 1);
}
updateArrowsVisibility();
// функция прокрутки слайдера
function scrollNav(direction) {
    if (!navList)
        return;
    const offset = direction === "left" ? -scrollStep : scrollStep;
    navList.scrollBy({ left: offset, behavior: "smooth" });
    setTimeout(updateArrowsVisibility, 200);
}
btnLeft ? btnLeft.addEventListener('click', () => scrollNav('left')) : '';
btnRight ? btnRight.addEventListener('click', () => scrollNav('right')) : '';
// следит за ручной прокруткой на мобилке
navList ? navList.addEventListener('scroll', updateArrowsVisibility) : '';
// функция обновления года в футере
function getCurrentYear(footerYear, baseYear = 2025) {
    if (!footerYear)
        return;
    const date = new Date();
    const currenYear = date.getFullYear();
    footerYear.textContent = currenYear === baseYear
        ? `${baseYear}`
        : `${baseYear} - ${currenYear}`;
}
if (footerYear) {
    getCurrentYear(footerYear);
}
