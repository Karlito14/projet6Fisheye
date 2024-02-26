function mediasTemplate(media) {
    const {title, likes, image, date, video} = media;

    const picture = `assets/medias/min_${image}`;
    const videoMedia = `assets/medias/min_${video}`;

    function getMediaCard() {
        const elementLi = document.createElement('li');
        elementLi.setAttribute('class', 'media-item');

        const article = document.createElement('article');
        article.setAttribute('class', 'article-media');

        let elMedia;

        if(image) {
            elMedia = document.createElement('img');
            elMedia.setAttribute('src', picture);
            elMedia.setAttribute('alt', "");
        } else {
            elMedia = document.createElement('video');
            elMedia.setAttribute('controls', 'controls');

            const source = document.createElement('source');
            source.setAttribute('src', videoMedia);
            source.setAttribute('type', 'video/webm');

            const erreur = document.createElement('span');
            erreur.textContent = 'Votre navigateur ne prend pas en charge les vidéos HTML5'

            elMedia.appendChild(source);
            elMedia.appendChild(erreur);
        }

        elMedia.setAttribute('class', 'image-media');

        const divInfo = document.createElement('div');
        divInfo.setAttribute('class', 'div-info-media');
        
        const textInfo = 
        `<h2 class='text-media'>${title}</h2>
         <span class='number-likes'>${likes}<i class='fa-solid fa-heart icon-media' aria-label='likes'></i>
         </span>
        `;

        divInfo.innerHTML = textInfo

        article.appendChild(elMedia);
        article.appendChild(divInfo);
        elementLi.appendChild(article);

        return elementLi;
    }

    return {title, likes, picture, date, videoMedia, getMediaCard};
}

function getTotalLikesAndPrice(totalLikes, price) {
    const likesAndPrice = document.createElement('p');
    likesAndPrice.setAttribute('aria-label', 'likes total and price');
    likesAndPrice.setAttribute('class', 'likes-price');
    likesAndPrice.innerHTML = `<span aria-label='nombre de likes' class='total-likes'>${totalLikes}</span><i class="fa-solid fa-heart icon-likes"></i><span aria-label='montant journalier'>${price}€ / jour</span>`;

    return likesAndPrice;
}

function sortByValue(medias, value) {
    if(value === 'popularity') {
        medias.sort((a, b) => {
            return b.likes - a.likes;
        })
    } else if(value === 'title') {
        medias.sort((a, b) => {
            return a.title.localeCompare(b.title);
        })
    } else if(value === 'date') {
        medias.sort((a, b) => {
            let valueA = +a.date.split('-')[0];
            let valueB = +b.date.split('-')[0];

            if(valueA === valueB) {
                valueA = +a.date.split('-')[1];
                valueB = +b.date.split('-')[1];

                if(valueA === valueB) {
                    valueA = +a.date.split('-')[2];
                    valueB = +b.date.split('-')[2];
                }
            }

            return valueB - valueA;
        })
    }

    return medias;
}