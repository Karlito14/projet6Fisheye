const buttonContact = document.querySelector('.contact_button');
const modal = document.querySelector('#contact_modal');
const main = document.querySelector('#main');
const closeDialog = modal.querySelector('[data-dismiss]');
const modalDocument = modal.querySelector('.modal');
const form = modalDocument.querySelector('.form-modal');
const inputFirst = form.querySelector('#first');
const inputLast = form.querySelector('#last');
const inputEmail = form.querySelector('#email');
const textArea = form.querySelector('#message');
const contactTitle = modal.querySelector('#dialog-title');
const namePhotographer = document.querySelector('.div-info-title');
const body = document.querySelector('body');

const inputs = [inputFirst, inputLast, inputEmail, textArea];

const modalForm = new Modal(modal, main);

buttonContact.addEventListener('click', displayModal);
closeDialog.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal);
modalDocument.addEventListener('click', (event) => {
    event.stopPropagation();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let formOk = true;

    try {
        CheckForm.checkInputTextValidity(inputFirst);
        CheckForm.displayError(inputFirst, '');
    } catch (error) {
        CheckForm.displayError(inputFirst, error.message);
        formOk = false;
    }

    try {
        CheckForm.checkInputTextValidity(inputLast);
        CheckForm.displayError(inputLast, '');
    } catch (error) {
        CheckForm.displayError(inputLast, error.message);
        formOk = false;
    }

    try {
        CheckForm.checkInputEmailValidity(inputEmail);
        CheckForm.displayError(inputEmail, '');
    } catch (error) {
        CheckForm.displayError(inputEmail, error.message);
        formOk = false;
    }

    try {
        CheckForm.checkTextAreaValidity(textArea);
        CheckForm.displayError(textArea, '');
    } catch (error) {
        CheckForm.displayError(textArea, error.message);
        formOk = false;
    }

    if(formOk) {
        const formData = new FormData(form);
        CheckForm.sendDataToPastebin(formData);
        for(let input of inputs) {
            console.log(input.value);
            input.value = '';
        }
        setTimeout(() => {
            closeModal();
        },200)
    }
});


function displayModal() {
    if(!contactTitle.textContent.includes(namePhotographer.textContent)) {
        contactTitle.textContent += ` ${namePhotographer.textContent}`;
    }

	modal.style.display = "block";
    modal.setAttribute('aria-hidden', false);
    main.setAttribute('aria-hidden', true);
    body.style.overflow = 'hidden';
    modalForm.focusInFirstInputFocusable();

    window.addEventListener('keydown', (event) => {
        if(event.code === 'Tab') {
            modalForm.closeFocusInTheModal(event);
        }
    })

    window.addEventListener('keydown', (event) => {
        if(event.code === 'Escape') {
            closeModal();
        }
    })
}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', true);
    main.setAttribute('aria-hidden', false);
    body.removeAttribute('style');
    buttonContact.focus();
}

