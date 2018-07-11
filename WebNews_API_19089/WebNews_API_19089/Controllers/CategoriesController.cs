using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebNews_API_19089.Models;

namespace WebNews_API_19089.Controllers
{
    [RoutePrefix("api/Categories")]
    public class CategoriesController : ApiController
    {

        #region Database

        WebNewsDb db = new WebNewsDb();

        #endregion

        [HttpGet]
        public IHttpActionResult GetCategories()
        {

            var categories = db.Categories.Select(c => new
            {
                c.ID,
                c.Name
            }).ToList();

            return Ok(categories);
        }

    }
}
