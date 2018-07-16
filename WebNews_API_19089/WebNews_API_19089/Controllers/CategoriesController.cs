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
    [RoutePrefix("api/Categories")]
    public class CategoriesController : ApiController
    {

        #region Database

        WebNewsDb db = new WebNewsDb();

        #endregion

        #region GetCategories

        [HttpGet]
        [ResponseType(typeof(GetCategoryViewModel))]
        public IHttpActionResult GetCategories()
        {
            var categories = db.Categories.Select(c => new GetCategoryViewModel
            {
                ID = c.ID,
                Name = c.Name
            }).ToList();

            return Ok(categories);
        }

        #endregion

        #region Dispose

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        #endregion
    }
}
