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

    return {title, likes, picture, date, videoMedia, getMediaCard, getTotalLikesAndPrice};
}

function getTotalLikesAndPrice(totalLikes, price) {
    const likesAndPrice = document.createElement('span');
    likesAndPrice.setAttribute('aria-label', 'likes total and price');
    likesAndPrice.setAttribute('class', 'likes-price');
    likesAndPrice.innerHTML = `${totalLikes}<i class="fa-solid fa-heart icon-likes"></i> ${price}€ / jour`;

    return likesAndPrice;
}