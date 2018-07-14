using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebNews_API_19089.Models.ViewModels
{
    public class GetCommentViewModel
    {
        public int ID { get; set; }
        public string User { get; set; }
        public string Date { get; set; }
        public int UserID { get; set; }
        public string Content { get; set; }
    }
}