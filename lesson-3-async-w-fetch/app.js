(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID bd18852d92f956937def8d7f0ab0f6d3fc1acf00cf096af4f143e2f1fd66fef0'
            }
        }).then(response => response.json()).then(addImage).catch(e => requestImageError(e, 'image'));

        function addImage(data) {
            let htmlContent = '';
            const firstImage = data.results[0];
            const images = data.results;

            //     if (firstImage) {
            //         htmlContent = `<figure>
            //     <img src="${firstImage.urls.full}" alt="${searchedForText}">
            //     <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            // </figure>`;
            //     }
            if (images) {
                for (var i = 0; i < 10; i++) {
                    htmlContent = `<figure><img src="${images[i].urls.full}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${images[i].user.name}</figcaption></figure>`;
                    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
                };
            } else {
                htmlContent = 'Unfortunately, no image was returned for your search.'
                responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
            }
        };

        function requestImageError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        };

        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=ed11ce69c5b2490e9a4c4e41e1aa686d`, {
            // headers: {
            //     Authorization: 'Client-ID bd18852d92f956937def8d7f0ab0f6d3fc1acf00cf096af4f143e2f1fd66fef0'
            // }
        }).then(response => response.json()).then(addArticles).catch(e => requestArticleError);

        function addArticles(data) {
            let htmlContent = '';
            // const data = JSON.parse(this.responseText);
            if (data.response && data.response.docs && data.response.docs.length > 1) {
                htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article"> 
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                    </li>`).join('') + '</ul>';

            } else {
                htmlContent = ` <div class = "error-no-articles"> No articles available </div>`;
            }
            responseContainer.insertAdjacentHTML('afterend', htmlContent);
        };

        function requestArticleError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">There was an error making a request for the ${part}.</p>`);
        };
    });
})();