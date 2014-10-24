using SEO.Domain;
using System.Collections.Generic;
using System.Web.Http;
using System.Text;

namespace SEO.Web.Controllers.API
{
    public class ArticlesController : ApiController
    {
        public object Get(string type = "")
        {
            System.Threading.Thread.Sleep(550); // just so you can see the async request :)
            var repository = new ArticlesRepository();

            if (type == "partial")
            {
                return repository.GetAllInfoPartial(ApplicationConfig.Instance.ArticlesFolderPath);
            } else 
            {
                return repository.GetAllInfo(ApplicationConfig.Instance.ArticlesFolderPath);;    
            }
        }

        public object Get(string id, string type = "")
        {
            System.Threading.Thread.Sleep(550); // just so you can see the async request :)
            var repository = new ArticlesRepository();

            if (type == "partial")
            {
                var article = repository.GetByName(ApplicationConfig.Instance.ArticlesFolderPath, id);
                return article.Markup;
            }
            else
            {
                return repository.GetByName(ApplicationConfig.Instance.ArticlesFolderPath, id); 
            }
        }
    }
}
