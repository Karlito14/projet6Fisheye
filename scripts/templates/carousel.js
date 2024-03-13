/* eslint-disable no-unused-vars */
const modal = document.querySelector('#carousel_modal');
const main = document.querySelector('#main');
const body = document.querySelector('body');
const carousel = modal.querySelector('.modal-carousel');

function initCarouselModal () {
    // eslint-disable-next-line no-undef
    const modalCarousel = new Carousel(modal, carousel, main, body);
};