using HtmlAgilityPack;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace SEO.Domain
{
    public class ArticlesRepository
    {
        public string GetAllInfoPartial(string articleFolderPath)
        {
            var list = GetAllInfo(articleFolderPath);

            StringBuilder sb = new StringBuilder();
            sb.AppendLine(@"<section id=""content-container"">");
            sb.AppendLine("<h1>Articles</h1>");
            sb.AppendLine("<ul>");

            foreach (ArticleInfo info in list)
            {
                var line = string.Format(@"<li><a href=""/articles/{0}"">{1}</a></li>",
                    info.FileNameEncoded,
                    info.Title);

                sb.AppendLine(line);
            }

            sb.AppendLine("</ul>");
            sb.AppendLine("</section>");
            return sb.ToString();
        }

        public IList<ArticleInfo> GetAllInfo(string articlesFolderPath)
        {
            var list = new List<ArticleInfo>();

            var fileNames = Directory.GetFiles(articlesFolderPath);

            ArticleInfo info;
            HtmlDocument doc;
            foreach (var fileName in fileNames)
            {
                info = new ArticleInfo();
                info.FileName = Path.GetFileName(fileName);

                doc = new HtmlDocument();
                doc.Load(fileName);

                var h1s = doc.DocumentNode.Descendants("h1").ToList();

                if (h1s.Count > 0)
                {
                    info.Title = h1s[0].InnerText;    
                }

                list.Add(info);
            }

            return list;
        }

        public Article GetByName(string ariclesFolderPath, string name)
        {
            Article article = new Article();

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