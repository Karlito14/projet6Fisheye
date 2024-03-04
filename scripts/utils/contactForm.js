import { CheckForm } from "./check-form.js";
const buttonContact = document.querySelector('.contact_button');
const elModalForm = document.querySelector('#contact_modal');
const mainForm = document.querySelector('#main');
const bodyForm = document.querySelector('body');
const closeDialog = elModalForm.querySelector('[data-dismiss]');
const modalDocument = elModalForm.querySelector('.modal');
const form = modalDocument.querySelector('.form-modal');
const inputFirst = form.querySelector('#first');
const inputLast = form.querySelector('#last');
const inputEmail = form.querySelector('#email');
const textArea = form.querySelector('#message');

const inputs = [inputFirst, inputLast, inputEmail, textArea];

const modalForm = new Modal(elModalForm, mainForm, bodyForm);

buttonContact.addEventListener('click', () => {
    modalForm.displayModal();
});
closeDialog.addEventListener('click', closeModalForm);
elModalForm.addEventListener('click', closeModalForm);
window.addEventListener('keydown', (event) => {
    if(event.code === 'Escape' && elModalForm.style.display === 'block') {
        closeModalForm();
    }
})
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
            closeModalForm();
        },200)
    }
});

function closeModalForm() {
    modalForm.closeModal()
    buttonContact.focus();
}