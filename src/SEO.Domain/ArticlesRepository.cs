using HtmlAgilityPack;
using System.IO;
using System.Linq;

namespace SEO.Domain
{
    public class ArticlesRepository
    {
        public Article GetByName(string ariclesFolderPath, string name = "index")
        {
            Article article = new Article();

            if (string.IsNullOrEmpty(name) || string.IsNullOrWhiteSpace(name))
            {
                name = "index";
            }

            var doc = new HtmlDocument();
            doc.Load(ariclesFolderPath + Path.DirectorySeparatorChar + name + ".html");

            var h1s = doc.DocumentNode.Descendants("h1").ToList();

            if (h1s.Count > 0)
            {
                article.Title = h1s[0].InnerText;
            }

            article.Markup = doc.DocumentNode.InnerHtml;

            return article;
        }
    }
}