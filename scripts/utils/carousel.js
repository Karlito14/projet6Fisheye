const modal = document.querySelector('#carousel_modal');
const main = document.querySelector('#main');
const body = document.querySelector('body');
const buttonClose = modal.querySelector('.close-carousel');
const titleCarousel = modal.querySelector('#carrousel-title');
const carousel = modal.querySelector('.modal-carousel');

const modalCarousel = new Modal(modal, main);

let mediaFocus;

function initCarousel() {
    const allMedias = Array.from(main.querySelectorAll('.image-media'));
    const elLiCarousel = carousel.querySelector('#li-list-carousel');
    const next = carousel.querySelector('#next');
    const prev = carousel.querySelector('#prev');


    let index;

    next.addEventListener('click', () => {
        index++;

        if(index > allMedias.length - 1) {
            index = 0;
        }
        elLiCarousel.firstElementChild.remove();

        const elMediaCarousel = nextMedia(allMedias, index);
            
        elLiCarousel.prepend(elMediaCarousel);

    })

    prev.addEventListener('click', () => {
        index--;

        if(index < 0) {
            index = allMedias.length - 1;
        }
        elLiCarousel.firstElementChild.remove();

        const elMediaCarousel = nextMedia(allMedias, index);
            
        elLiCarousel.prepend(elMediaCarousel);

    })

    for(let media of allMedias) {
        media.addEventListener('click', () => {
            elLiCarousel.firstElementChild.remove();
            index = allMedias.indexOf(media);
            mediaFocus = media;

            const elMediaCarousel = nextMedia(allMedias, index);
            
            elLiCarousel.prepend(elMediaCarousel);

            setTimeout(() => {
                openCarousel();
            },200);
        })
    }
}

function nextMedia(allMedias, index) {
    const source = allMedias[index].src;
    const title = allMedias[index].dataset.name;

    let elMediaCarousel;

    if(allMedias[index].localName === 'video') {
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
    
    return elMediaCarousel;
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
