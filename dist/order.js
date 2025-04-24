"use strict";
let deleteAllOrder = document.querySelector('.delete-selected');
let modalAllOrder = document.querySelector('.modal-all');
let btnCancellationAll = document.querySelector('.btn-cancellation_all');
let deleteOneOrder = document.querySelectorAll('.order__delete');
let modalOneOrder = document.querySelector('.modal-one');
let btnCancellationOne = document.querySelector('.btn-cancellation_one');
let orderMinusList = document.querySelectorAll('.order-minus');
let orderPlusList = document.querySelectorAll('.order-plus');
function switchCounter(direction) {
    const target = event === null || event === void 0 ? void 0 : event.target;
    if (!target)
        return;
    const productContainer = target.closest('.list-basket');
    if (!productContainer)
        return;
    const counterElement = productContainer.querySelector('.order-counter');
    if (!counterElement)
        return;
    let currentValue = parseInt(counterElement.textContent || '1');
    let newValue = currentValue;
    if (direction === 'plus') {
        newValue = currentValue + 1;
    }
    else if (direction === 'minus' && currentValue > 1) {
        newValue = currentValue - 1;
    }
    counterElement.textContent = newValue.toString();
}
deleteAllOrder === null || deleteAllOrder === void 0 ? void 0 : deleteAllOrder.addEventListener('click', () => {
    modalAllOrder === null || modalAllOrder === void 0 ? void 0 : modalAllOrder.classList.add('hidden-modal');
});
btnCancellationAll === null || btnCancellationAll === void 0 ? void 0 : btnCancellationAll.addEventListener('click', () => {
    modalAllOrder === null || modalAllOrder === void 0 ? void 0 : modalAllOrder.classList.remove('hidden-modal');
});
deleteOneOrder === null || deleteOneOrder === void 0 ? void 0 : deleteOneOrder.forEach(btn => {
    btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => {
        modalOneOrder === null || modalOneOrder === void 0 ? void 0 : modalOneOrder.classList.add('hidden-modal');
    });
});
btnCancellationOne === null || btnCancellationOne === void 0 ? void 0 : btnCancellationOne.addEventListener('click', () => {
    modalOneOrder === null || modalOneOrder === void 0 ? void 0 : modalOneOrder.classList.remove('hidden-modal');
});
orderMinusList === null || orderMinusList === void 0 ? void 0 : orderMinusList.forEach(btn => {
    btn.addEventListener('click', () => switchCounter('minus'));
});
orderPlusList === null || orderPlusList === void 0 ? void 0 : orderPlusList.forEach(btn => {
    btn.addEventListener('click', () => switchCounter('plus'));
});
