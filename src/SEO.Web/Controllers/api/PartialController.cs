using SEO.Domain;

namespace SEO.Web.Controllers.API
{
    public class PartialController : ArticlesController
    {
        public override object Get()
        {
            var article = base.Get() as Article;
            return article.Markup;
        }

        public override object Get(string id)
        {
            var article = base.Get(id) as Article;
            return article.Markup;
        }
    }
}