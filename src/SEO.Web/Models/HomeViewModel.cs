using SEO.Domain;
using System.Collections.Generic;

namespace SEO.Web.Models
{
    public class HomeViewModel
    {
        public IList<ArticleInfo> Articles { get; set; }
    }
}