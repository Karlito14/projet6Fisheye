async function getMediasAndPhotographeById(id) {
    const response = await fetch('./data/photographers.json');
    const result = await response.json();

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

    medias.forEach(media => {
        const mediaModel = mediasTemplate(media);
        const mediaCard = mediaModel.getMediaCard();
        elMediasList.appendChild(mediaCard);
    });
}

async function init() {
    // Récupère le ID du photographe dans l'URL
    const params = new URL(document.location).searchParams;
    let id = params.get("id");

    // Récupère les medias du photographe et son identité
    const [mediasFiltered, photographer] = await getMediasAndPhotographeById(+id);

    displayPhotographer(photographer);
    displayMedias(mediasFiltered);
}

init();