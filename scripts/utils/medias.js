function getTotalLikesAndPrice (medias, price) {
    const likesAndPrice = document.createElement('p');

    const totalLikes = medias.reduce((acc, curr) => {
        return acc + curr.likes;
    }, 0);

    likesAndPrice.setAttribute('aria-label', 'likes total and price');
    likesAndPrice.setAttribute('class', 'likes-price');
    likesAndPrice.innerHTML = `<span aria-label='nombre de likes' class='total-likes'>${totalLikes}</span><i class="fa-solid fa-heart icon-likes"></i><span aria-label='montant journalier'>${price}€ / jour</span>`;

    return likesAndPrice;
}

function sortByValue (medias, value) {
    if (value === 'popularity') {
        medias.sort((a, b) => {
            return b.likes - a.likes;
        });
    } else if (value === 'title') {
        medias.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
    } else if (value === 'date') {
        medias.sort((a, b) => {
            let valueA = +a.date.split('-')[0];
            let valueB = +b.date.split('-')[0];

            if (valueA === valueB) {
                valueA = +a.date.split('-')[1];
                valueB = +b.date.split('-')[1];

                if (valueA === valueB) {
                    valueA = +a.date.split('-')[2];
                    valueB = +b.date.split('-')[2];
                }
            }
            return valueB - valueA;
        });
    }
    return medias;
}

export { sortByValue, getTotalLikesAndPrice };