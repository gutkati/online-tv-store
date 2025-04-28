"use strict";
let navList = document.querySelector(".nav__list");
let btnLeft = document.querySelector(".nav__btn-left");
let btnRight = document.querySelector(".nav__btn-right");
let footerYear = document.querySelector(".footer__year");
let showFilters = document.querySelector(".show-filters");
let cardsFilters = document.querySelector(".cards__filters");
let btnCloseFilterMobile = document.querySelector(".filter__close");
const buttonsAllProduct = document.querySelectorAll('.btn-basket');
const btnProductCart = document.querySelector('.btn-price');
const basketCount = document.querySelector('.basket__count');
const scrollStep = 300;
let keyCart = 'cart';
// сохранение товара в локальное хранилище
function saveProduct(product) {
    const cart = JSON.parse(localStorage.getItem(keyCart) || '[]');
    const alreadyInCart = cart.some(item => item.url === product.url);
    if (!alreadyInCart) {
        cart.push(product);
        localStorage.setItem(keyCart, JSON.stringify((cart)));
    }
}
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
// менять статус кнопки на главной странице
function updateNameBtnCard() {
    const cards = document.querySelectorAll('.card');
    const cart = JSON.parse(localStorage.getItem(keyCart) || '[]');
    cards === null || cards === void 0 ? void 0 : cards.forEach(card => {
        var _a;
        const btn = card.querySelector('.btn-basket');
        const url = ((_a = card.querySelector('.card__name')) === null || _a === void 0 ? void 0 : _a.getAttribute('href')) || '';
        const alreadyInCart = cart.some(item => item.url === url);
        if (alreadyInCart && btn) {
            btn.textContent = 'В корзине';
            btn.classList.add('btn-cart');
        }
    });
}
updateNameBtnCard();
// менять статус кнопки на странице продукта
function updateNameBtnProduct() {
    const cart = JSON.parse(localStorage.getItem(keyCart) || '[]');
    const currentUrl = window.location.href;
    const alreadyInProduct = cart.some(item => item.url === currentUrl);
    if (alreadyInProduct && btnProductCart) {
        btnProductCart.textContent = 'В корзине';
        btnProductCart.classList.add('btn-cart');
    }
}
updateNameBtnProduct();
// счетчик товаров в корзине
function updateBasketCount() {
    const cart = JSON.parse(localStorage.getItem(keyCart) || '[]');
    if (!basketCount)
        return;
    if (cart.length !== 0) {
        basketCount.classList.add('visible-count');
        basketCount.textContent = cart.length.toString();
    }
    else {
        basketCount.classList.remove('visible-count');
        basketCount.textContent = '';
    }
}
updateBasketCount();
// добавлять товар в хранилище при нажатии
buttonsAllProduct === null || buttonsAllProduct === void 0 ? void 0 : buttonsAllProduct.forEach(btn => {
    btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => {
        var _a, _b, _c, _d, _e, _f;
        // находит родительский .card для кнопки.
        const card = btn.closest('.card');
        if (!card)
            return;
        const url = ((_a = card.querySelector('.card__name')) === null || _a === void 0 ? void 0 : _a.getAttribute('href')) || '';
        const name = ((_c = (_b = card.querySelector('.card__name span')) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim()) || '';
        const priceText = ((_e = (_d = card.querySelector('.card__price')) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim()) || '0';
        const image = ((_f = card.querySelector('.card__img img')) === null || _f === void 0 ? void 0 : _f.getAttribute('src')) || '';
        // Парсим цену: убираем пробелы и "р."
        const price = parseFloat(priceText.replace(/\s/g, '').replace(/[^\d.,]/g, '').replace(',', '.'));
        const product = { url, name, price, image };
        console.log(product);
        saveProduct(product);
        updateNameBtnCard();
        updateBasketCount();
    });
});
btnProductCart === null || btnProductCart === void 0 ? void 0 : btnProductCart.addEventListener('click', () => {
    var _a, _b, _c, _d, _e;
    const url = window.location.href;
    const name = ((_b = (_a = document.querySelector('.product-title h1')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
    const priceText = ((_d = (_c = document.querySelector('.product__price-box')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || '0';
    const image = ((_e = document.querySelector('.slider__img img')) === null || _e === void 0 ? void 0 : _e.getAttribute('src')) || '';
    const price = parseFloat(priceText.replace(/\s/g, '').replace(/[^\d.,]/g, '').replace(',', '.'));
    const product = { url, name, price, image };
    console.log('product2', product);
    saveProduct(product);
    updateNameBtnProduct();
    updateBasketCount();
});
// переключение слайдера производителей
btnLeft ? btnLeft.addEventListener('click', () => scrollNav('left')) : '';
btnRight ? btnRight.addEventListener('click', () => scrollNav('right')) : '';
// следит за ручной прокруткой на мобилке
navList ? navList.addEventListener('scroll', updateArrowsVisibility) : '';
// фильтры в мобильной версии
showFilters === null || showFilters === void 0 ? void 0 : showFilters.addEventListener('click', () => {
    cardsFilters === null || cardsFilters === void 0 ? void 0 : cardsFilters.classList.add('visible');
});
btnCloseFilterMobile === null || btnCloseFilterMobile === void 0 ? void 0 : btnCloseFilterMobile.addEventListener("click", () => {
    cardsFilters === null || cardsFilters === void 0 ? void 0 : cardsFilters.classList.remove('visible');
});
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
window.addEventListener("storage", (event) => {
    if (event.key === keyCart) {
        updateNameBtnCard();
        updateNameBtnProduct();
        updateBasketCount();
    }
});
