import { Modal } from "../templates/form.js";
const buttonContact = document.querySelector('.contact_button');
const dialog = document.querySelector('#contact_modal');
const main = document.querySelector('#main');
const closeDialog = document.querySelector('[data-dismiss]');
const modalDocument = document.querySelector('.modal');

buttonContact.addEventListener('click', displayModal);
closeDialog.addEventListener('click', closeModal);
dialog.addEventListener('click', closeModal);
modalDocument.addEventListener('click', (event) => {
    event.stopPropagation();
})


const modalForm = new Modal(dialog);

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    dialog.setAttribute('aria-hidden', false);
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
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    dialog.setAttribute('aria-hidden', true);
    main.setAttribute('aria-hidden', false);
}
