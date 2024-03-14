import { Modal } from './modal.js';
const modal = document.querySelector('#carousel_modal');
const main = document.querySelector('#main');
const body = document.querySelector('body');
const carousel = modal.querySelector('.modal-carousel');

class Carousel extends Modal {
    constructor (modal, main, body, buttonClose, elementFocus) {
        super(modal, main, body, buttonClose, elementFocus);
        this.buttonNext = this.modal.querySelector('#next');
        this.buttonPrev = this.modal.querySelector('#prev');
        this.allButtonsMedias = Array.from(this.main.querySelectorAll('.button-media'));
        this.index = 0;
        this.eventListeners();
    }

    displayMediaCarousel (button) {
        const sectionCarousel = this.modal.querySelector('.section-carousel');
        const titleCarousel = this.modal.querySelector('#carrousel-title');

        // Je récupère le média cliqué
        const media = button.firstChild;

        sectionCarousel.firstElementChild.remove();
        const [source, title] = [media.src, media.dataset.name];

        let elMediaCarousel;

        if (media.localName === 'video') {
            const videoCarousel = document.createElement('video');
            videoCarousel.setAttribute('controls', 'controls');
            videoCarousel.setAttribute('type', 'video/mp4');
            videoCarousel.setAttribute('tabindex', '0');

            videoCarousel.textContent = 'Votre navigateur ne permet pas de lire les vidéos';

            elMediaCarousel = videoCarousel;
        } else {
            const imageCarousel = document.createElement('img');
            imageCarousel.setAttribute('alt', title);
            imageCarousel.setAttribute('tabindex', '0');

            elMediaCarousel = imageCarousel;
        }

        elMediaCarousel.src = source;
        elMediaCarousel.setAttribute('aria-roledescription', 'slide');
        elMediaCarousel.setAttribute('class', 'media-carousel');

        titleCarousel.textContent = title;

        sectionCarousel.prepend(elMediaCarousel);
        return button;
    }

    incrementIndex () {
        this.index++;
        if (this.index > this.allButtonsMedias.length - 1) {
            this.index = 0;
        }
        this.elementFocus = this.displayMediaCarousel(this.allButtonsMedias[this.index]);
    }

    decrementIndex () {
        this.index--;

        if (this.index < 0) {
            this.index = this.allButtonsMedias.length - 1;
        }
        this.elementFocus = this.displayMediaCarousel(this.allButtonsMedias[this.index]);
    }

    eventListeners () {
        window.addEventListener('keydown', (event) => {
            if (this.modal.style.display === 'block') {
                if (event.code === 'ArrowLeft') {
                    this.decrementIndex();
                }

                if (event.code === 'ArrowRight') {
                    this.incrementIndex();
                }
            }
        });

        this.buttonNext.addEventListener('click', () => this.incrementIndex());
        this.buttonPrev.addEventListener('click', () => this.decrementIndex());

        for (const button of this.allButtonsMedias) {
            button.addEventListener('click', () => {
                this.index = this.allButtonsMedias.indexOf(button);

                this.elementFocus = this.displayMediaCarousel(this.allButtonsMedias[this.index]);
                this.displayModal();
            });
        }
    }
};

export function initCarouselModal () {
    return new Carousel(modal, carousel, main, body);
};