using System.Configuration;
using System.Web;

namespace SEO.Web
{
    public class ApplicationConfig
    {
        public static ApplicationConfig Instance = null;

        private string _articlesFolderPath = string.Empty;

        static ApplicationConfig()
        {
            Instance = new ApplicationConfig();
        }

        public string ArticlesFolderPath
        {
            get 
            {
                if (string.IsNullOrEmpty(this._articlesFolderPath))
                {
                    if (ConfigurationManager.AppSettings["SEO.ArticlesFolderPath"] != null)
                    {
                        this._articlesFolderPath = ConfigurationManager.AppSettings["SEO.ArticlesFolderPath"].ToString();
                        this._articlesFolderPath = HttpContext.Current.Server.MapPath(this._articlesFolderPath);
                    }    
                }
                return this._articlesFolderPath;
            }
        }
    }
}