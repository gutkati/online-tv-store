let orderBtn = document.querySelector('.form__order-btn') as HTMLButtonElement | null;
let modalOrder = document.querySelector('.modal-order') as HTMLDivElement | null;
let btnClose = document.querySelector('.btn-close') as HTMLButtonElement | null;
let inputName = document.querySelector('.form__inp-name') as HTMLInputElement | null;
let inputTel = document.querySelector('.form__inp-tel') as HTMLInputElement | null;


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