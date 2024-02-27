const modal = document.querySelector('#carousel_modal');
const main = document.querySelector('#main');
const body = document.querySelector('body');
const buttonClose = modal.querySelector('.close-carousel');
const imgCarousel = modal.querySelector('.image-carousel');
const titleCarousel = modal.querySelector('#carrousel-title');
const carousel = modal.querySelector('.modal-carousel');
const modalCarousel = new Modal(modal, main);

let mediaFocus;

function initCarousel() {
    const allMedias = main.querySelectorAll('.image-media');
    
    for(let media of allMedias) {
        media.addEventListener('click', (event) => {
            const source = event.target.src;
            const title = event.target.dataset.name;

            imgCarousel.src = source;
            titleCarousel.textContent = title;
            mediaFocus = media;

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
        if(event.code === 'Tab') {
            modalCarousel.closeFocusInTheModal(event);
        }
    })

    window.addEventListener('keydown', (event) => {
        if(event.code === 'Escape') {
            closeCarousel();
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
