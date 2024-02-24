async function getPhotographers() {
    const response = await fetch('./data/photographers.json');
    const result = await response.json();

    const photographers = result.photographers;

    return photographers;
}

function displayData(photographers) {
    const photographersListSection = document.querySelector(".list-photographers");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersListSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();
    
