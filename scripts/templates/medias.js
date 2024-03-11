import { Factory } from './factoryMedias.js';

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

        // Création d'une instance de la class Factory
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

    updateValueLikes() {
        const iconsHeart = document.querySelectorAll('.icon-media');
        for(let icon of iconsHeart) {
            let clicked = false;
            icon.addEventListener('click', () => {
                const span = icon.closest('span');
                const value = span.textContent;
                const totalLikes = document.querySelector('.total-likes');
                const valueTotalLikes = totalLikes.textContent;

                let newValue;
                
                if(!clicked) {
                    newValue = +value + 1;
                    totalLikes.textContent = +valueTotalLikes + 1;
                    clicked = true;
                } else {
                    newValue = +value - 1;
                    totalLikes.textContent = +valueTotalLikes - 1;
                    clicked = false;
                }

                span.textContent = newValue;
                span.appendChild(icon);
            });
        }
    }
}