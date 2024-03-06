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

        const buttonOpenMedia = document.createElement('button');
        buttonOpenMedia.setAttribute('class', 'button-media');
        
        let elMedia = new Factory(this.mediaPath, this.title, this.image ? 'image' : 'video');
        
        elMedia = elMedia.create();

        buttonOpenMedia.appendChild(elMedia);

        const divInfo = document.createElement('div');
        divInfo.setAttribute('class', 'div-info-media');
        
        const textInfo = 
        `<h2 class='text-media'>${this.title}</h2>
         <span class='number-likes'>${this.likes}<i class='fa-solid fa-heart icon-media' aria-label='likes'></i>
         </span>
        `;

        divInfo.innerHTML = textInfo;

        article.appendChild(buttonOpenMedia);
        article.appendChild(divInfo);
        elementLi.appendChild(article);

        return elementLi;
    }
}

class Factory {
    constructor(path, title, type) {
        switch(type) {
            case 'image': 
                return new Image(path, title);
            case 'video':
                return new Video(path, title);
        }
    }
}

class Image {
    constructor(path, title) {
        this.path = path;
        this.title = title;
    }

    create() {
        this.element = document.createElement('img');
        this.element.setAttribute('alt', this.title);
        this.element.setAttribute('src', this.path);
        this.element.setAttribute('class', 'image-media');
        this.element.setAttribute('aria-haspopup', 'dialog');
        this.element.setAttribute('aria-controls', 'carousel_modal');
        this.element.setAttribute('data-name', `${this.title}`);
        return this.element;
    }
}

class Video{
    constructor(path, title) {
        this.path = path;
        this.title = title;
    }

    create() {
        this.element = document.createElement('video');
        this.element.setAttribute('alt', this.title);

        this.error = document.createElement('span');
        this.error.textContent = 'Votre navigateur ne prend pas en charge les vidéos HTML5';

        this.element.appendChild(this.error);

        this.element.setAttribute('src', this.path);
        this.element.setAttribute('class', 'image-media');
        this.element.setAttribute('aria-haspopup', 'dialog');
        this.element.setAttribute('aria-controls', 'carousel_modal');
        this.element.setAttribute('data-name', `${this.title}`);
        return this.element;
    }
}