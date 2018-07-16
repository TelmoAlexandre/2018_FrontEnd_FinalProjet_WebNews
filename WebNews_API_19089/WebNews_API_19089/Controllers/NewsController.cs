using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebNews_API_19089.Models;
using WebNews_API_19089.Models.ViewModels;

namespace WebNews_API_19089.Controllers
{

    [RoutePrefix("api/News")]
    public class NewsController : ApiController
    {
        #region Database

        WebNewsDb db = new WebNewsDb();

        #endregion

        #region NewsList


        [HttpGet, Route("Category/{categoryName}/Page/{pageNum}")]
        public IHttpActionResult GetNewsPage(string categoryName, int pageNum)
        {

            const int newsPerPage = 6;

            // Calcula o valor a que deve fazer Skip()
            // Case seja a pagina 1, dá 0
            // Caso seja a pagina 2, dá 6 ... so on and so forth
            int skipNum = (pageNum - 1) * newsPerPage;

            // Recolher todas as noticias
            var newsAll = db.News.OrderByDescending(n => n.NewsDate).ToList();

            // Irá conter a última e a primeira noticia (dependendo da existência de categoria)
            // Relembro que 'All' não é uma categoria
            News lastNewsQuery;
            News firstNewsQuery;

            // Declarar o output das noticias
            ICollection<NewsBlockViewModel> newsOutput;

            // Não existe a categoria 'All'
            // Então filtra as categoria quando se trata de uma verdadeira categoria
            if (categoryName != "All")
            {

                // Nesta situação existe uma categoria válida.
                // Procura as noticias dessa categoria
                newsOutput = newsAll.Where(n => n.Category.Name == categoryName).Skip(skipNum).Take(newsPerPage).Select(n => new NewsBlockViewModel
                {
                    ID = n.ID,
                    Title = n.Title,
                    Description = n.Description,
                    Date = n.NewsDate.ToString("MM-dd-yyyy"),
                    Category = n.Category.Name
                }).ToList();
                
                // Descobre a primeira e ultima noticia da categoria
                lastNewsQuery = db.News.Where(n => n.Category.Name == categoryName).OrderBy(n => n.NewsDate).First();
                firstNewsQuery = db.News.Where(n => n.Category.Name == categoryName).OrderByDescending(n => n.NewsDate).First();
            }
            else
            {

                // Chegou 'All' como parametro para a categoria
                // O que significa que deve retornar noticias de TODAS as categorias
                newsOutput = newsAll.Skip(skipNum).Take(newsPerPage).Select(n => new NewsBlockViewModel
                {
                    ID = n.ID,
                    Title = n.Title,
                    Description = n.Description,
                    Date = n.NewsDate.ToString("MM-dd-yyyy"),
                    Category = n.Category.Name

                }).ToList();

                // Descobre a primeira e ultima noticia de TODAS
                lastNewsQuery = db.News.OrderBy(n => n.NewsDate).First();
                firstNewsQuery = db.News.OrderByDescending(n => n.NewsDate).First();
            }

            // Caso a ultima noticia de todas se encontre na página
            // Sabe-se que é a última página
            bool lastPage = (newsOutput.Where(n => n.ID == lastNewsQuery.ID).Count() > 0) ? true : false;

            // Caso a primeira noticia de todas se encontre na página
            // Sabe-se que é a primeira página
            bool firstPage = (newsOutput.Where(n => n.ID == firstNewsQuery.ID).Count() > 0) ? true : false;



            // Resposta --------------------------------------------------------------------------------------------------------------
            return Ok(new NewsOutputViewModel
            {
                News = newsOutput,
                Category = categoryName,
                PageNum = pageNum,
                LastPage = lastPage,
                FirstPage = firstPage
            });
        }

        [HttpGet, Route("Category/{categoryID}")]
        public IHttpActionResult GetNews(int categoryID)
        {

            // Tenta encontrar a categoria
            var category = db.Categories.Find(categoryID);

            if (category == null)
            {
                return NotFound();
            }

            // Encontrar as noticias dessa categoria
            var news = db.News.Where(n => n.CategoryFK == categoryID).Select(n => new
            {
                n.ID,
                n.Title,
                n.Description
            }).ToList();

            return Ok(new
            {
                News = news,
                Category = category.Name
            });
        }


        #endregion

        #region SingleNews

        [HttpGet, Route("{id}")]
        public IHttpActionResult GetNewsArticle(int id)
        {

            var newsArticle = db.News.Find(id);

            if (newsArticle == null)
            {
                return NotFound();
            }

            // Recolher os autores da notícia
            var users = newsArticle.UsersProfileList.Select(u => new
            {
                u.ID,
                u.Name
            }).ToList();

            // Recolher os comentários da notícia
            var comments = newsArticle.CommentsList.OrderByDescending(c => c.CommentDate).Select(c => new
            {
                User = c.UserProfile.Name,
                Date = c.CommentDate.ToString("MM-dd-yyyy"),
                UserID = c.UserProfile.ID,
                c.Content
            }).ToList();

            // Recolher as fotos
            var photos = newsArticle.PhotosList.Select(p => new {
                p.Name
            }).ToList();

            // Trocar os breaks para astriscos para ser apenas um caracter
            string allContent = newsArticle.Content.Replace("<br/>", "#");

            // Separar o conteudo pelos astrisos e colocar num array
            // Isto vai deixar alguns elementos do array vazio
            // O que é bom, porque num forEach, coloco cada um num <p>
            // e assim faz verdadeiros paragrafos com um espaço entre eles
            string[] content = allContent.Split(new char[] { '#' });



            return Ok(new
            {
                newsArticle.ID,
                newsArticle.Title,
                newsArticle.Description,
                Content = content,
                Date = newsArticle.NewsDate.ToString("MM-dd-yyyy"),
                Time = newsArticle.NewsDate.ToString("hh:mm:ss tt"),
                Category = newsArticle.Category.Name,
                Photos = photos,
                Authors = users,
                Comments = comments
            }
            );

        }
        #endregion

        #region Search News

        [HttpGet, Route("Category/{categoryName}/Search/{searchValue}")]
        public IHttpActionResult GetNewsSearchFilter(string categoryName, string searchValue)
        {

            ICollection<NewsBlockViewModel> newsOutput;

            // Verficar a categoria
            if (categoryName != "All")
            {

                newsOutput = db.News.Where(n => n.Category.Name == categoryName)
                                .Where(n => n.Title.Contains(searchValue))
                                .OrderByDescending(n => n.NewsDate)
                                .Select(n => new NewsBlockViewModel {

                                    ID = n.ID,
                                    Title = n.Title,
                                    Description = n.Description

                            }).ToList();

            }
            else
            {
                newsOutput = db.News.Where(n => n.Title.Contains(searchValue))
                               .OrderByDescending(n => n.NewsDate)
                               .Select(n => new NewsBlockViewModel
                               {

                                   ID = n.ID,
                                   Title = n.Title,
                                   Description = n.Description

                               }).ToList();
            }

            return Ok(new NewsOutputViewModel {
                News = newsOutput,
                Category = categoryName,
                PageNum = 1,
                // Booleanos a verdade para não aparecer opções
                // de paginação no site
                FirstPage = true,
                LastPage = true
            });
        }

        #endregion

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
