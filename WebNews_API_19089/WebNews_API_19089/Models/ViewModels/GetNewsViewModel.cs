using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebNews_API_19089.Models.ViewModels
{
    public class GetNewsViewModel
    {

        public virtual ICollection<NewsFrontPageViewModel> News { get; set; }

        public string Category { get; set; }

    }
}