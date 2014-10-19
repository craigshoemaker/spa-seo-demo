using SEO.Domain;
using SEO.Web.Models;
using System.Web.Mvc;

namespace SEO.Web.Controllers
{
    public class ArticlesController : Controller
    {
        private readonly string ESCAPED_FRAGMENT_KEY = "_escaped_fragment_";
        private bool HasEscapedFragmentValue
        {
            get 
            {
                return Request.QueryString.Keys.Count > 0 && 
                       Request.QueryString[0] != null &&
                       Request.QueryString[0].ToString().Contains(ESCAPED_FRAGMENT_KEY);
            }
        }
        private string GetFileNameFromEscapedFragment()
        {
            var fileName = Request.QueryString[0].ToString();
            fileName = fileName.Replace(ESCAPED_FRAGMENT_KEY + "/", "");
            return fileName;
        }
        public ActionResult Index(string fileName)
        {
            if (this.HasEscapedFragmentValue)
            {
                fileName = this.GetFileNameFromEscapedFragment();
            }

            var repository = new ArticlesRepository();
            
            if (string.IsNullOrEmpty(fileName))
            {
                var articles = repository.GetAllInfo(ApplicationConfig.Instance.ArticlesFolderPath);
                var vm = new HomeViewModel();
                vm.Articles = articles;
                return View("List", vm);
            }
            else
            {
                var vm = new ArticleViewModel();
                vm.Article = repository.GetByName(ApplicationConfig.Instance.ArticlesFolderPath, fileName);
                return View("Article", vm);
            }
        }
    }
}