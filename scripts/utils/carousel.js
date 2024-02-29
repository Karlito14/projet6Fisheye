const modal = document.querySelector('#carousel_modal');
const main = document.querySelector('#main');
const body = document.querySelector('body');
const buttonClose = modal.querySelector('.close-carousel');
const titleCarousel = modal.querySelector('#carrousel-title');
const carousel = modal.querySelector('.modal-carousel');

const modalCarousel = new Modal(modal, main);

let mediaFocus;

function initCarousel() {
    const allMedias = main.querySelectorAll('.image-media');
    const elLiCarousel = carousel.querySelector('#li-list-carousel');

    
    for(let media of allMedias) {
        media.addEventListener('click', (event) => {
            const source = event.target.src;
            const title = event.target.dataset.name;

            elLiCarousel.firstElementChild.remove();

            let elMediaCarousel;

            if(event.target.localName === 'video') {
                const videoCarousel = document.createElement('video');
                videoCarousel.setAttribute('controls', 'controls');
                videoCarousel.setAttribute('type', 'video/mp4');
                videoCarousel.setAttribute('autoplay', 'autoplay');
                videoCarousel.textContent = 'Votre navigateur ne permet pas de lire les vidéos';

                elMediaCarousel = videoCarousel;
            } else {
                const imageCarousel = document.createElement('img');
                imageCarousel.setAttribute('alt', '');

                elMediaCarousel = imageCarousel;
            }

            elMediaCarousel.src = source;
            elMediaCarousel.setAttribute('class', 'media-carousel');

            titleCarousel.textContent = title;
            mediaFocus = media;

            elLiCarousel.prepend(elMediaCarousel)

            setTimeout(() => {
                openCarousel();
            },200);
        })
    }
}

buttonClose.addEventListener('click', () => {
    closeCarousel();
});

modal.addEventListener('click', () => {
    closeCarousel();
});

carousel.addEventListener('click', (event) => {
    event.stopPropagation();
});

function openCarousel() {
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', false);
    main.setAttribute('aria-hidden', true);
    body.style.overflow = 'hidden';
    modalCarousel.focusInFirstElementFocusable();

    window.addEventListener('keydown', (event) => {
        if(modal.style.display === 'block') {
            if(event.code === 'Tab') {
                modalCarousel.closeFocusInTheModal(event);
            }
    
            if(event.code === 'Escape') {
                closeCarousel();
            }
        }     
    })
}

function closeCarousel() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', true);
    main.setAttribute('aria-hidden', false);
    body.removeAttribute('style');
    mediaFocus.focus();
}
