import { Api } from '../api/api.js';
import { Photographer } from '../templates/photographer.js';

async function getPhotographers () {
    // fonction pour récupérer les photographes
    const apiData = new Api('./data/photographers.json');
    const result = await apiData.getData();
    const photographers = result.photographers;

    return photographers;
}

function displayData (photographers) {
    const photographersListSection = document.querySelector('.list-photographers');

    photographers.forEach((photographer) => {
        // Nouvelle instance de Photographer pour chaque photographe et affichage sur la page d'accueil
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