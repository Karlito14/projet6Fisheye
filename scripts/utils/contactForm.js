import { CheckForm } from "./check-form.js";
const buttonContact = document.querySelector('.contact_button');
const elModalForm = document.querySelector('#contact_modal');
const mainForm = document.querySelector('#main');
const bodyForm = document.querySelector('body');
const closeDialog = elModalForm.querySelector('[data-dismiss]');
const modalDocument = elModalForm.querySelector('.modal');
const form = modalDocument.querySelector('.form-modal');
const headerForm = modalDocument.querySelector('header');
const inputFirst = form.querySelector('#first');
const inputLast = form.querySelector('#last');
const inputEmail = form.querySelector('#email');
const textArea = form.querySelector('#message');

const inputs = [inputFirst, inputLast, inputEmail, textArea];

const modalForm = new Modal(elModalForm, mainForm);

buttonContact.addEventListener('click', displayModal);
closeDialog.addEventListener('click', closeModal);
elModalForm.addEventListener('click', closeModal);
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
            modalForm.closeModal();
        },200)
    }
});


function displayModal() {
    const namePhotographer = document.querySelector('.div-info-title'); 
    
    let paragrapheName = document.querySelector('.name-form');
    if(!paragrapheName) {
        paragrapheName = document.createElement('p');
        paragrapheName.textContent = namePhotographer.textContent;
        paragrapheName.setAttribute('class', 'name-form');
        headerForm.after(paragrapheName);
    }
    
	elModalForm.style.display = "block";
    elModalForm.setAttribute('aria-hidden', false);
    mainForm.setAttribute('aria-hidden', true);
    bodyForm.style.overflow = 'hidden';
    modalForm.focusInFirstInputFocusable();

    window.addEventListener('keydown', (event) => {
        if(elModalForm.style.display === 'block') {
            if(event.code === 'Tab') {
                modalForm.closeFocusInTheModal(event);
            }

            if(event.code === 'Escape') {
                closeModal();
            }
        }  
    })
}

function closeModal() {
    elModalForm.style.display = "none";
    elModalForm.setAttribute('aria-hidden', true);
    mainForm.setAttribute('aria-hidden', false);
    bodyForm.removeAttribute('style');
    buttonContact.focus();
}

