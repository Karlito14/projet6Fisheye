export class Modal {
    constructor (modal, modalContainer, main, body, elementFocus) {
        this.main = main;
        this.modal = modal;
        this.modalContainer = modalContainer;
        this.body = body;
        this.elementFocus = elementFocus;
        this.focusableElements = [
            '[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];
        this.firstElementFocusable = this.findFirstElementFocusable(this.modal, this.focusableElements);
        this.lastElementFocusable = this.findLastFirstElementFocusable(this.modal, this.focusableElements);
        this.buttonClose = this.modal.querySelector('[data-dismiss]');
        this.eventListenersGeneral();
    }

    focusInFirstElementFocusable () {
        this.firstElementFocusable.focus();
    }

    findFirstElementFocusable (modal, focusableElementsArray) {
        const focusableElements = modal.querySelectorAll(focusableElementsArray);

        return focusableElements[0];
    }

    findLastFirstElementFocusable (modal, focusableElementsArray) {
        const focusableElements = modal.querySelectorAll(focusableElementsArray);

        return focusableElements[focusableElements.length - 1];
    }

    closeFocusInTheModal (event) {
        const elementFocus = this.modal.querySelector(':focus');

        if (elementFocus === this.lastElementFocusable && !event.shiftKey) {
            event.preventDefault();
            this.firstElementFocusable.focus();
        }

        if (elementFocus === this.firstElementFocusable && event.shiftKey) {
            event.preventDefault();
            this.lastElementFocusable.focus();
        }
    }

    displayModal () {
        this.modal.style.display = 'block';
        this.modal.removeAttribute('aria-hidden');
        this.main.setAttribute('aria-hidden', true);
        this.focusInFirstElementFocusable();
        this.body.style.overflow = 'hidden';
    }

    closeModal () {
        this.modal.style.display = 'none';
        this.modal.setAttribute('aria-hidden', true);
        this.main.removeAttribute('aria-hidden');
        this.body.removeAttribute('style');
        this.elementFocus.focus();
    }

    eventListenersGeneral () {
        window.addEventListener('keydown', (event) => {
            if (this.modal.style.display === 'block') {
                if (event.code === 'Tab') {
                    this.closeFocusInTheModal(event);
                }

                if (event.code === 'Escape') {
                    this.closeModal();
                }
            }
        });

        this.buttonClose.addEventListener('click', () => this.closeModal());
        this.modalContainer.addEventListener('click', (event) => event.stopPropagation());
        this.modal.addEventListener('click', () => this.closeModal());
    }
};