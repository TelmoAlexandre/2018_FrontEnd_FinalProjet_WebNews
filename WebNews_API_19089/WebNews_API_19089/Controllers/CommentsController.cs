using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebNews_API_19089.Models;
using WebNews_API_19089.Models.ViewModels;

namespace WebNews_API_19089.Controllers
{
    [RoutePrefix("api/Comments")]
    public class CommentsController : ApiController
    {
        
        #region Database

        WebNewsDb db = new WebNewsDb();

        #endregion

        #region POST Comment

        [HttpPost]
        [ResponseType(typeof(GetCommentViewModel))]
        public IHttpActionResult PostComment(PostCommentViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Comments comment = new Comments
            {
                CommentDate = DateTime.Now,
                NewsFK = model.NewsFK,
                // Jornalista 1 por defeito.
                // As dependências da minha base de dados requeriam que fosse 
                // criado um utilizador por comment. Para evitar isso, vou atribui
                // os novos comments ao utilizador 1
                UserProfileFK = model.UserProfileID,
                Content = model.Content,
            };

            db.Comments.Add(comment);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                 return Conflict();
            }

            // Recolhe o comment que foi gravado
            comment = db.Comments.OrderByDescending(c => c.CommentDate).First();

            // Porque ainda o utilizador ainda não está associado no comment.UserProfile
            UsersProfile user = db.UsersProfile.Find(model.UserProfileID);

            GetCommentViewModel response = new GetCommentViewModel
            {
                ID = comment.ID,
                User = user.Name,
                Date = comment.CommentDate.ToString("MM-dd-yyyy"),
                UserID = user.ID,
                Content = comment.Content
            };

            return CreatedAtRoute("DefaultApi", new { id = comment.ID }, response);
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
