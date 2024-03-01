import { Api } from "../api/api.js";

const apiData = new Api('./data/photographers.json');

async function getMediasAndPhotographeById(id) {
    const result = await apiData.getData()

    const medias = result.media;

    const mediasFiltered = medias.filter((media) => media.photographerId === id);

    const photographer = result.photographers.filter((photographer) => photographer.id === id);

    return [mediasFiltered, ...photographer];
}

function displayPhotographer(photographer) {
    const photographerHeader = document.querySelector('.photograph-header');

    const photographerModel = photographerTemplate(photographer);

    const [divInfo, image] = photographerModel.getUserCardPhotographer();

    photographerHeader.prepend(divInfo);
    photographerHeader.append(image)
}

function displayMedias(medias) {
    const elMediasList = document.querySelector('.medias-list');
    elMediasList.innerHTML = '';

    medias.forEach(media => {
        const mediaModel = mediasTemplate(media);
        const mediaCard = mediaModel.getMediaCard();
        elMediasList.appendChild(mediaCard);
    });

    const iconsHeart = document.querySelectorAll('.icon-media');
    
    for(let icon of iconsHeart) {
        let clicked = false;
        icon.addEventListener('click', () => {
            clicked = updateValueLikes(icon, clicked);
        })
    }
}

function displayTotalLikesAndPrice(medias, price) {
    const sectionMedias = document.querySelector('.list-medias');

    const likesAndPrice = getTotalLikesAndPrice(medias, price);

    sectionMedias.appendChild(likesAndPrice);
}

async function init() {
    // Récupère le ID du photographe dans l'URL
    const params = new URL(document.location).searchParams;
    let id = params.get("id");

    // Récupère les medias du photographe et son identité
    const [mediasFiltered, photographer] = await getMediasAndPhotographeById(+id);

    // Trier les oeuvres selon l'option selected
    const select = document.querySelector('.select-options');
    const medias = sortByValue(mediasFiltered, select.value);

    select.addEventListener('input', (event) => {
        medias = sortByValue(mediasFiltered, event.target.value);
        displayMedias(medias);
    })

    displayPhotographer(photographer);
    displayMedias(medias);
    displayTotalLikesAndPrice(medias, photographer.price);
    initCarousel();
}

init();
