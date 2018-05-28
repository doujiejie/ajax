/* eslint-env jquery */

(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', ` < div class = "error-no-articles" > No articles available < /div>`);
        }
        // const articleRequest = new XMLHttpRequest();
        // articleRequest.onload = addArticles;
        // articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=ed11ce69c5b2490e9a4c4e41e1aa686d`);
        // articleRequest.send();
        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=ed11ce69c5b2490e9a4c4e41e1aa686d`,
            // type: 'default GET (Other values: POST)',
            // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            // data: {param1: 'value1'},
            // headers:{
            // Authorization: 'Client-ID 123abc456def'
            // }
        }).done(addArticles);
        // .always(function() {
        //     console.log("complete");
        // });

        function addArticles(data) {
            let htmlContent = '';
            // const data = JSON.parse(this.responseText);
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
    });
})();