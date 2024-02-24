function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    console.log(data)

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const listeItem = document.createElement('li');

        const article = document.createElement( 'article' );
        article.setAttribute('class', 'article');

        listeItem.appendChild(article);

        const link = document.createElement('a');
        link.setAttribute('href', `./photographer.html?api=${id}`);
        link.setAttribute('target', `_self`);

        const img = document.createElement( 'img' );
        img.setAttribute('class', 'article-img');
        img.setAttribute("src", picture);
        img.setAttribute('alt', "");

        link.appendChild(img);

        const h2 = document.createElement( 'h2' );
        h2.setAttribute('class', 'article-title');
        h2.textContent = name;

        link.appendChild(h2);

        const adress = document.createElement('adress');
        adress.setAttribute('class', 'article-adress');
        adress.textContent = `${city}, ${country}`;

        const citation = document.createElement('q');
        citation.setAttribute('class', 'article-citation');
        citation.textContent = tagline;

        const elPrice = document.createElement('span');
        elPrice.setAttribute('class', 'article-price');
        elPrice.setAttribute('aria-label', 'prix journalier du photographe');
        elPrice.textContent = `${price}€/jour`;

        article.appendChild(link);
        article.appendChild(adress);
        article.appendChild(citation);
        article.appendChild(elPrice);

        return (listeItem);
    }

    return { name, picture,city, country, tagline, price, id, getUserCardDOM };
}