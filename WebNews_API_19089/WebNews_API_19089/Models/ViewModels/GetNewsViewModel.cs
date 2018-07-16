using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebNews_API_19089.Models.ViewModels
{
    public class GetNewsViewModel
    {
        public ICollection<NewsBlockViewModel> News { get; set; }
        public string Category { get; set; }
        public int PageNum { get; set; }
        public bool FirstPage { get; set; }
        public bool LastPage { get; set; }
    }
}