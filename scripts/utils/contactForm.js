import { Modal } from "../templates/modal.js";
const buttonContact = document.querySelector('.contact_button');
const modal = document.querySelector('#contact_modal');
const main = document.querySelector('#main');
const closeDialog = document.querySelector('[data-dismiss]');
const modalDocument = document.querySelector('.modal');
const form = document.querySelector('.form-modal');

const modalForm = new Modal(modal, main);

buttonContact.addEventListener('click', displayModal);
closeDialog.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal);
modalDocument.addEventListener('click', (event) => {
    event.stopPropagation();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
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

