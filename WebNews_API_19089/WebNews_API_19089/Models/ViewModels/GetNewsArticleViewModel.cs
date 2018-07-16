using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebNews_API_19089.Models.ViewModels
{
    public class GetNewsArticleViewModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string[] Content { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Category { get; set; }
        public ICollection<PhotoViewModel> Photos { get; set; }
        public ICollection<UserProfileViewModel> Authors { get; set; }
        public ICollection<GetCommentViewModel> Comments { get; set; }
    }
}