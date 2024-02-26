const focusableElementsArray = [
    '[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
];

export class Modal {

    constructor(modal) {
        this.modal = modal;
        this.firstElementFocusable = this.findFirstElementFocusable(this.modal, focusableElementsArray);
        this.firstInputFocusable = this.findFirstInputFocusable(this.modal, focusableElementsArray);
        this.lastElementFocusable = this.findLastFirstElementFocusable(this.modal, focusableElementsArray)
    }

    focusInFirstInputFocusable() {
        this.firstInputFocusable.focus();
    }

    findFirstElementFocusable(modal, focusableElementsArray) {
        const focusableElements = modal.querySelectorAll(focusableElementsArray);

        return focusableElements[0];
    }

    findFirstInputFocusable(modal, focusableElementsArray) {
        const focusableElements = modal.querySelectorAll(focusableElementsArray);

        return focusableElements[1];
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
}