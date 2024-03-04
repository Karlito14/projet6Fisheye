const focusableElementsArray = [
    '[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
];

class Modal {
    constructor(modal, modalContainer, main, body) {
        this.main = main;
        this.modal = modal;
        this.modalContainer = modalContainer;
        this.body = body;
        this.firstElementFocusable = this.findFirstElementFocusable(this.modal, focusableElementsArray);
        this.lastElementFocusable = this.findLastFirstElementFocusable(this.modal, focusableElementsArray);
        this.buttonClose = this.modal.querySelector('[data-dismiss]');
        this.eventListenersGeneral();
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

    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.setAttribute('aria-hidden', true);
        this.main.removeAttribute('aria-hidden');
        this.body.removeAttribute('style');
    }

    eventListenersGeneral() {
        window.addEventListener('keydown', (event) => {
            if(this.modal.style.display === "block") {
                if(event.code === 'Tab') {
                    this.closeFocusInTheModal(event);
                }

                if(event.code === 'Escape') {
                    this.closeModal();
                }
            }  
        })

        this.buttonClose.addEventListener('click', () => this.closeModal());
        this.modalContainer.addEventListener('click', (event) => event.stopPropagation());
        this.modal.addEventListener('click', () => this.closeModal());
    }
}

class Carousel extends Modal {
    constructor(modal, main, body, buttonClose) {
        super(modal, main, body, buttonClose);
        this.buttonNext = this.modal.querySelector('#next');
        this.buttonPrev = this.modal.querySelector('#prev');
        this.allMedias = Array.from(this.main.querySelectorAll('.image-media'));
        this.index = 0;
        this.elementFocus = undefined;
        this.eventListeners();
        this.initCarousel();
    }

    initCarousel() {
        
    }

    displayMediaCarousel(media) {
        const elLiCarousel = this.modal.querySelector('#li-list-carousel');
        const titleCarousel = this.modal.querySelector('#carrousel-title');

        elLiCarousel.firstElementChild.remove();
        const [source, title] = [media.src, media.dataset.name];

        let elMediaCarousel;
        
        if(media.localName === 'video') {
            const videoCarousel = document.createElement('video');
            videoCarousel.setAttribute('controls', 'controls');
            videoCarousel.setAttribute('type', 'video/mp4');
            videoCarousel.textContent = 'Votre navigateur ne permet pas de lire les vidéos';

            elMediaCarousel = videoCarousel;
        } else {
            const imageCarousel = document.createElement('img');
            imageCarousel.setAttribute('alt', title);

            elMediaCarousel = imageCarousel;
        }

        elMediaCarousel.src = source;
        elMediaCarousel.setAttribute('class', 'media-carousel');

        titleCarousel.textContent = title;
        
        elLiCarousel.prepend(elMediaCarousel);
        return media;
    }

    incrementIndex() {
        this.index++;
        if(this.index > this.allMedias.length - 1) {
            this.index = 0;
        }  
        this.elementFocus = this.displayMediaCarousel(this.allMedias[this.index]);
    }

    decrementIndex() {
        this.index--;
    
        if(this.index < 0) {
            this.index = this.allMedias.length - 1;
        }
        this.elementFocus = this.displayMediaCarousel(this.allMedias[this.index]);
    }

    eventListeners() {
        window.addEventListener('keydown', (event) => {
            if(this.modal.style.display === 'block') {
                if(event.code === 'ArrowLeft') {
                    this.decrementIndex();
                }

                if(event.code === 'ArrowRight') {
                    this.incrementIndex();
                }
            }
        })

        this.buttonNext.addEventListener('click', () => this.incrementIndex());
        this.buttonPrev.addEventListener('click', () => this.decrementIndex());

        for(let media of this.allMedias) {
            media.addEventListener('click', () => {
                this.index = this.allMedias.indexOf(media);
    
                this.elementFocus = this.displayMediaCarousel(this.allMedias[this.index]);
                this.displayModal();  
            })
        }
    }
}

