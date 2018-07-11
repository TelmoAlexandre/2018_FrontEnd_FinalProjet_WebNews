document.addEventListener("DOMContentLoaded", function main(e) {
    init();
});

function init() {

    // Cria os 'div' base
    CreateMainContainers();

    // Preenche o <header>
    // Aqui é utilizado o fetch das categorias
    fillHeaderContainer();

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

        // Vai chamar a função mostra news

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

                };
                $('.headerLinks').append(catLink);

            });

        })
        .catch(function (erro) {
            console.error(erro);
            alert("We couldn't retrieve the categories...");
        })

}

function showAllNews() {

    getNews()
        .then(function (news) {

            // 'div' que irá contar todos os news blocks
            let newsContainer = document.createElement('div');
            newsContainer.className = 'row newsContainer'; // Bootstrap
            $('.container').append(newsContainer);

            // 'div' que contém a categoria
            let newsCategory = document.createElement('div');
            newsCategory.className = 'col-12 center newsCategory';
            newsContainer.appendChild(newsCategory);

            // Nome da categoria
            let categoryTitle = document.createElement('h1');
            categoryTitle.className = 'bold';
            categoryTitle.textContent = news.Category;
            newsCategory.appendChild(categoryTitle);

            news.News.forEach(function (newsArticle){
                
                // Criar o bloco da noticia
                let newsBlock = document.createElement('div');
                newsBlock.className = 'newsBlock col-4';
                newsContainer.appendChild(newsBlock);

                // Titulo da noticia
                let newsTitle = document.createElement('h1');
                newsTitle.className = 'newsTitle';
                newsBlock.appendChild(newsTitle);

                // Link que se encontra dentro do 'h1' do titulo da noticia
                let newsLink = document.createElement('a');
                newsLink.href = '#';
                newsLink.textContent = newsArticle.Title;
                newsLink.onclick = function (e){
                    e.preventDefault();

                    

                };
                newsTitle.appendChild(newsLink);
                
                // Descrição da noticia
                let description = document.createElement('p');
                description.className = 'newsDescription';
                description.textContent = newsArticle.Description;
                newsBlock.appendChild(description);

            });

        })
        .catch(function (erro) {
            console.error(erro);
            alert("We couldn't retrieve the news articles...");
        })

}