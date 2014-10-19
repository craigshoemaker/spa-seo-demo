using SEO.Domain;
using System.Web.Http;

namespace SEO.Web.Controllers.API
{
    public class ArticlesController : ApiController
    {
        public Article Get(string id)
        {
            System.Threading.Thread.Sleep(550); // just so you can see the async request :)
            var repository = new ArticlesRepository();
            return repository.GetByName(ApplicationConfig.Instance.ArticlesFolderPath, id);
        }
    }
}
