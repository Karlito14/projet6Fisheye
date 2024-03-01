export class Photographer {
    constructor(data) {
        this.name = data.name;
        this.portrait = data.portrait;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.id = data.id;
        this.picture = this.getImagePath();
    }

    // récupération du chemin pour la photo
    getImagePath() {
        return `assets/photographers/${this.portrait}`;
    }

    // Affichage du photographe Page d'accueil
    getUserCardHomePage() {
        const listeItem = document.createElement('li');

        const article = document.createElement( 'article' );
        article.setAttribute('class', 'article');

        listeItem.appendChild(article);

        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${this.id}`);
        link.setAttribute('target', `_self`);

        const img = document.createElement( 'img' );
        img.setAttribute('class', 'article-img');
        img.setAttribute("src", this.picture);
        img.setAttribute('alt', "");

        link.appendChild(img);

        const h2 = document.createElement( 'h2' );
        h2.setAttribute('class', 'article-title');
        h2.textContent =this.name;

        link.appendChild(h2);

        const adress = document.createElement('adress');
        adress.setAttribute('class', 'article-adress');
        adress.textContent = `${this.city}, ${this.country}`;

        const citation = document.createElement('q');
        citation.setAttribute('class', 'article-citation');
        citation.textContent = this.tagline;

        const elPrice = document.createElement('span');
        elPrice.setAttribute('class', 'article-price');
        elPrice.setAttribute('aria-label', 'prix journalier du photographe');
        elPrice.textContent = `${this.price}€/jour`;

        article.appendChild(link);
        article.appendChild(adress);
        article.appendChild(citation);
        article.appendChild(elPrice);

        return (listeItem);
    }

    // Affichage du photographe Page photographe
    getUserCardPhotographerPage() {
        const divInfo = document.createElement('div');
        divInfo.setAttribute('class', 'div-info');
    
        const title = document.createElement('h1');
        title.setAttribute('class', 'div-info-title');
        title.textContent = this.name;

        const adress = document.createElement('adress');
        adress.setAttribute('class', 'div-info-adress');
        adress.textContent = `${this.city}, ${this.country}`;

        const citation = document.createElement('q');
        citation.setAttribute('class', 'div-info-citation');
        citation.textContent = this.tagline;

        divInfo.appendChild(title);
        divInfo.appendChild(adress);
        divInfo.appendChild(citation);

        const divImg = document.createElement('div');
        divImg.setAttribute('class', 'div-img');

        const img = document.createElement( 'img' );
        img.setAttribute('class', 'div-img-image');
        img.setAttribute("src", this.picture);
        img.setAttribute('alt', this.name);

        divImg.appendChild(img)

        return [divInfo, divImg];
    }
}