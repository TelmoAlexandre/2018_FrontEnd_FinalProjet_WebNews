using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebNews_API_19089.Models;
using WebNews_API_19089.Models.ViewModels;

namespace WebNews_API_19089.Controllers
{

    [RoutePrefix("api/agentes")]
    public class NewsController : ApiController
    {
        #region Database

        WebNewsDb db = new WebNewsDb();

        #endregion

        #region NewsList

        public IHttpActionResult GetNews()
        {

            // Utilizo um ViewModel para receber apenas os dados mostrados na página inicial
            var news = db.News.Select(n => new NewsFrontPageViewModel {
                ID = n.ID,
                Title = n.Title,
                Description = n.Description
            }).ToList();

            // Retorno outro view model que contem um ICollection<NewsFrontPageViewModel>
            // e uma string com a categoria
            return Ok(new GetNewsViewModel {
                News = news,
                Category = "All"
            });
        }




        #endregion

    }
}
