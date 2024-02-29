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
    const next = carousel.querySelector('#next');
    const prev = carousel.querySelector('#prev');

    let index;

    next.addEventListener('click', () => {
        index++;

        if(index > allMedias.length - 1) {
            index = 0;
        }
        
        displayMediaCarousel(allMedias[index]);
    })

    prev.addEventListener('click', () => {
        index--;

        if(index < 0) {
            index = allMedias.length - 1;
        }

        displayMediaCarousel(allMedias[index]);       
    })

    for(let media of allMedias) {
        media.addEventListener('click', () => {
            index = allMedias.indexOf(media);

            displayMediaCarousel(allMedias[index]);
            
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