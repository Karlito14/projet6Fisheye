import { CheckForm } from "./check-form.js";
const buttonContact = document.querySelector('.contact_button');
const buttonSubmit = document.querySelector('button[type=submit]');
const modal = document.querySelector('#contact_modal');
const main = document.querySelector('#main');
const closeDialog = document.querySelector('[data-dismiss]');
const modalDocument = document.querySelector('.modal');
const form = document.querySelector('.form-modal');
const inputFirst = document.querySelector('#first');
const inputLast = document.querySelector('#last');
const inputEmail = document.querySelector('#email');
const textArea = document.querySelector('#message');

const inputs = [inputFirst, inputLast, inputEmail, textArea]

const modalForm = new Modal(modal, main);

buttonContact.addEventListener('click', displayModal);
closeDialog.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal);
modalDocument.addEventListener('click', (event) => {
    event.stopPropagation();
});

form.addEventListener('submit', (event) => {

    let formOk = true;

    event.preventDefault();
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
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', false);
    main.setAttribute('aria-hidden', true);
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
}

