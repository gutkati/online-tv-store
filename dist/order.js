"use strict";
// import {types} from "sass";
// import Number = types.Number;
let deleteAllOrder = document.querySelector('.delete-selected');
let modalAllOrder = document.querySelector('.modal-all');
let btnDeleteAll = document.querySelector('.btn-delete_all');
let btnCancellationAll = document.querySelector('.btn-cancellation_all');
let modalOneOrder = document.querySelector('.modal-one');
let btnDeleteOneOrder = document.querySelector('.btn-delete_one');
let btnCancellationOne = document.querySelector('.btn-cancellation_one');
let order = document.querySelector('.order');
//let orderList = document.querySelector('.order__list') as HTMLElement | null;
let orders = document.querySelector('.list-orders');
let emptyCart = document.querySelector('.empty-cart');
let keyProduct = 'cart';
function renderCart() {
    showProducts(); // отрисовываем корзину
    setupCheckboxHandlers(); // назначаем чекбоксы
    handleTotalCheckboxChange(); // чекбокс "выбрать всё"
}
renderCart();
function getListProduct() {
    const products = localStorage.getItem(keyProduct);
    return products ? JSON.parse(products) : [];
}
function showProducts() {
    let arrProduct = getListProduct();
    if (!emptyCart || !orders)
        return;
    if (arrProduct.length === 0) {
        orders.innerHTML = '';
        emptyCart.textContent = 'Ваша корзина пока пуста. Перейдите в каталог, чтобы добавить товары.';
        updateTotalPrice([]);
        updateTotalCheckbox([]);
        return;
    }
    if (arrProduct.length !== 0) {
        emptyCart.textContent = '';
        orders.innerHTML = '';
        arrProduct.forEach(product => {
            const productElement = document.createElement('div');
            const price = product.price * product.quantity;
            productElement.classList = 'list-basket';
            productElement.innerHTML = `
            <div class="order-checkbox">
          <label class="checkbox__container">
            <input class="checkbox" type="checkbox" ${product.checked ? 'checked' : ""} data-url="${product.url}">
            <span class="checkbox-custom"></span>
          </label>
        </div>
        <div class="order-info">
          <div class="order__card">
            <a class="order__card-link" href="${product.url}">
              <div class="order__card-img">
                <img src="${product.image}" alt="${product.name}">
              </div>
              <div class="order__card-title">
                <p>${product.name}</p>
              </div>
            </a>
            <div class="order__card-quantity">
              <button class="btn-counter order-minus"">-</button>
              <p class="order-counter">${product.quantity}</p>
              <button class="btn-counter order-plus"">+</button>
            </div>
            <div class="order__card-price">
              <span>${price.toFixed(2)} р.</span>
            </div>
          </div>
          <div class="order__delete" data-url="${product.url}">
            <img src="assets/icons/bin.png" alt="мусорное ведро">
            <span>Удалить</span>
          </div>
        </div>
            `;
            orders === null || orders === void 0 ? void 0 : orders.appendChild(productElement);
        });
        updateTotalPrice(arrProduct);
        updateTotalCheckbox(arrProduct);
    }
}
// обновление состояния чекбокса товара
function setupCheckboxHandlers() {
    // Удаляем все старые обработчики
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.replaceWith(checkbox.cloneNode(true));
    });
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function (e) {
            const target = e.target;
            const url = target.dataset.url;
            const arrProduct = getListProduct();
            const product = arrProduct.find(p => p.url === url);
            if (product) {
                product.checked = target.checked;
                localStorage.setItem(keyProduct, JSON.stringify(arrProduct));
                updateTotalPrice(arrProduct);
                updateTotalCheckbox(arrProduct);
                //showProducts();
            }
        });
    });
}
// Обновление итоговой суммы
function updateTotalPrice(products) {
    const sumPrice = document.querySelector('.sum-total');
    if (!sumPrice)
        return;
    const total = products
        .filter(product => product.checked)
        .reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const [rub, kop] = total.toFixed(2).split('.');
    sumPrice.innerHTML = `${rub},<span>${kop}</span><span>р.</span>`;
}
// счетчик товаров
function switchCounter(event, direction) {
    var _a;
    const listProduct = getListProduct();
    const target = event === null || event === void 0 ? void 0 : event.target;
    if (!target)
        return;
    const productContainer = target.closest('.list-basket');
    if (!productContainer)
        return;
    const currentUrl = ((_a = productContainer.querySelector('.order__card-link')) === null || _a === void 0 ? void 0 : _a.getAttribute('href')) || '';
    const productIndex = listProduct.findIndex(p => p.url === currentUrl);
    const product = listProduct[productIndex];
    let currentValue = product.quantity;
    if (direction === 'plus' && product) {
        product.quantity = currentValue + 1;
    }
    else if (direction === 'minus' && currentValue > 1 && product) {
        product.quantity = currentValue - 1;
    }
    localStorage.setItem(keyProduct, JSON.stringify((listProduct)));
    // showProducts()
    renderCart();
}
function handleTotalCheckboxChange() {
    const oldCheckbox = document.querySelector('.checkbox-total');
    if (!oldCheckbox)
        return;
    const newCheckbox = oldCheckbox.cloneNode(true);
    oldCheckbox.replaceWith(newCheckbox);
    newCheckbox.addEventListener('change', function () {
        const isChecked = newCheckbox.checked;
        const arrProduct = getListProduct();
        arrProduct.forEach(product => {
            product.checked = isChecked;
        });
        localStorage.setItem(keyProduct, JSON.stringify(arrProduct));
        updateTotalCheckbox(arrProduct);
        updateTotalPrice(arrProduct);
        // showProducts()
        renderCart();
    });
}
//обновление состояния чекбокса всех товаров
function updateTotalCheckbox(products) {
    const checkboxTotal = document.querySelector('.checkbox-total');
    if (!checkboxTotal)
        return;
    const allChecked = products.length > 0 && products.every(product => product.checked);
    checkboxTotal.checked = allChecked;
}
// удаление всех выбранных товаров
function deleteAllMarkProduct() {
    let arrProduct = getListProduct();
    let numProd = arrProduct.length;
    arrProduct = arrProduct.filter(product => !product.checked);
    localStorage.setItem(keyProduct, JSON.stringify(arrProduct));
    modalAllOrder === null || modalAllOrder === void 0 ? void 0 : modalAllOrder.classList.remove('hidden-modal');
    let newNumProd = arrProduct.length;
    let deletedCount = numProd - newNumProd;
    // показывает уведомление
    showToast(`Удалено ${deletedCount} товар(а) из корзины`);
    renderCart();
}
//удаление одного выбранного товара
function deleteOneProduct(url) {
    let arrProduct = getListProduct();
    const currentProduct = arrProduct.find(p => p.url === url);
    arrProduct = arrProduct.filter(product => product !== currentProduct);
    localStorage.setItem(keyProduct, JSON.stringify(arrProduct));
    modalOneOrder === null || modalOneOrder === void 0 ? void 0 : modalOneOrder.classList.remove('hidden-modal');
    let nameDeletedProduct = currentProduct.name;
    showToast(`Товар ${nameDeletedProduct} удален из корзины`);
    renderCart();
}
// сообщение об удаленных товаров
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('toast-visible');
    }, 100);
    setTimeout(() => {
        toast.classList.remove('toast-visible');
    }, 3000);
}
deleteAllOrder === null || deleteAllOrder === void 0 ? void 0 : deleteAllOrder.addEventListener('click', () => {
    modalAllOrder === null || modalAllOrder === void 0 ? void 0 : modalAllOrder.classList.add('hidden-modal');
});
btnCancellationAll === null || btnCancellationAll === void 0 ? void 0 : btnCancellationAll.addEventListener('click', () => {
    modalAllOrder === null || modalAllOrder === void 0 ? void 0 : modalAllOrder.classList.remove('hidden-modal');
});
btnDeleteAll === null || btnDeleteAll === void 0 ? void 0 : btnDeleteAll.addEventListener('click', deleteAllMarkProduct);
btnCancellationOne === null || btnCancellationOne === void 0 ? void 0 : btnCancellationOne.addEventListener('click', () => {
    modalOneOrder === null || modalOneOrder === void 0 ? void 0 : modalOneOrder.classList.remove('hidden-modal');
});
let selectedProductUrl = null;
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.order__delete')) {
        const productBlock = target.closest('.order__delete');
        const url = productBlock.dataset.url;
        if (url) {
            selectedProductUrl = url;
            modalOneOrder === null || modalOneOrder === void 0 ? void 0 : modalOneOrder.classList.add('hidden-modal');
        }
    }
});
btnDeleteOneOrder === null || btnDeleteOneOrder === void 0 ? void 0 : btnDeleteOneOrder.addEventListener('click', () => {
    if (selectedProductUrl) {
        deleteOneProduct(selectedProductUrl);
        selectedProductUrl = null;
    }
});
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('order-plus')) {
        switchCounter(e, 'plus');
    }
    else if (target.classList.contains('order-minus')) {
        switchCounter(e, 'minus');
    }
});
