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
    mediaFocus = media;
}