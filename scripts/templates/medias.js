export class Media {
    constructor(media) {
        this.title = media.title;
        this.likes = media.likes;
        this.image = media.image;
        this.date = media.date;
        this.video = media.video;
        this.mediaPath = this.getPathMedia();
    }

    getPathMedia(){
        return `assets/medias/${this.image || this.video}`;
    }

    getMediaCard() {
        const elementLi = document.createElement('li');
        elementLi.setAttribute('class', 'media-item');

        const article = document.createElement('article');
        article.setAttribute('class', 'article-media');

        let elMedia;

        if(this.image) {
            elMedia = document.createElement('img');
            elMedia.setAttribute('alt', this.title);
        } else {
            elMedia = document.createElement('video');
            elMedia.setAttribute('type', 'video/mp4');

            const erreur = document.createElement('span');
            erreur.textContent = 'Votre navigateur ne prend pas en charge les vidéos HTML5'

            elMedia.appendChild(erreur);
        }

        elMedia.setAttribute('src', this.mediaPath);
        elMedia.setAttribute('class', 'image-media');
        elMedia.setAttribute('tabindex', '0');
        elMedia.setAttribute('aria-haspopup', 'dialog');
        elMedia.setAttribute('aria-controls', 'carousel_modal');
        elMedia.setAttribute('data-name', `${this.title}`);

        const divInfo = document.createElement('div');
        divInfo.setAttribute('class', 'div-info-media');
        
        const textInfo = 
        `<h2 class='text-media'>${this.title}</h2>
         <span class='number-likes'>${this.likes}<i class='fa-solid fa-heart icon-media' aria-label='likes'></i>
         </span>
        `;

        divInfo.innerHTML = textInfo;

        article.appendChild(elMedia);
        article.appendChild(divInfo);
        elementLi.appendChild(article);

        return elementLi;
    }
}