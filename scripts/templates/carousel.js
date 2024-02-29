function updateValueLikes(icon, clicked) {
    const span = icon.closest('span');
    const value = span.textContent;
    const totalLikes = document.querySelector('.total-likes');
    const valueTotalLikes = totalLikes.textContent;

    let newValue;
    
    if(!clicked) {
        newValue = +value + 1;
        totalLikes.textContent = +valueTotalLikes + 1;
        clicked = true;
    } else {
        newValue = +value - 1;
        totalLikes.textContent = +valueTotalLikes - 1;
        clicked = false;
    }

    span.textContent = newValue;
    span.appendChild(icon);

    return clicked;
}

function displayMediaCarousel(media) {
    const elLiCarousel = carousel.querySelector('#li-list-carousel');

    elLiCarousel.firstElementChild.remove();
    const [source, title] = [media.src, media.dataset.name];

    let elMediaCarousel;

    if(media.localName === 'video') {
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
    
    elLiCarousel.prepend(elMediaCarousel);
    mediaFocus = media;
}

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