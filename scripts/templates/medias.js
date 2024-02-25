function mediasTemplate(media) {
    const {title, likes, image, date} = media;

    const picture = `assets/medias/min_${image}`;

    function getMediaCard() {
        const elementLi = document.createElement('li');
        elementLi.setAttribute('class', 'media-item');

        const article = document.createElement('article');
        article.setAttribute('class', 'article-media');

        const image = document.createElement('img');
        image.setAttribute('class', 'image-media');
        image.setAttribute('src', picture);
        image.setAttribute('alt', '');

        const divInfo = document.createElement('div');
        divInfo.setAttribute('class', 'div-info-media');
        
        const textInfo = 
        `<p class='text-media'>${title}</p>
         <span class='number-likes'>${likes}<i class='fa-solid fa-heart' aria-label='likes' tabindex='0'></i>
         </span>
        `;

        divInfo.innerHTML = textInfo

        article.appendChild(image);
        article.appendChild(divInfo);
        elementLi.appendChild(article);

        return elementLi;
    }

    return {title, likes, picture, date, getMediaCard};
}