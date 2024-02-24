function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;
    console.log(data)

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute('class', 'article');

        const img = document.createElement( 'img' );
        img.setAttribute('class', 'article-img');
        img.setAttribute("src", picture);
        img.setAttribute('alt', `photo de ${name}`);

        const h2 = document.createElement( 'h2' );
        h2.setAttribute('class', 'article-title');
        h2.textContent = name;

        const adress = document.createElement('adress');
        adress.setAttribute('class', 'article-adress');
        adress.textContent = `${city}, ${country}`;

        const citation = document.createElement('q');
        citation.setAttribute('class', 'article-citation');
        citation.textContent = tagline;

        const elPrice = document.createElement('span');
        elPrice.setAttribute('class', 'article-price');
        elPrice.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(adress);
        article.appendChild(citation);
        article.appendChild(elPrice);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}