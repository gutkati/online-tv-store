let deleteAllOrder = document.querySelector('.delete-selected') as HTMLButtonElement | null;
let modalAllOrder = document.querySelector('.modal-all') as HTMLDivElement | null;
let btnCancellationAll = document.querySelector('.btn-cancellation_all') as HTMLButtonElement | null;

let deleteOneOrder = document.querySelectorAll('.order__delete') as NodeList | null;
let modalOneOrder = document.querySelector('.modal-one') as HTMLDivElement | null;
let btnCancellationOne = document.querySelector('.btn-cancellation_one') as HTMLButtonElement | null;


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