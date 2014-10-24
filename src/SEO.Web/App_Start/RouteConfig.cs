using System.Web.Mvc;
using System.Web.Routing;

namespace SEO.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Articles",
                url: "articles/{fileName}",
                defaults: new { 
                    controller = "Articles", 
                    action = "Index",
                    fileName = UrlParameter.Optional
                }
            );

            routes.MapRoute(
                name: "Partial",
                url: "partial/{fileName}",
                defaults: new
                {
                    controller = "Partial",
                    action = "Index",
                    fileName = UrlParameter.Optional
                }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { 
                    controller = "Home", 
                    action = "Index", 
                    id = UrlParameter.Optional 
                }
            );
        }
    }
}
