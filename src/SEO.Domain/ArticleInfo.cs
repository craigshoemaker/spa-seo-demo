namespace SEO.Domain
{
    public class ArticleInfo
    {
        public string FileName { get; set; }
        public string Title { get; set; }
        public string FileNameEncoded 
        {
            get
            {
                return this.FileName.ToLower().Replace(".html", "");
            }
        }
    }
}