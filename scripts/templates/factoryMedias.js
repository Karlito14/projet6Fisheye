export class Factory {
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