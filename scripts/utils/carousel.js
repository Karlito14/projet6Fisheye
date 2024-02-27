function openCarousel() {
    const modalCarousel = document.querySelector('#carousel_modal');
    const main = document.querySelector('#main');
    const allMedias = main.querySelectorAll('.image-media');
    const imgCarousel = modalCarousel.querySelector('.image-carousel');
    const titleCarousel = modalCarousel.querySelector('#carrousel-title')

    const modal = new Modal(modalCarousel, main);

    for(let media of allMedias) {
        media.addEventListener('click', (event) => {
            const source = event.target.src;
            const title = event.target.dataset.name;

            imgCarousel.src = source;
            titleCarousel.textContent = title;
        })
    }
}
