function mediasTemplate(media) {
    const {title, likes, image, date, video} = media;
    console.log(media)

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
            elMedia.setAttribute('src', videoMedia);
        }
        elMedia.setAttribute('class', 'image-media');

        const divInfo = document.createElement('div');
        divInfo.setAttribute('class', 'div-info-media');
        
        const textInfo = 
        `<h2 class='text-media'>${title}</h2>
         <span class='number-likes'>${likes}<i class='fa-solid fa-heart' aria-label='likes'></i>
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