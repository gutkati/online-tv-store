"use strict";
let orderBtn = document.querySelector('.form__order-btn');
let modalOrder = document.querySelector('.modal-order');
let btnClose = document.querySelector('.btn-close');
let inputName = document.querySelector('.form__inp-name');
let inputTel = document.querySelector('.form__inp-tel');
let orderSum = document.querySelector('.form__order-sum p');
let keyProductForm = 'cart';
window.addEventListener("storage", (event) => {
    if (event.key === keyProductForm) {
        getTotalSum();
    }
});
function getListProducts() {
    const products = localStorage.getItem(keyProductForm);
    return products ? JSON.parse(products) : [];
}
function getTotalSum() {
    let arrProduct = getListProducts();
    const total = arrProduct.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const [rub, kop] = total.toFixed(2).split('.');
    if (orderSum) {
        orderSum.innerHTML = `${rub},<span>${kop}</span><span>р.</span>`;
    }
}
getTotalSum();
function validateName(input) {
    const value = input.value.trim();
    const textError = document.querySelector('.invalid-name');
    if (value.length < 2) {
        textError === null || textError === void 0 ? void 0 : textError.classList.add('invalid');
        return false;
    }
    textError === null || textError === void 0 ? void 0 : textError.classList.remove('invalid');
    return true;
}
function validateTel(input) {
    const value = input.value.trim();
    const textError = document.querySelector('.invalid-tel');
    const phoneRegex = /^[\d\s+()-]+$/;
    if (!phoneRegex.test(value)) {
        textError === null || textError === void 0 ? void 0 : textError.classList.add('invalid');
        return false;
    }
    textError === null || textError === void 0 ? void 0 : textError.classList.remove('invalid');
    return true;
}
orderBtn === null || orderBtn === void 0 ? void 0 : orderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!inputName)
        return;
    if (!inputTel)
        return;
    const isNameValid = validateName(inputName);
    const isTelValid = validateTel(inputTel);
    if (isNameValid && isTelValid) {
        modalOrder === null || modalOrder === void 0 ? void 0 : modalOrder.classList.add('hidden-modal');
    }
});
btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener('click', () => {
    modalOrder === null || modalOrder === void 0 ? void 0 : modalOrder.classList.remove('hidden-modal');
});
inputName === null || inputName === void 0 ? void 0 : inputName.addEventListener('blur', () => {
    if (inputName) {
        validateName(inputName);
    }
});
inputTel === null || inputTel === void 0 ? void 0 : inputTel.addEventListener('blur', () => {
    if (inputTel) {
        validateTel(inputTel);
    }
});
