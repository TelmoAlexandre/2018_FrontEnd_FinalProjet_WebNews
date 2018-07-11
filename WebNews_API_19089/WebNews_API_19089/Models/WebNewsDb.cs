using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace WebNews_API_19089.Models
{
    public class WebNewsDb : DbContext
    {
        public WebNewsDb() : base("WebNewsDbConnectionString")
        {
        }

        public static WebNewsDb Create()
        {
            return new WebNewsDb();
        }

        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Photos> Photos { get; set; }
        public virtual DbSet<Comments> Comments { get; set; }
        public virtual DbSet<UsersProfile> UsersProfile { get; set; }
        public virtual DbSet<Categories> Categories { get; set; }

    }
}