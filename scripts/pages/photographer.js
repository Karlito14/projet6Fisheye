/* eslint-disable no-undef */
import { Api } from '../api/api.js';
import { Photographer } from '../templates/photographer.js';
import { Media } from '../templates/medias.js';
import { sortByValue, getTotalLikesAndPrice } from '../utils/medias.js';
import { initCarouselModal } from '../templates/carousel.js';

async function getMediasAndPhotographeById (id) {
    const apiData = new Api('./data/photographers.json');
    const result = await apiData.getData();
    const medias = result.media;

    const mediasFiltered = medias.filter((media) => media.photographerId === id);

    const photographer = result.photographers.filter((photographer) => photographer.id === id);

    return [mediasFiltered, ...photographer];
}

function displayPhotographer (photographer) {
    const photographerHeader = document.querySelector('.photograph-header');
    // ajout du nom du photographe dans le formulaire
    const nameForm = document.querySelector('.name-form');
    nameForm.textContent = photographer.name;

    const photographerModel = new Photographer(photographer);

    const [divInfo, image] = photographerModel.getUserCardPhotographerPage();

    photographerHeader.prepend(divInfo);
    photographerHeader.append(image);
}

function displayMedias (medias) {
    const elMediasList = document.querySelector('.medias-list');
    elMediasList.innerHTML = '';

    let mediaModel;

    medias.forEach(media => {
        mediaModel = new Media(media);
        const mediaCard = mediaModel.getMediaCard();
        elMediasList.appendChild(mediaCard);
    });

    // Appel de la méthode qui met à jour le nombre de likes sur les medias
    mediaModel.updateValueLikes();
}

function displayTotalLikesAndPrice (medias, price) {
    const sectionMedias = document.querySelector('.list-medias');

    const likesAndPrice = getTotalLikesAndPrice(medias, price);

    sectionMedias.appendChild(likesAndPrice);
}

async function init () {
    // Récupère le ID du photographe dans l'URL
    const params = new URL(document.location).searchParams;
    const id = params.get('id');

    // Récupère les oeuvres du photographe et son identité
    const [mediasFiltered, photographer] = await getMediasAndPhotographeById(+id);

    // Trier les oeuvres selon l'option selected
    const select = document.querySelector('.select-options');
    let mediasSort = sortByValue(mediasFiltered, select.value);

    select.addEventListener('input', (event) => {
        mediasSort = sortByValue(mediasFiltered, event.target.value);
        displayMedias(mediasSort);
        initCarouselModal();
    });

    displayPhotographer(photographer);
    displayMedias(mediasSort);
    displayTotalLikesAndPrice(mediasSort, photographer.price);

    initCarouselModal();
}

init();