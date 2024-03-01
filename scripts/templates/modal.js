const focusableElementsArray = [
    '[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
];

class Modal {
    constructor(modal, main, body) {
        this.main = main;
        this.modal = modal;
        this.body = body;
        this.firstElementFocusable = this.findFirstElementFocusable(this.modal, focusableElementsArray);
        this.lastElementFocusable = this.findLastFirstElementFocusable(this.modal, focusableElementsArray);
    }

    focusInFirstElementFocusable() {
        this.firstElementFocusable.focus()
    }

    findFirstElementFocusable(modal, focusableElementsArray) {
        const focusableElements = modal.querySelectorAll(focusableElementsArray);

        return focusableElements[0];
    }

    findLastFirstElementFocusable(modal, focusableElementsArray) {
        const focusableElements = modal.querySelectorAll(focusableElementsArray);

        return focusableElements[focusableElements.length - 1];
    }

    closeFocusInTheModal(event) {
        const elementFocus = this.modal.querySelector(':focus');

        if(elementFocus === this.lastElementFocusable && !event.shiftKey) {
            event.preventDefault();
            this.firstElementFocusable.focus();
        }

        if(elementFocus === this.firstElementFocusable && event.shiftKey) {
            event.preventDefault();
            this.lastElementFocusable.focus();
        }
    }

    displayModal() {
        this.modal.style.display = "block";
        this.modal.removeAttribute('aria-hidden');
        this.main.setAttribute('aria-hidden', true);
        this.focusInFirstElementFocusable();
        this.body.style.overflow = 'hidden';

        window.addEventListener('keydown', (event) => {
            if(event.code === 'Tab') {
                this.closeFocusInTheModal(event);
            }

            if(event.code === 'Escape') {
                this.closeModal();
            }
        })
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.setAttribute('aria-hidden', true);
        this.main.removeAttribute('aria-hidden');
        this.body.removeAttribute('style');
    }
}