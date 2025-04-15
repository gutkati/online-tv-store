
let navList = document.querySelector(".nav__list") as HTMLUListElement;
let btnLeft = document.querySelector(".nav__btn-left") as HTMLButtonElement;
let btnRight = document.querySelector(".nav__btn-right") as HTMLButtonElement;

const scrollStep = 300;

// видимость стелок
function updateArrowsVisibility() {
    const maxScroll = navList.scrollWidth - navList.clientWidth;

    btnLeft.classList.toggle("hidden", navList.scrollLeft <= 0);
    btnRight.classList.toggle("hidden", navList.scrollLeft >= maxScroll - 1);
}

function scrollNav(direction: "left" | "right") {
    const offset = direction === "left" ? -scrollStep : scrollStep;
    navList.scrollBy({left: offset, behavior: "smooth"})

    setTimeout(updateArrowsVisibility, 200)
}

// начальная проверка видимости стрелок

updateArrowsVisibility()

btnLeft.addEventListener('click', () => scrollNav('left'))
btnRight.addEventListener('click', () => scrollNav('right'))

// следит за ручной прокруткой на мобилке
navList.addEventListener('scroll', updateArrowsVisibility)
