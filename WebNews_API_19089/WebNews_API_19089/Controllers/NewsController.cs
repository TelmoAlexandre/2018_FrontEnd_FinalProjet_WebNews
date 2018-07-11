using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebNews_API_19089.Models;

namespace WebNews_API_19089.Controllers
{

    [RoutePrefix("api/News")]
    public class NewsController : ApiController
    {
        #region Database

        WebNewsDb db = new WebNewsDb();

        #endregion

        #region NewsList

        
        public IHttpActionResult GetNews()
        {

            // Utilizo um ViewModel para receber apenas os dados mostrados na página inicial
            var news = db.News.Select(n => new
            {
                n.ID,
                n.Title,
                n.Description
            }).ToList();

            // Retorno outro view model que contem um ICollection<NewsFrontPageViewModel>
            // e uma string com a categoria
            return Ok(new
            {
                News = news,
                Category = "All"
            });
        }

        [HttpGet, Route("category/{categoryID}")]
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
            var comments = newsArticle.CommentsList.Select(c => new
            {
                c.CommentDate,
                c.Content,
                c.UserProfile.Name,
                c.UserProfile.ID
            }).ToList();

            // Recolher as fotos
            var photos = newsArticle.PhotosList.Select(p => new {
                p.Name
            }).ToList();

            return Ok(new
            {
                newsArticle.ID,
                newsArticle.Title,
                newsArticle.Description,
                newsArticle.Content,
                newsArticle.Category.Name,
                Users = users,
                Comments = comments,
                Photos = photos
            }
            );

        }
        #endregion

    }
}
