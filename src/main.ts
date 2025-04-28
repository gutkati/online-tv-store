let navList = document.querySelector(".nav__list") as HTMLUListElement | null;
let btnLeft = document.querySelector(".nav__btn-left") as HTMLButtonElement | null;
let btnRight = document.querySelector(".nav__btn-right") as HTMLButtonElement | null;
let footerYear = document.querySelector(".footer__year") as HTMLElement | null;
let showFilters = document.querySelector(".show-filters") as HTMLElement | null;
let cardsFilters = document.querySelector(".cards__filters") as HTMLElement | null;
let btnCloseFilterMobile = document.querySelector(".filter__close") as HTMLButtonElement | null;

const buttonsAllProduct: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.btn-basket');
const btnProductCart = document.querySelector('.btn-price') as HTMLButtonElement | null;

const scrollStep = 300;
let keyCart: string = 'cart';

interface Product {
    url: string,
    name: string,
    price: number,
    image: string
}

// сохранение товара в локальное хранилище
function saveProduct(product: Product) {
    const cart = JSON.parse(localStorage.getItem(keyCart) || '[]') as Product[];

    const alreadyInCart = cart.some(item => item.url === product.url);

    if (!alreadyInCart) {
        cart.push(product);
        localStorage.setItem(keyCart, JSON.stringify((cart)))
    }
}

// проверка видимости стрелок
function updateArrowsVisibility() {
    if (!navList || !btnLeft || !btnRight) return;

    const maxScroll = navList.scrollWidth - navList.clientWidth;

    btnLeft.classList.toggle("hidden", navList.scrollLeft <= 0);
    btnRight.classList.toggle("hidden", navList.scrollLeft >= maxScroll - 1);
}

updateArrowsVisibility();

// функция прокрутки слайдера
function scrollNav(direction: "left" | "right") {
    if (!navList) return;

    const offset = direction === "left" ? -scrollStep : scrollStep;
    navList.scrollBy({left: offset, behavior: "smooth"});

    setTimeout(updateArrowsVisibility, 200);
}

// менять статус кнопки
function updateNameBtnCard() {
    const cards = document.querySelectorAll<HTMLDivElement>('.card');
    const cart = JSON.parse(localStorage.getItem(keyCart) || '[]') as Product[];
    cards?.forEach(card => {
        const btn = card.querySelector<HTMLButtonElement>('.btn-basket');
        const url = card.querySelector('.card__name')?.getAttribute('href') || '';

        const alreadyInCart = cart.some(item => item.url === url);

        if (alreadyInCart && btn) {
            btn.textContent = 'В корзине';
            btn.classList.add('btn-cart')

        }
    })
}

updateNameBtnCard()

function updateNameBtnProduct() {
    const cart = JSON.parse(localStorage.getItem(keyCart) || '[]') as Product[];
    const currentUrl = window.location.href;

    const alreadyInProduct = cart.some(item => item.url === currentUrl);

    if (alreadyInProduct && btnProductCart) {
        btnProductCart.textContent = 'В корзине';
        btnProductCart.classList.add('btn-cart');
    }
}

updateNameBtnProduct();

// добавлять товар в хранилище при нажатии

buttonsAllProduct?.forEach(btn => {
    btn?.addEventListener('click', () => {
        // находит родительский .card для кнопки.
        const card = btn.closest('.card');

        if (!card) return;

        const url = card.querySelector('.card__name')?.getAttribute('href') || '';
        const name = card.querySelector('.card__name span')?.textContent?.trim() || '';
        const priceText = card.querySelector('.card__price')?.textContent?.trim() || '0';
        const image = card.querySelector('.card__img img')?.getAttribute('src') || '';

        // Парсим цену: убираем пробелы и "р."
        const price = parseFloat(priceText.replace(/\s/g, '').replace(/[^\d.,]/g, '').replace(',', '.'));

        const product: Product = {url, name, price, image};
        console.log(product)

        saveProduct(product);
        updateNameBtnCard();
    })
})

btnProductCart?.addEventListener('click', () => {
    const url = window.location.href;
    const name = document.querySelector('.product-title h1')?.textContent?.trim() || '';
    const priceText = document.querySelector('.product__price-box')?.textContent?.trim() || '0';
    const image = document.querySelector('.slider__img img')?.getAttribute('src') || '';

    const price = parseFloat(priceText.replace(/\s/g, '').replace(/[^\d.,]/g, '').replace(',', '.'));

    const product: Product = {url, name, price, image};
    console.log('product2', product)

    saveProduct(product);
    updateNameBtnProduct();

});

// переключение слайдера производителей
btnLeft ? btnLeft.addEventListener('click', () => scrollNav('left')) : '';
btnRight ? btnRight.addEventListener('click', () => scrollNav('right')) : '';

// следит за ручной прокруткой на мобилке
navList ? navList.addEventListener('scroll', updateArrowsVisibility) : '';

// фильтры в мобильной версии
showFilters?.addEventListener('click', () => {
    cardsFilters?.classList.add('visible')
})

btnCloseFilterMobile?.addEventListener("click", () => {
    cardsFilters?.classList.remove('visible')
})

// функция обновления года в футере
function getCurrentYear(footerYear: HTMLElement, baseYear: number = 2025) {
    if (!footerYear) return;

    const date: Date = new Date();

    const currenYear: number = date.getFullYear();

    footerYear.textContent = currenYear === baseYear
        ? `${baseYear}`
        : `${baseYear} - ${currenYear}`
}

if (footerYear) {
    getCurrentYear(footerYear);
}

window.addEventListener("storage", (event) => {
    if (event.key === keyCart) {
        updateNameBtnCard();
        updateNameBtnProduct();
    }
})

