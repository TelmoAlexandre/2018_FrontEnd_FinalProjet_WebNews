using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebNews_API_19089.Models.ViewModels
{
    public class PostCommentViewModel
    {
        [Required]
        [StringLength(500)]
        public string Content { get; set; }

        public int NewsFK { get; set; }

        public int UserProfileID { get; set; }
    }
}