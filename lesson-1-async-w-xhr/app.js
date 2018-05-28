(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        function addImage() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            if (data && data.results) {
                data.results.forEach(function (image) {
                    htmlContent = htmlContent + '<figure>' +
                        '<img src=' + image.urls.regular + ' alt=' + searchedForText + '>' +
                        '<figcaption>' + searchedForText + ' by ' + image.user.name + '</figcaption>' +
                        '</figure>';
                });
            } else {
                htmlContent = `<div class="error-no-image">No image available</div>`;
            }
            responseContainer.insertAdjacentHTML('afterBegin', htmlContent);
        }
        const imgRequest = new XMLHttpRequest();
        imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        imgRequest.onload = addImage;
        imgRequest.setRequestHeader('Authorization',
            'Client-ID bd18852d92f956937def8d7f0ab0f6d3fc1acf00cf096af4f143e2f1fd66fef0');
        imgRequest.send();

        function addArticles() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            if (data.response && data.response.docs && data.response.docs.length > 1) {
                htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article"> 
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                    </li>`).join('') + '</ul>';

            } else {
                htmlContent = ` < div class = "error-no-articles" > No articles available < /div>`;
            }
            responseContainer.insertAdjacentHTML('afterend', htmlContent);
        }
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=ed11ce69c5b2490e9a4c4e41e1aa686d`);
        articleRequest.send();

    });
})();