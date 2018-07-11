
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
    webpaperTitle.href = "#";
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

            // Link 'All'
            let catLink = document.createElement('a');
            catLink.className = 'categoryLink';
            catLink.textContent = 'All';
            catLink.href = "#";
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
                catLink.href = "#";
                catLink.onclick = function (e) {
                    e.preventDefault();

                    showCategoryNews(category.ID);

                };
                $('.headerLinks').append(catLink);

            });

        })
        .catch(function (error) {
            console.error(error);
            alert("We couldn't retrieve the categories...");
        })

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
        newsLink.href = '#';
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

function showNewsArticle(id){
    
    getNewsArticle(id)
        .then(function (newsPiece) {

            displayNewsArticle(newsPiece);

        }).catch(function (error){

            console.error(error);
            alert("We couldn't retrieve the news articles...");

        })

}

function displayNewsArticle(newsPiece){

    initThisDivToShowContent(newsArticle.className);

    //#region Main DIVs

    // 'div' que contém a noticia
    let newsDetail = document.createElement('div');
    newsDetail.className = 'col-12 newsDetail row'; // Bootstrap
    newsArticle.appendChild(newsDetail);

    // 'div' que contém os comentários
    let newsCommentsContainer = document.createElement('div');
    newsCommentsContainer.className = 'col-12 newsCommentsContainer'; // Bootstrap
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
    linkCategory.href = '#';
    linkCategory.textContent = ` - ${newsPiece.Category} - `;
    linkCategory.onclick = function (e){
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
    newsPiece.Photos.forEach(function (photo){

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
        authorLink.href = '#';
        authorLink.textContent = author.Name;
        authorLink.onclick = function (e){
            e.preventDefault();

            // To-do
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
    newsPiece.Content.forEach(function (content){

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
    if (newsPiece.Comments[0] == null){

        h2.textContent = 'No comments';

    }else{

        h2.textContent = 'Comments';

        newsPiece.Comments.forEach(function (comment){

            // 'div' do comentário
            let divComment = document.createElement('div');
            divComment.className = 'comment';
            commentsList.appendChild(divComment);

            // Heador do comentário
            let commentHeaderContainer = document.createElement('div');
            commentHeaderContainer.className = 'commentHeaderContainer';
            divComment.appendChild(commentHeaderContainer);

            // Nome do utilizador do cometário
            let p = document.createElement('p');
            p.className = 'commentHeaderUser';
            p.textContent = 'by ';
            commentHeaderContainer.appendChild(p);

            // Link com o nome do utilizador
            let a = document.createElement('a');
            a.href = '#';
            a.textContent = comment.Name;
            a.onclick = function (e){
                e.preventDefault;

                // To-do
            }
            p.appendChild(a);

            // Nome do utilizador do cometário
            let pDate = document.createElement('p');
            pDate.className = 'commentHeaderDate';
            pDate.textContent = comment.Date;
            commentHeaderContainer.appendChild(pDate);

            // Corpo do cometário
            let commentBodyContainer = document.createElement('div');
            commentBodyContainer.className = 'commentBodyContainer';
            commentBodyContainer.textContent = comment.Content;
            divComment.appendChild(commentBodyContainer);
            
        });

    }


    //#endregion
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