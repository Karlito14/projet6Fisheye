import { Api } from '../api/api.js';
import { Photographer } from '../templates/photographer.js';

async function getPhotographers () {
    const apiData = new Api('./data/photographers.json');
    const result = await apiData.getData();
    const photographers = result.photographers;

    return photographers;
}

function displayData (photographers) {
    const photographersListSection = document.querySelector('.list-photographers');

    photographers.forEach((photographer) => {
        const photographerModel = new Photographer(photographer);
        const photographerCardDom = photographerModel.getUserCardHomePage();
        photographersListSection.appendChild(photographerCardDom);
    });
}

async function init () {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();