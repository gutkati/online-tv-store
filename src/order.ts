let deleteAllOrder = document.querySelector('.delete-selected') as HTMLButtonElement | null;
let modalAllOrder = document.querySelector('.modal-all') as HTMLDivElement | null;
let btnCancellationAll = document.querySelector('.btn-cancellation_all') as HTMLButtonElement | null;

let deleteOneOrder = document.querySelectorAll('.order__delete') as NodeList | null;
let modalOneOrder = document.querySelector('.modal-one') as HTMLDivElement | null;
let btnCancellationOne = document.querySelector('.btn-cancellation_one') as HTMLButtonElement | null;

let orderMinusList = document.querySelectorAll('.order-minus') as NodeList | null;
let orderPlusList = document.querySelectorAll('.order-plus') as NodeList | null;

function switchCounter(direction: 'minus' | 'plus'): void {
    const target = event?.target as HTMLElement;
    if (!target) return;

    const productContainer = target.closest('.list-basket');
    if (!productContainer) return;

    const counterElement = productContainer.querySelector<HTMLElement>('.order-counter')
    if (!counterElement) return;

    let currentValue = parseInt(counterElement.textContent || '1');

    let newValue = currentValue;

    if (direction === 'plus') {
        newValue = currentValue + 1;
    } else if (direction === 'minus' && currentValue > 1) {
        newValue = currentValue - 1
    }
    counterElement.textContent = newValue.toString();
}

deleteAllOrder?.addEventListener('click', () => {
    modalAllOrder?.classList.add('hidden-modal');
})

btnCancellationAll?.addEventListener('click', () => {
    modalAllOrder?.classList.remove('hidden-modal');
})

deleteOneOrder?.forEach(btn => {
    btn?.addEventListener('click', () => {
        modalOneOrder?.classList.add('hidden-modal');
    })
})

btnCancellationOne?.addEventListener('click', () => {
    modalOneOrder?.classList.remove('hidden-modal');
})

orderMinusList?.forEach(btn => {
    btn.addEventListener('click', () => switchCounter('minus'))
})

orderPlusList?.forEach(btn => {
    btn.addEventListener('click', () => switchCounter('plus'))
})