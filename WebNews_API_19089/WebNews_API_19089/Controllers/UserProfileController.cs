using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebNews_API_19089.Models;
using System.Data.Entity;

namespace WebNews_API_19089.Controllers
{
    [RoutePrefix("api/UserProfile")]
    public class UserProfileController : ApiController
    {

        #region Database

        WebNewsDb db = new WebNewsDb();

        #endregion

        #region GetUserProfile
        [HttpGet, Route("{id}")]
        public IHttpActionResult GetUserProfile(int id)
        {

            var user = db.UsersProfile.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            // Recolher os comentários
            var comments = user.CommentsList.Select(c => new {
                User = c.UserProfile.Name,
                Date = c.CommentDate.ToString("MM-dd-yyyy"),
                NewsID = c.News.ID,
                c.Content
            }).ToList();

            // Recolher as noticias

            var news = user.NewsList.Select(n => new
            {
                n.ID,
                n.Title
            }).ToList();

            return Ok(new {
                user.Name,
                Birthday = user.Birthday.ToString("MM-dd-yyyy"),
                Email = user.UserName,
                Comments = comments,
                News = news
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
