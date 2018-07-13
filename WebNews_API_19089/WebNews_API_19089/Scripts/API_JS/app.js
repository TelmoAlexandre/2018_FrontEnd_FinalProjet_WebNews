
// Declaração dos 'div' que vão ter que ser escondidos/mostrados
let newsContainer = document.createElement('div');
let newsArticle = document.createElement('div');
let userProfile = document.createElement('div');


document.addEventListener("DOMContentLoaded", function main(e) {
    init();
});

function init() {

    // Cria os 'div' base
    CreateMainContainers();

    // Preenche o <header>
    // Aqui é utilizado o fetch das categorias
    fillHeaderContainer();

    // Preencher o 'div' .bodyContainer
    // Com os 'div' que irão ser collapsed
    fillBodyContainer();

    // Preenche o corpo 
    showAllNews();

}

function CreateMainContainers() {

    // Header
    let header = document.createElement('header');
    document.body.appendChild(header);

    // Header container
    let headerContainer = document.createElement('div');
    headerContainer.className = 'headerContainer';
    header.appendChild(headerContainer);

    // Body container
    let bodyContainer = document.createElement('div');
    bodyContainer.className = 'bodyContainer';
    document.body.appendChild(bodyContainer);

    // Bootstrap
    let container = document.createElement('div');
    container.className = 'container';
    bodyContainer.appendChild(container);

    // Footer
    let footer = document.createElement('div');
    footer.className = 'footer';
    document.body.appendChild(footer);
}

function fillHeaderContainer() {

    //#region headerLinks

    let headerLinks = document.createElement('div');
    headerLinks.className = 'headerLinks';
    $('.headerContainer').append(headerLinks);

    //#endregion

    //#region title

    let title = document.createElement('div');
    title.className = 'title';
    $('.headerContainer').append(title);

    let webpaperTitle = document.createElement('a');
    webpaperTitle.textContent = 'Web Paper';
    webpaperTitle.onclick = function (e) {
        e.preventDefault;

        showAllNews();

    };
    title.appendChild(webpaperTitle);


    //#endregion

    //#region date

    let date = document.createElement('div');
    date.className = 'date';
    date.textContent = moment().format('dddd, MMMM DD, YYYY'); // Utilizada a biblioteca moment.js
    $('.headerContainer').append(date);

    //#endregion

    getCategories()
        .then(function (categories) {

            displayCategories(categories);

        })
        .catch(function (error) {
            console.error(error);
            alert("We couldn't retrieve the categories...");
        })

}

/**
 * 
 * Recebe Json com categorias e faz o seu display na top bar.
 * 
 * @param {any} categories
 */
function displayCategories(categories) {

    // Link 'All'
    let catLink = document.createElement('a');
    catLink.className = 'categoryLink';
    catLink.textContent = 'All';
    catLink.onclick = function (e) {
        e.preventDefault();

        showAllNews();

    };
    $('.headerLinks').append(catLink);

    // Resto das categorias
    categories.forEach(function (category) {

        let catLink = document.createElement('a');
        catLink.className = 'categoryLink';
        catLink.textContent = `${category.Name}`;
        catLink.onclick = function (e) {
            e.preventDefault();

            showCategoryNews(category.ID);

        };
        $('.headerLinks').append(catLink);

    });

}

function fillBodyContainer() {

    // 'div' que irá conter todos os news blocks
    newsContainer.className = 'row newsContainer'; // Bootstrap
    $('.container').append(newsContainer);

    // 'div' que irá conter os detalhes de uma noticia
    newsArticle.className = 'col-12 row newsArticle'; // Bootstrap
    $('.container').append(newsArticle);

    // 'div' que irá conter todos os news blocks
    userProfile.className = 'col-12 row userProfile'; // Bootstrap
    $('.container').append(userProfile);

}

function showAllNews() {

    getNews()
        .then(function (news) {

            showNews(news);

        })
        .catch(function (error) {

            console.error(error);
            alert("We couldn't retrieve the news articles...");

        })
}

function showCategoryNews(category) {

    getNewsCategory(category)
        .then(function (news) {

            showNews(news);

        }).catch(function (error) {

            onsole.error(error);
            alert("We couldn't retrieve the news articles...");

        })
}

function showNews(news) {

    initThisDivToShowContent(newsContainer.className);

    // 'div' que contém a categoria
    let newsCategory = document.createElement('div');
    newsCategory.className = 'col-12 center newsCategory'; // Bootstrap
    $('.newsContainer').append(newsCategory);

    // Nome da categoria
    let categoryTitle = document.createElement('h1');
    categoryTitle.className = 'bold';
    categoryTitle.textContent = news.Category;
    newsCategory.appendChild(categoryTitle);

    news.News.forEach(function (newsArticle) {

        // Criar o bloco da noticia
        let newsBlock = document.createElement('div');
        newsBlock.className = 'newsBlock col-4'; // Bootstrap
        $('.newsContainer').append(newsBlock);

        // Titulo da noticia
        let newsTitle = document.createElement('h1');
        newsTitle.className = 'newsTitle';
        newsBlock.appendChild(newsTitle);

        // Link que se encontra dentro do 'h1' do titulo da noticia
        let newsLink = document.createElement('a');
        newsLink.textContent = newsArticle.Title;
        newsLink.onclick = function (e) {
            e.preventDefault();

            showNewsArticle(newsArticle.ID);

        };
        newsTitle.appendChild(newsLink);

        // Descrição da noticia
        let description = document.createElement('p');
        description.className = 'newsDescription';
        description.textContent = newsArticle.Description;
        newsBlock.appendChild(description);

    });
}

function showNewsArticle(id) {

    getNewsArticle(id)
        .then(function (newsPiece) {

            displayNewsArticle(newsPiece);

        }).catch(function (error) {

            console.error(error);
            alert("We couldn't retrieve the news articles...");

        })

}

function displayNewsArticle(newsPiece) {

    initThisDivToShowContent(newsArticle.className);

    //#region Main DIVs

    // 'div' que contém a noticia
    let newsDetail = document.createElement('div');
    newsDetail.className = 'col-12 newsDetail row'; // Bootstrap
    newsArticle.appendChild(newsDetail);

    // 'div' que contém os comentários
    let newsCommentsContainer = document.createElement('div');
    newsCommentsContainer.className = 'col-12 newsCommentsContainer'; // Bootstrap
    newsCommentsContainer.id = 'newsCommentsContainer';
    newsArticle.appendChild(newsCommentsContainer);

    //#endregion

    //#region NewsArticle

    // Parte da esquerda da noticia
    let newsDetailHeaderContainer = document.createElement('div');
    newsDetailHeaderContainer.className = 'col-6 newsDetailHeaderContainer';
    newsDetail.appendChild(newsDetailHeaderContainer);

    // Parte da direita da noticia
    let newsDetailBodyContainer = document.createElement('div');
    newsDetailBodyContainer.className = 'col-6 newsDetailBodyContainer';
    newsDetail.appendChild(newsDetailBodyContainer);

    //#region Lado Esquerdo

    // Titulo da noticia
    let newsDetailHeaderTitleContainer = document.createElement('div');
    newsDetailHeaderTitleContainer.className = 'newsDetailHeaderTitleContainer';
    newsDetailHeaderContainer.appendChild(newsDetailHeaderTitleContainer);

    let newsTitle = document.createElement('div');
    newsTitle.className = 'newsTitle';
    newsTitle.textContent = newsPiece.Title;
    newsDetailHeaderTitleContainer.appendChild(newsTitle);

    // Categoria da noticia
    let newsDetailHeaderCategoryContainer = document.createElement('div');
    newsDetailHeaderCategoryContainer.className = 'newsDetailHeaderCategoryContainer';
    newsDetailHeaderContainer.appendChild(newsDetailHeaderCategoryContainer);

    // Link da categoria da noticia
    let linkCategory = document.createElement('a');
    linkCategory.className = 'bold';
    linkCategory.textContent = ` - ${newsPiece.Category} - `;
    linkCategory.onclick = function (e) {
        e.preventDefault();

        showCategoryNews(newsPiece.CategoryID);
    };
    newsDetailHeaderCategoryContainer.appendChild(document.createElement('hr'));
    newsDetailHeaderCategoryContainer.appendChild(linkCategory);
    newsDetailHeaderCategoryContainer.appendChild(document.createElement('hr'));

    // 'div' das fotografias
    let newsDetailHeaderImagesContainer = document.createElement('div');
    newsDetailHeaderImagesContainer.className = 'newsDetailHeaderImagesContainer';
    newsDetailHeaderContainer.appendChild(newsDetailHeaderImagesContainer);

    // Mostrar as fotografias
    newsPiece.Photos.forEach(function (photo) {

        // 'img' para as fotografias
        let img = document.createElement('img');
        img.src = `/Images/${photo.Name}`
        newsDetailHeaderContainer.appendChild(img);

    });

    // Info das noticias
    let newsInfo = document.createElement('div');
    newsInfo.className = 'newsInfo row'; // Bootstrap
    newsDetailHeaderContainer.appendChild(newsInfo);

    // Autores
    let newsAuthors = document.createElement('div');
    newsAuthors.className = 'newsAuthors col-6';
    newsInfo.appendChild(newsAuthors);

    // h4 Authors
    let label = document.createElement('h4');
    label.className = 'bold';
    label.textContent = 'Authors:';
    newsAuthors.appendChild(label);

    // Listar os autores
    newsPiece.Authors.forEach(function (author) {

        // Paragrafo
        let p = document.createElement('p');
        newsAuthors.appendChild(p);

        // Link para o perfil do autor
        let authorLink = document.createElement('a');
        authorLink.textContent = author.Name;
        authorLink.onclick = function (e) {
            e.preventDefault();

            showUserProfile(author.ID);
        };
        p.appendChild(authorLink);

    });

    // Data da noticia
    let newsDate = document.createElement('div');
    newsDate.className = 'newsDate col-6';
    newsInfo.appendChild(newsDate);

    let pDate = document.createElement('p');
    pDate.className = 'bold date';
    pDate.textContent = newsPiece.Date;
    newsDate.appendChild(pDate);

    let pTime = document.createElement('p');
    pTime.className = 'time';
    pTime.textContent = newsPiece.Time;
    newsDate.appendChild(pTime);

    // Separar a noticia do cabeçalho
    let mobileSeparator = document.createElement('hr');
    mobileSeparator.className = 'mobileSeparator';
    mobileSeparator.style.display = 'none'; // Escondido por defeito. Será mostrado nos mobile devices
    newsDetailHeaderContainer.appendChild(mobileSeparator);

    //#endregion Lado Esquerdo

    //#region Lado Direito


    // Descrição
    let pDescription = document.createElement('p');
    pDescription.className = 'newsDescription bold';
    pDescription.textContent = newsPiece.Description;
    newsDetailBodyContainer.appendChild(pDescription);

    // Conteudo da noticia
    let newsDetailBody = document.createElement('div');
    newsDetailBody.className = 'newsDetailBody';;
    newsDetailBodyContainer.appendChild(newsDetailBody);

    // O conteudo é um array
    newsPiece.Content.forEach(function (content) {

        let p = document.createElement('p');
        p.textContent = content;
        newsDetailBodyContainer.appendChild(p);

    });

    //#endregion Lado Direito

    //#endregion NewsArticle

    //#region CommentsList

    // 'div' dos comentários
    let commentsList = document.createElement('div');
    commentsList.className = 'commentsList';
    newsCommentsContainer.appendChild(commentsList);


    let h2 = document.createElement('h2');
    commentsList.appendChild(h2);

    // Caso não exista comentários
    // Mostra uma mensagem 'No comments'
    if (newsPiece.Comments[0] == null) {

        h2.textContent = 'No comments';

    } else {

        h2.textContent = 'Comments';

        displayComments(newsPiece.Comments, newsCommentsContainer.id);

    }


    //#endregion
}

/**
 * 
 * Recebe a lista de comments e o div pai onde os deve colocar
 * 
 * @param {any} comments
 * @param {any} divID
 */
function displayComments(comments, divID) {

    // Booleano que permite saber se os comments estao a ser escritos
    // num newsArticle ou no perfil do utilizador
    let newsArticle = (comments[0].UserID != null) ? true : false;

    comments.forEach(function (comment) {

        // 'div' do comentário inteiro
        let commentContainer = document.createElement('div');
        commentContainer.className = 'comment';
        $(`#${divID}`).append(commentContainer);

        // Contem o link do nome do utilizador e a data
        let commentHeaderContainer = document.createElement('div');
        commentHeaderContainer.className = 'commentHeaderContainer';
        commentContainer.appendChild(commentHeaderContainer);

        // Paragrafo que ira conter o link com o nome do utilizador
        let p = document.createElement('p');
        p.className = 'commentHeaderUser';

        // Saber se e necessario criar link para a pagina do autor
        // o link so sera necessario se nos os comments estiverem na pagina NewsArticle
        //
        // A alternativa, sera que os comments se encontram no perfil
        // do utilizador, o que nesse caso nao e necessario o link para o perfil
        p.textContent = (newsArticle) ? 'by ' : `by ${comment.User}`;
        commentHeaderContainer.appendChild(p);

        // Link para o perfil do utilizador, caso nos encontremos na page NewsArticle
        if (newsArticle) {
            // Link com o nome do utilizador
            let commentNameLink = document.createElement('a');
            commentNameLink.textContent = comment.User;
            commentNameLink.onclick = function (e) {
                e.preventDefault;

                showUserProfile(comment.UserID);
            };
            p.appendChild(commentNameLink);
        }

        // Data do comentario
        let pDate = document.createElement('p');
        pDate.className = 'commentHeaderDate';
        pDate.textContent = comment.Date;
        commentHeaderContainer.appendChild(pDate);

        // Corpo do comentario
        let commentBodyContainer = document.createElement('div');
        commentBodyContainer.className = 'commentBodyContainer';
        commentBodyContainer.textContent = comment.Content;
        commentContainer.appendChild(commentBodyContainer);

        // Caso os comments estejam a ser escritos no perfil do utilizador
        // criar um link para a noticia onde o comentario se encontra
        if (!newsArticle) {

            // div que ira conter o link para a noticia do comentario
            let newsContextContainer = document.createElement('div');
            newsContextContainer.className = 'newsContext';
            commentContainer.appendChild(newsContextContainer);

            // Link para a noticia
            let newsLink = document.createElement('a');
            newsLink.className = 'bold';
            newsLink.textContent = 'News Context';
            newsLink.onclick = function (e) {
                e.preventDefault();

                showNewsArticle(comment.NewsID);
            };
            newsContextContainer.appendChild(newsLink);

        }

    });

}

function showUserProfile(id) {

    getUserProfile(id)
        .then(function (user) {

            displayUserProfile(user);

        }).catch(function (error) {

            console.error(error);
            alert("We couldn't retrieve the author's profile...");

        })
}

function displayUserProfile(user) {

    initThisDivToShowContent(userProfile.className);

    // Container dos div de informação
    let userInfoContainer = document.createElement('div');
    userInfoContainer.className = 'col-12'; // Bootstrap
    userProfile.appendChild(userInfoContainer);

    // 'div' com o nome do utilizador
    let userName = document.createElement('div');
    userName.className = 'userName';
    userInfoContainer.appendChild(userName);

    // Nome do utilizador
    let h2UserName = document.createElement('h2');
    h2UserName.className = 'bold';
    h2UserName.textContent = user.Name;
    userName.appendChild(h2UserName);

    // 'div' com a informação do utilizador
    let userInfo = document.createElement('div');
    userInfo.className = 'col-12';
    userInfoContainer.appendChild(userInfo);

    // </hr>
    let hr_1 = document.createElement('hr');
    userInfo.appendChild(hr_1);

    // lbl Nome do utilizador
    let pName = document.createElement('p');
    pName.textContent = user.Name;
    userInfo.appendChild(pName);

    // Data de nascimento
    let pBirth = document.createElement('p');
    pBirth.textContent = user.Birthday;
    userInfo.appendChild(pBirth);

    // Email do utilizador
    let pEmail = document.createElement('p');
    pEmail.textContent = user.Email;
    userInfo.appendChild(pEmail);

    // </hr>
    let hr_2 = document.createElement('hr');
    userInfo.appendChild(hr_2);

    // 'div' que contem as noticias do autor
    let newsList = document.createElement('div');
    newsList.className = 'col-6 newsList'; // Bootsrap
    userProfile.appendChild(newsList);

    // lbl Author of:
    let h2Author = document.createElement('h2');
    h2Author.className = 'bold';
    h2Author.textContent = 'Author of:';
    newsList.appendChild(h2Author);

    user.News.forEach(function (news) {

        let p = document.createElement('p');
        newsList.appendChild(p);

        let linkNews = document.createElement('a');
        linkNews.className = '';
        linkNews.textContent = ` - ${news.Title}`;
        linkNews.onclick = function (e) {
            e.preventDefault();

            showNewsArticle(news.ID);
        };
        p.appendChild(linkNews);

    });

    

    // 'div' que contem os comentários do autor
    let commentsContainer = document.createElement('div');
    commentsContainer.className = 'commentsListUserProfile col-6';
    commentsContainer.id = 'commentsListUserProfile';
    userProfile.appendChild(commentsContainer);

    // Separa as noticias dos comentários nos telemoveis
    let mobileSeparator = document.createElement('hr');
    mobileSeparator.className = 'mobileSeparator';
    mobileSeparator.style.display = 'none'; // Escondido por defeito. Será mostrado nos mobile devices
    commentsContainer.appendChild(mobileSeparator);

    // lbl Comments
    let h2Comments = document.createElement('h2');
    h2Comments.textContent = 'Comments';
    commentsContainer.appendChild(h2Comments);
    
    displayComments(user.Comments, commentsContainer.id);

}

//#region Utils

/**
 * Esconde todos os 'div' com a exepção do que seja escolhido por parâmetro
 * 
 * @param {any} divClass
 */
function hideAllBut(divClass) {

    if (divClass != newsArticle.className) { newsArticle.style.display = "none"; }
    if (divClass != newsContainer.className) { newsContainer.style.display = "none"; }
    if (divClass != userProfile.className) { userProfile.style.display = "none"; }

}

/**
 * Mostra apenas o 'div' escolhido
 * 
 * @param {any} divClass
 */
function showDiv(divClass) {

    switch (divClass) {

        case newsArticle.className: newsArticle.style.display = "flex"; break;
        case newsContainer.className: newsContainer.style.display = "flex"; break;
        case userProfile.className: userProfile.style.display = "flex"; break;

    }
}

/**
 * Limpa os 'div' com innerHTML
 * 
 * @param {any} divID
 */
function clearDiv(divClass) {

    switch (divClass) {

        case newsArticle.className: newsArticle.innerHTML = ""; break;
        case newsContainer.className: newsContainer.innerHTML = ""; break;
        case userProfile.className: userProfile.innerHTML = ""; break;

    }
}

/**
 * Faz scroll até ao topo
 */
function scrollToTop() {

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

}

/**
 * Faz todos os processos necessários para deixar um 'div' pronto a mostrar conteudo
 * 
 * @param {any} divID
 */
function initThisDivToShowContent(divClass) {

    hideAllBut(divClass); // Esconde todos os 'div' exepto o que estamos a trabalhar (Utilidades)

    showDiv(divClass); // Mostra o 'div' que iremos trabalhar (Utilidades)

    clearDiv(divClass); // Limpa esse 'div' (Utilidades)

    scrollToTop(); // Faz scroll até ao topo (Utilidades)

}

//#endregion