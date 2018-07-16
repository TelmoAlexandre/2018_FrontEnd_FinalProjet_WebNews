function getNews(categoryName, pageNum) {

    return fetch(`/api/News/Category/${categoryName}/Page/${pageNum}`, { headers: { Accept: 'application/json' } })
        .then(function (reponse) {
            if (reponse.status === 200) {

                return reponse.json();

            } else {

                return Promise.reject(new Error(reponse.statusText));
            }
        });
}

function getNewsSearchFilter(categoryName, searchValue) {

    return fetch(`/api/News/Category/${categoryName}/Search/${searchValue}`, { headers: { Accept: 'application/json' } })
        .then(function (reponse) {
            if (reponse.status === 200) {

                return reponse.json();

            } else {

                return Promise.reject(new Error(reponse.statusText));
            }
        });
}

function getCategories() {

    return fetch("/api/Categories", { headers: { Accept: 'application/json' } })
        .then(function (reponse) {
            if (reponse.status === 200) {

                return reponse.json();

            } else {
                return Promise.reject(new Error(reponse.statusText));
            }
        });
}

function getNewsArticle(id) {

    return fetch(`/api/News/${id}`, { headers: { Accept: 'application/json' } })
        .then(function (reponse) {
            if (reponse.status === 200) {

                return reponse.json();

            } else {

                return Promise.reject(new Error(reponse.statusText));
            }
        });
}

function getUserProfile(id) {

    return fetch(`/api/UserProfile/${id}`, { headers: { Accept: 'application/json' } })
        .then(function (reponse) {
            if (reponse.status === 200) {

                return reponse.json();

            } else {

                return Promise.reject(new Error(reponse.statusText));
            }
        });
}

function getUsersProfile() {

    return fetch(`/api/UserProfile`, { headers: { Accept: 'application/json' } })
        .then(function (reponse) {
            if (reponse.status === 200) {

                return reponse.json();

            } else {

                return Promise.reject(new Error(reponse.statusText));
            }
        });
}

function postComment(jsonComment) {

    return fetch('/api/Comments', {

        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: jsonComment

    })
        .then(resposta => {
            if (resposta.ok) {

                return resposta.json();

            } else {

                return resposta.json()
                    .then(erro => Promise.reject(erro));
            }
        })
}

function deleteComment(id) {

    return fetch(`/api/Comments/Delete/${id}`, {

        method: 'delete',
        headers: { 'Content-Type': 'application/json' }

    })
        .then(resposta => {
            if (resposta.ok) {

                return resposta.json();

            } else {

                return resposta.json()
                    .then(erro => Promise.reject(erro));
            }
        })
}