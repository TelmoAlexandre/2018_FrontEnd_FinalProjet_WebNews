function getNews() {

    return fetch("/api/News", { headers: { Accept: 'application/json' } })
        .then(function (reponse) {
            if (reponse.status === 200) {

                return reponse.json();

            } else {
                return Promise.reject(new Error(reponse.statusText));
            }
        });
}

function getCategories(){
    return fetch("/api/Categories", { headers: { Accept: 'application/json' } })
        .then(function (reponse) {
            if (reponse.status === 200) {

                return reponse.json();

            } else {
                return Promise.reject(new Error(reponse.statusText));
            }
        });
}