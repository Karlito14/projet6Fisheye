import { Api } from "../api/api.js";
import { Photographer } from "../templates/photographer.js";

const apiData = new Api('./data/photographers.json')

async function getPhotographers() {
    const result = await apiData.getData();
    const photographers = result.photographers;

    return photographers;
}

function displayData(photographers) {
    const photographersListSection = document.querySelector(".list-photographers");

    photographers.forEach((photographer) => {
        const photographerModel = new Photographer(photographer);
        const photographerCardDom = photographerModel.getUserCardHomePage();
        /*const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();*/
        photographersListSection.appendChild(photographerCardDom);
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();
    
