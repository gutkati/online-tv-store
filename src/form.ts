let orderBtn = document.querySelector('.form__order-btn') as HTMLButtonElement | null;
let modalOrder = document.querySelector('.modal-order') as HTMLDivElement | null;
let btnClose = document.querySelector('.btn-close') as HTMLButtonElement | null;
let inputName = document.querySelector('.form__inp-name') as HTMLInputElement | null;
let inputTel = document.querySelector('.form__inp-tel') as HTMLInputElement | null;
let orderSum = document.querySelector('.form__order-sum p') as HTMLElement | null;

let keyProductForm: string = 'cart';

window.addEventListener("storage", (event) => {
    if (event.key === keyProductForm) {
        getTotalSum()
    }
})

function getListProducts(): Product[] {
    const products = localStorage.getItem(keyProductForm);
    return products ? JSON.parse(products) : [];
}

function getTotalSum() {
    let arrProduct = getListProducts();
    const total = arrProduct
        .filter(product => product.checked)
        .reduce((sum, product) => sum + (product.price * product.quantity), 0)
    const [rub, kop] = total.toFixed(2).split('.');

    if (orderSum) {
        orderSum.innerHTML = `${rub},<span>${kop}</span><span>р.</span>`;
    }
}

getTotalSum()

function validateName(input: HTMLInputElement): boolean {
    const value = input.value.trim();
    const textError = document.querySelector<HTMLElement>('.invalid-name');
    if (value.length < 2) {

        textError?.classList.add('invalid');
        return false;
    }

    textError?.classList.remove('invalid');
    return true;
}

function validateTel(input: HTMLInputElement): boolean {
    const value = input.value.trim();
    const textError = document.querySelector<HTMLElement>('.invalid-tel');
    const phoneRegex = /^[\d\s+()-]+$/;

    if (!phoneRegex.test(value)) {
        textError?.classList.add('invalid');
        return false;
    }

    textError?.classList.remove('invalid');
    return true;
}

orderBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!inputName) return;
    if (!inputTel) return;

    const isNameValid = validateName(inputName);
    const isTelValid = validateTel(inputTel);

    if (isNameValid && isTelValid) {
        modalOrder?.classList.add('hidden-modal')
    }

})

btnClose?.addEventListener('click', () => {
    modalOrder?.classList.remove('hidden-modal')
})

inputName?.addEventListener('blur', () => {
    if (inputName) {
        validateName(inputName)
    }
})

inputTel?.addEventListener('blur', () => {
    if (inputTel) {
        validateTel(inputTel)
    }
})